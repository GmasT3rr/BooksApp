import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:boolean
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.checkUser()
  }

  async checkUser(){
    (await this.authService.checkCurrentUser()).subscribe(res=>{
      if(res === null) {
        this.user=false
      }else this.user=true
    })
  }
  async logOut(){
   await this.authService.logOut();
   this.authService.refresh()
  }

  searchBook(texto:string){
  texto = texto.trim();
  if(texto.length===0){return;}

  this.router.navigate(['/buscar',texto]);
  }

}
