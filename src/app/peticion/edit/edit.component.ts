import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/shared/token.service';
import { Peticion } from '../peticion';
import { PeticionService } from '../peticion.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  peticionForm!: FormGroup;
  peticionId!: string;
  errors: any = null;
  selectedImage: File | null = null;
  peticion!: Peticion;
  categorias: any[] = [];
  imagenUrlActual: string = '';

  constructor(
    public router: Router,
    public PeticionService: PeticionService,
    public token: TokenService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.PeticionService.getCategorias().subscribe({
      next: (data: any) => {
        this.categorias = data.categorias || data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.peticionId = id;

      this.peticionForm = new FormGroup({
        titulo: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required]),
        destinatario: new FormControl('', [Validators.required]),
        categoria_id: new FormControl('', [Validators.required]),
        image: new FormControl('')
      });

      this.PeticionService.show(this.peticionId).subscribe({
  next: (data: any) => {
    this.peticion = data.data || data[0] || data;
    this.peticionForm.patchValue({
      titulo: this.peticion.titulo,
      descripcion: this.peticion.descripcion,
      destinatario: this.peticion.destinatario,
      categoria_id: this.peticion.categoria_id
    });
    console.log(this.peticion.file?.file_path);

    this.imagenUrlActual = 'http://localhost:8000/storage/files/' + this.peticion.file?.file_path;
  },
  error: () => {
    this.errors = 'No se pudo cargar la petición para editar.';
    this.router.navigate(['/peticiones']);
  }
});


    } else {
      this.errors = 'ID de petición no proporcionado.';
      this.router.navigate(['/peticiones']);
    }
  }

  onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedImage = input.files[0];
  } else {
    this.selectedImage = null;
  }
}


  onSubmit(peticionForm: FormGroup): void {
    if (peticionForm.valid) {
      const peticionActualizada = new FormData();
      peticionActualizada.append('titulo', peticionForm.value.titulo);
      peticionActualizada.append('descripcion', peticionForm.value.descripcion);
      peticionActualizada.append('destinatario', peticionForm.value.destinatario);
      peticionActualizada.append('categoria_id', peticionForm.value.categoria_id.toString());
      peticionActualizada.append('_method', 'PUT');

      if (this.selectedImage) {
        peticionActualizada.append('file', this.selectedImage, this.selectedImage.name);
      }

      this.PeticionService.update(this.peticionId, peticionActualizada).subscribe({
        next: () => {
          this.router.navigate(['/peticiones']);
        },
        error: (err: any) => {
          if (err.error && typeof err.error === 'string') {
            this.errors = err.error;
          } else if (err.error && err.error.message) {
            this.errors = err.error.message;
          } else {
            this.errors = 'Ocurrió un error inesperado al actualizar.';
          }
        }
      });

    } else {
      this.errors = 'Por favor, corrige los errores en el formulario.';
    }
  }

  get f() {
    return this.peticionForm.controls;
  }
}
