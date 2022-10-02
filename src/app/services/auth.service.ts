import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';



@Injectable()
export class AuthService {
  constructor(private angularFireAuth:AngularFireAuth) {}
   
  async enviarEmailDeRegsitro(){
    return  await(await this.angularFireAuth.currentUser).sendEmailVerification()
  }

   //Crear usuario
   async registerAccount(email:string, password:string){
    await this.angularFireAuth.createUserWithEmailAndPassword(email,password)
  }
  
  //Loguear usuario
  async logInAccount(email:string, password:string){
    await this.angularFireAuth.signInWithEmailAndPassword(email,password)
  }

  //Ver usuario logueado
  async checkCurrentUser(){
    return this.angularFireAuth.authState
  }
  // Desloguear usuario  
  logOut(){
    this.angularFireAuth.signOut();
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


