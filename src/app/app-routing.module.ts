import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { HomeComponent } from './Pages/home/home.component';
import { AddComponent } from './Pages/add/add.component';
import { EditComponent } from './Pages/edit/edit.component';

const routes: Routes = [
  { path: 'register', component:RegisterComponent  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent  },
  { path: 'home', component:HomeComponent  },
  {path:"add" ,component:AddComponent},
  {path:"edit/:id" ,component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
