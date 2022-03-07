import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usuarioModel } from '../models/usuario.model';
//import { map } from '@firebase/util';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Injectable()
export class AuthService {

  //Firebase
private url = 'https://identitytoolkit.googleapis.com/v1'
private apiKey = 'AIzaSyBaKa7HzAMIShQhrzOdgowlMXNUek-DFjU'


userToken;
userEmail;

  constructor( private http: HttpClient, private afAuth:AngularFireAuth) {
    this.leerToken();
    this.leerEmail();
   }
   
  async enviarEmailDeRegsitro(){
    return  await(await this.afAuth.currentUser).sendEmailVerification()
  }


  //Crear usuario
  registerUserDePrueba(email:string, pass:string){
    return new Promise((res,rej)=>{
      this.afAuth.createUserWithEmailAndPassword(email,pass)
      this.enviarEmailDeRegsitro()
      .then((userData)=>{
        res(userData)
        
      },err => rej (err))
    })
  }
  //Loguear usuario
  logInDePrueba(email:string, pass:string){
    return new Promise((res,rej)=>{
      this.afAuth.signInWithEmailAndPassword(email,pass)
      .then((userData)=>{
        res(userData)
        this.guardarEmail(userData.user['email'])
        this.guardarToken(userData.user['refreshToken'])
      },err => rej (err))
    })
  }

 //Desloguear usuario  
    logOutDePrueba(){
    this.afAuth.signOut();
    localStorage.removeItem('Token');
    localStorage.removeItem('expira');
    localStorage.removeItem('Email');
    localStorage.removeItem('DNI');
  }

  //Manejo de email en localStorage
  private guardarEmail(userEmail:string){
    this.userEmail = userEmail;
    localStorage.setItem('Email',userEmail);
  }

  //Manejo de token en localStorage
  private  guardarToken(userToken:string){
    this.userToken = userToken;
    localStorage.setItem('Token',userToken);
    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem('expira',hoy.getTime().toString())
  }

  //Revisa si hay un token en el localStorage
  leerToken(){
    if(localStorage.getItem('Token')){
      this.userToken = localStorage.getItem('Token') || '{}'
    } else{
      this.userToken = '';
    }
    return this.userToken;
  }

  //Revisa si hay un Email en el localStorage
  leerEmail(){
      if(localStorage.getItem('Email')){
        this.userEmail = localStorage.getItem('Email') || '{}'
      } else{
        this.userEmail = '';
      }
      return this.userEmail;
    }

  //Autenticador de token de usuario
  usuarioAutenticado():boolean{
    if(this.userToken.length<2){
      return false
    }
    const expira = Number(localStorage.getItem('expira'));
    const expiracion = new Date();
    expiracion.setTime(expira)

    if(expiracion > new Date()){
      return true
    } else{
      return false;
    }
  }
  
  //Para refrescar la pagina, F5
  refresh():void{
    const firstTime = localStorage.getItem('refresh')
    if(!firstTime){
     localStorage.setItem('refresh','loaded')
     location.reload()
    }else {
      localStorage.removeItem('refresh') 
    }  
  }
}

  //Crear usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // registerUser(usuario: usuarioModel){
  //   const authData={
  //     ...usuario,
  //     returnSecureToken: true
  //     };    
  //     return this.http.post(
  //     `${this.url}/accounts:signUp?key=${this.apiKey}`,
  //     authData)
  //     // Esto guardaba el token despues del registro, pero
  //     // lo saque por quiero que se loguen despues del registro
  //     // .pipe(map( resp => {this.guardarToken(resp['idToken']);
  //     // return resp;}));
    
  // }

  //Loguear usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  // logIn(usuario:usuarioModel){
  //   const authData={
  //     ...usuario,
  //     returnSecureToken: true
  //   }
  //   return this.http.post(
  //     `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`,
  //     authData
  //   ).pipe(
  //     map( resp => {
  //       this.guardarToken(resp['idToken']);
  //       this.guardarEmail(resp['email']);
  //       return resp;
  //     })
  //   )
  //   ;
  // }

  // //Desloguear usuario
  // logOut(){
  //   localStorage.removeItem('Token')
  //   localStorage.removeItem('expira');
  //   localStorage.removeItem('Email');
  //   localStorage.removeItem('DNI');
  // }

