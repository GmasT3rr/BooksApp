import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { ReactiveFormsModule} from '@angular/forms'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule} from  '@angular/fire/compat/firestore'
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http'
import { BuscarComponent } from './pages/buscar/buscar.component';
import { LibroComponent } from './pages/libro/libro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PerfilComponent,
    RegistrarseComponent,
    BuscarComponent,
    LibroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
        ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
