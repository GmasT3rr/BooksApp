import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { usuarioModel } from '../../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent  {

  signUpForm: FormGroup;
  usuario: usuarioModel;
  constructor(private servicioAuth:AuthService, private router: Router, private firebase:FirebaseService) {
    this.signUpForm = this.createFormGroup();
    this.usuario = new usuarioModel()
   }


  expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{5,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    dni: /^\d{8,8}$/, // 7 a 14 numeros.
    numero: /^\d{7,14}$/, // 7 a 14 numeros.
}


  createFormGroup(){
    return new FormGroup({
      nombre  :new FormControl('', [Validators.required,Validators.pattern(this.expresiones.nombre)]),
      apellido  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.nombre)]),
      // usuario  :new FormControl('',[Validators.required,Validators.minLength(5)]),
      password  :new FormControl('',[Validators.required,Validators.minLength(5)]),
      passwordRepeat  :new FormControl('',[Validators.required,Validators.minLength(5)]),
      // dni  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.dni)]),
      email  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.email)]),
      // telefono  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.numero)]),
      // localidad  :new FormControl('',[Validators.minLength(5)]),
  
    })
  }
  
  signUp(){     
  if(this.signUpForm.value.password != this.signUpForm.value.passwordRepeat){
    Swal.fire({
      icon: 'error',
      title:'Las contraseñas deben ser iguales',
    })
  }
  else{    
    const email = this.signUpForm.value.email
    const password = this.signUpForm.value.password
    Swal.fire({
    allowOutsideClick: false,
    text: 'Espere por favor'
    })
    Swal.showLoading();
    this.servicioAuth.registerAccount(email,password)
    .then(()=>{
      Swal.close(); 
          Swal.fire({
            icon: 'success',
            title:'Registro exitoso',
          })
    })
    .catch(err =>{
        Swal.fire({
          icon: 'error',
          title:'Error al registrarse',
          text: err.message,
        })
    })
  }
}

  get nombreInvalido(){return this.signUpForm.get('nombre')?.invalid && this.signUpForm.get('nombre')?.touched }
  get apellidoInvalido(){return this.signUpForm.get('apellido')?.invalid && this.signUpForm.get('apellido')?.touched }
  get usuarioInvalido(){return this.signUpForm.get('usuario')?.invalid && this.signUpForm.get('usuario')?.touched }
  get passwordInvalido(){return this.signUpForm.get('password')?.invalid && this.signUpForm.get('password')?.touched }
  get passwordRepeatInvalido(){return this.signUpForm.get('passwordRepeat')?.invalid && this.signUpForm.get('passwordRepeat')?.touched}
  get emailInvalido(){return this.signUpForm.get('email')?.invalid && this.signUpForm.get('email')?.touched }

  // get dniInvalido(){return this.signUpForm.get('dni')?.invalid && this.signUpForm.get('dni')?.touched }
  // get telefonoInvalido(){return this.signUpForm.get('telefono')?.invalid && this.signUpForm.get('telefono')?.touched }
  // get localidadInvalido(){return this.signUpForm.get('localidad')?.invalid && this.signUpForm.get('localidad')?.touched }

  
}
