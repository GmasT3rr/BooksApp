import { Component, OnInit } from '@angular/core';
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
export class RegistrarseComponent implements OnInit {

  expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{5,40}$/, // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    dni: /^\d{8,8}$/, // 7 a 14 numeros.
    numero: /^\d{7,14}$/, // 7 a 14 numeros.
}

 usuario!: usuarioModel;

  createFormGroup(){
    return new FormGroup({
      nombre  :new FormControl('', [Validators.required,Validators.pattern(this.expresiones.nombre)]),
      apellido  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.nombre)]),
      usuario  :new FormControl('',[Validators.required,Validators.minLength(5)]),
      password  :new FormControl('',[Validators.required,Validators.minLength(5)]),
      dni  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.dni)]),
      email  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.email)]),
      telefono  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.numero)]),
      localidad  :new FormControl('',[Validators.minLength(5)]),
  
    })
  }
  
  registerForm: FormGroup;
  constructor(private servicioAuth:AuthService, private router: Router, private firebase:FirebaseService) {
    this.registerForm = this.createFormGroup();
    this.usuario = new usuarioModel()

   }

  ngOnInit(): void {
  }

  onRegisterDePrueba(){
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'error',
        title:'Debe llenar todos los campos',
      })
    }else{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Espere por favor'
      })
      Swal.showLoading();
      this.usuario = this.registerForm.value
      this.firebase.guardarUsuarioRegistrado(this.usuario) 
      // console.log(this.usuario)
      this.servicioAuth.registerUserDePrueba(this.usuario.email,this.usuario.password)
      .then((res)=>{
        console.log(res)
        Swal.close(); 
        Swal.fire({
          icon: 'success',
          title:'Registro exitoso',
        })
     this.router.navigateByUrl('/login');
      }).catch(err =>{
          Swal.fire({
            icon: 'error',
            title:'Error al registrarse',
            text: err.message,
          })
      })
    }

  }

//-------------------------------------------------------------------//


  // onRegister(){
  //   if (this.registerForm.invalid) {
  //     Swal.fire({
  //       icon: 'error',
  //       title:'Debe llenar todos los campos',
  //     })
  //     // return console.log('Form invalido')
  //   }
  //   Swal.fire({
  //     allowOutsideClick: false,
  //     text: 'Espere por favor'
  //   })
  //   Swal.showLoading();
  //   this.usuario = this.registerForm.value
  //   this.servicioAuth.registerUser(this.usuario)
  //   .subscribe(resp =>{
  //     // console.log(resp)
  //     Swal.close();
  //     Swal.fire({
  //       icon: 'success',
  //       title:'Registro exitoso',
  //     })
  //     this.router.navigateByUrl('/login');
  //   },(err=>{
  //     // console.log(err.error.error.message)
  //     Swal.fire({
  //       icon: 'error',
  //       title:'Error al registrarse',
  //       text: err.error.error.message,
  //     })
  //   }))
  //   this.firebase.guardarUsuarioRegistrado(this.usuario)      
  // }





  get nombreInvalido(){return this.registerForm.get('nombre')?.invalid && this.registerForm.get('nombre')?.touched }
  get apellidoInvalido(){return this.registerForm.get('apellido')?.invalid && this.registerForm.get('apellido')?.touched }
  get usuarioInvalido(){return this.registerForm.get('usuario')?.invalid && this.registerForm.get('usuario')?.touched }
  get passwordInvalido(){return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched }
  get dniInvalido(){return this.registerForm.get('dni')?.invalid && this.registerForm.get('dni')?.touched }
  get emailInvalido(){return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched }
  get telefonoInvalido(){return this.registerForm.get('telefono')?.invalid && this.registerForm.get('telefono')?.touched }
  get localidadInvalido(){return this.registerForm.get('localidad')?.invalid && this.registerForm.get('localidad')?.touched }

  
}
