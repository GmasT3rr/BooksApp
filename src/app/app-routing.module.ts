import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { LibroComponent } from './pages/libro/libro.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {path:'login', component:LoginComponent,canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInTo }},
  {path:'registrarse', component: RegistrarseComponent,canActivate:[AngularFireAuthGuard], data: { authGuardPipe:  redirectLoggedInTo}},

  {path:'main', component: MainComponent,canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'libro/:id', component:LibroComponent,canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'buscar/:texto', component:BuscarComponent,canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},
  {path:'perfil', component: PerfilComponent, canActivate:[AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }},

  {path: '**', pathMatch:'full', redirectTo:'main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
