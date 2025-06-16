import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from
'./components/signin/signin.component';
import { SignupComponent } from
'./components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CreateComponent } from './peticion/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { IndexComponent } from './peticion/index/index.component';
import { ViewComponent } from './peticion/view/view.component';
import { EditComponent } from './peticion/edit/edit.component';
import { MyindexComponent } from './peticion/myindex/myindex.component';
import { FirmasComponent } from './peticion/firmas/firmas.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'petition/create', component: CreateComponent },
  { path: 'peticiones', component: IndexComponent },
  { path: 'peticiones/:id', component: ViewComponent },    
  { path: 'mispeticiones', component: MyindexComponent },
  { path: 'minefirmas', component: FirmasComponent },

  { path: 'petition/:id', component: ViewComponent },
  { path: 'petition/edit/:id', component: EditComponent },
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
})
export class AppRoutingModule {}