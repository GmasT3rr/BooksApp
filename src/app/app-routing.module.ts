import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { AuthGuard } from './guards/auth.guard';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { LibroComponent } from './pages/libro/libro.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'libro/:id', component:LibroComponent,canActivate:[AuthGuard]},
  {path:'buscar/:texto', component:BuscarComponent,canActivate:[AuthGuard]},
  {path:'main', component: MainComponent,canActivate:[AuthGuard]},
  {path:'perfil', component: PerfilComponent, canActivate:[AuthGuard]},
  {path:'registrarse', component: RegistrarseComponent},
  {path: '**', pathMatch:'full', redirectTo:'main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
