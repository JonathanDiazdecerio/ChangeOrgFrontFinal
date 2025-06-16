import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeticionRoutingModule } from './peticion-routing.module';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { MyindexComponent } from './myindex/myindex.component'; 
import { FirmasComponent } from './firmas/firmas.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ViewComponent,
    EditComponent,
    IndexComponent,
MyindexComponent,
FirmasComponent
  ],
  imports: [
    CommonModule,
    PeticionRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    RouterModule
  ]
})
export class PeticionModule { }
