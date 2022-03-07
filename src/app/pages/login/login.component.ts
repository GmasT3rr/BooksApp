import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { usuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  get emailInvalido(){return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched }
  get passwordInvalido(){return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched }

  expresiones = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

  usuario!: usuarioModel;

  createFormGroup(){
    return new FormGroup({
      email  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.email)]),
      password  :new FormControl('',[Validators.required,Validators.minLength(5)]),
      recordarUsuario: new FormControl(),

    })
  } 

  loginForm: FormGroup;
  constructor(private servicioAuth:AuthService, private router: Router) {
    this.loginForm = this.createFormGroup();
   }

  
   onLoginDePrueba(){
    if (this.loginForm.invalid) {
      Swal.fire({
      icon: 'error',
      title:'Debe llenar todos los campos',
    }) }else{
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor'
    })
    Swal.showLoading();
    this.usuario = this.loginForm.value
    this.servicioAuth.logInDePrueba(this.usuario.email,this.usuario.password)
    .then((res)=>{
      console.log('User',res)
      Swal.close(); 
      this.router.navigateByUrl('/main');
    }).catch(err =>{
      Swal.fire({
        icon: 'error',
        title:'Error al autenticar',
        text: err.message,
      })
    })
  }
  }

  //--------------------------------------------------------//

  ngOnInit(): void {
    this.servicioAuth.refresh();
    this.getEmail();
    this.usuario = new usuarioModel();
  }

  getEmail(){
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.usuario.recordarUsuario = true;
    }
  }

  // onLogin(){
  //   if (this.loginForm.invalid) {return console.log('Form invalido')}

  //   Swal.fire({
  //     allowOutsideClick: false,
  //     text: 'Espere por favor'
  //   })
  //   Swal.showLoading();

  //   this.usuario = this.loginForm.value
  //   // console.log('Form->', this.loginForm)
  //   // console.log(('usuarioModel->'),this.usuario )
  //  // this.servicioAuth.saveMsg(this.loginForm.value)

  //  this.servicioAuth.logIn(this.usuario)
  //  .subscribe(resp =>{
  //    Swal.close();

  //   if(this.usuario.recordarUsuario){
  //     localStorage.setItem('email',this.usuario.email)
  //   }

  //    this.router.navigateByUrl('/main');

  //  },(err=>{
  //    console.log(err.error.error.message)
  //    Swal.fire({
  //     icon: 'error',
  //     title:'Error al autenticar',
  //     text: err.error.error.message,
  //   })
  //  }))
  // }

}
