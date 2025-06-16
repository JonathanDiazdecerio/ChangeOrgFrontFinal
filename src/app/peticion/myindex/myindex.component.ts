import { Component, OnInit } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../peticion';
import { AuthStateService } from '../../shared/auth-state.service';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

export class User {
  id!: number;
  role_id!: number;
  name!: String;
  email!: String;
}

@Component({
  selector: 'app-mine',
  templateUrl: './myindex.component.html',
  styleUrls: ['./myindex.component.css'],
})
export class MyindexComponent implements OnInit {
  isLoading = true;
  peticiones: Peticion[] = [];
  isSignedIn!: boolean;
  user: User = new User();
  errors: any = null;

  constructor(
    private peticionservice: PeticionService,
    private auth: AuthStateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
      if (this.isSignedIn) {
        this.authService.profileUser().subscribe((data: any) => {
          this.user = data;
          this.isLoading = false;
          this.peticionservice.myPeticiones().subscribe(
            (data: any) => {
              this.peticiones = data;
            },
            (error) => {
              console.error('Error al obtener mis peticiones:', error);
            }
          );
        });
      } else {
        this.peticiones = [];
      }
    });
  }

  onFirmarPeticion(id: any) {
    if (id) {
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

  onDelete(id: any) {
    if (id) {
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

  onEstado(id: any) {
    if (id) {
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

  isOwner(id: any) {
    return this.user.id == id || this.user.role_id == 1;
  }
}
