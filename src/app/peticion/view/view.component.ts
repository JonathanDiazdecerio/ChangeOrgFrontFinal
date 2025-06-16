import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeticionService } from '../peticion.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  peticion: any = null;
  isLoading = true;
  isSignedIn = false;
  user: any = null;
  errors: any = null;

  constructor(
    public peticionservice: PeticionService,
    private route: ActivatedRoute,
    private authState: AuthStateService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authState.userAuthState.subscribe((val: boolean) => {
      this.isSignedIn = val;
      if (this.isSignedIn) {
        this.authService.profileUser().subscribe({
          next: (userData) => {
            this.user = userData;
          },
          error: (error) => {
            console.error('Error al obtener usuario:', error);
          }
        });
      } else {
        this.user = null;
      }
    });

    this.route.params.subscribe(params => {
  const id = params['id'];
  if (id) {
    this.peticionservice.show(String(id)).subscribe({
      next: (data: any) => {
        console.log('Petición cargada:', data);
        this.peticion = data.data;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errors = error.error?.error || error.message;
        this.isLoading = false;
      }
    });
  } else {
    this.isLoading = false;
    this.peticion = null;
  }
});
  }
  onFirmarPeticion(id:any ){
    if(id){
      this.peticionservice.firmar(id.toString()).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          this.errors = error.error.error;
        }
      );
    }
  }

  onDelete(id:any){
    if(id){
      this.peticionservice.delete(id.toString()).subscribe(
        () => {
          window.location.reload(); 
        },
        (error) => {
          this.errors = error.error.error;
        }
      );
    }
  }
  onEstado(id:any){
    if(id){
      this.peticionservice.estado(id.toString()).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          this.errors = error.error.error;
        }
      );
    }
  }

  isOwner(id:any){
    console.log(this.user.id , id)
    return this.user.id == id || this.user.role_id == 1;
  }



}
