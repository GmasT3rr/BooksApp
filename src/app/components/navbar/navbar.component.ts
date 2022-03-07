import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  salir(){
    this.auth.logOutDePrueba();
    this.router.navigateByUrl('/login')
  }

  buscarLibro(texto:string){
  texto = texto.trim();
  if(texto.length===0){return;}

  this.router.navigate(['/buscar',texto]);
  }

}
