import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import { Peticion } from '../peticion';
import { PeticionService } from '../peticion.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  peticionForm!: FormGroup;
  errors: any = null;
  peticion!: Peticion;
  isSignedIn!: boolean;
  selectedImage!: any;
  categorias: any[] = [];

  constructor(
    public router: Router,
    public PeticionService: PeticionService,
    public token: TokenService
  ) {}

  ngOnInit(): void {
    this.peticionForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      destinatario: new FormControl('', [Validators.required]),
      categoria_id: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
    });
    this.isSignedIn = this.token.isLoggedIn();
    this.loadCategorias();
  }

  loadCategorias() {
    this.PeticionService.getCategorias().subscribe(
      (data: any) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al cargar categorías', error);
      }
    );
  }

  onSubmit() {
    if (this.peticionForm.valid) {
      const peticion = new FormData();
      peticion.append('titulo', this.peticionForm.value.titulo);
      peticion.append('descripcion', this.peticionForm.value.descripcion);
      peticion.append('destinatario', this.peticionForm.value.destinatario);
      peticion.append('categoria_id', this.peticionForm.value.categoria_id);
      peticion.append('file', this.selectedImage);
      if (this.token.isLoggedIn()) {
        this.PeticionService.create(peticion).subscribe(
          (result: any) => {},
          (error) => {
            this.errors = error.error;
          },
          () => {
            this.peticionForm.reset();
            this.router.navigate(['/']);
          }
        );
      }
    }
  }

  fileUpload(event: any) {
    if (event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      this.peticionForm.patchValue({
        file: this.selectedImage,
      });
    }
  }
}
