import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private servicioAuth:AuthService, private router: Router) {
    this.signInForm = this.createFormGroup();
   }


  expresiones = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}


  createFormGroup(){
    return new FormGroup({
      email  :new FormControl('',[Validators.required,Validators.pattern(this.expresiones.email)]),
      password  :new FormControl('',[Validators.required,Validators.minLength(5)]),
    })
  } 

   signIn(){     
    const email = this.signInForm.value.email
    const password = this.signInForm.value.password
    this.servicioAuth.logInAccount(email,password)
    .then(()=>{
      this.router.navigateByUrl('/main');
    })
    .catch(err =>{
        Swal.fire({
          icon: 'error',
          title:'Error al ingresar',
          text: err.message,
        })
    })
}

  ngOnInit(): void {
    this.servicioAuth.refresh();
  }

  get emailInvalido(){return this.signInForm.get('email')?.invalid && this.signInForm.get('email')?.touched }
  get passwordInvalido(){return this.signInForm.get('password')?.invalid && this.signInForm.get('password')?.touched }
}
