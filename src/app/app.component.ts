import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'appLibros';

  token:boolean = true

  constructor(private authService:AuthService){
  }


  ngAfterViewInit(): void {
     if(  this.authService.userToken.length > 0){
       this.token = true
        // this.authService.refresh();
   }else{
      this.token = false}
      // this.authService.refresh();

  }
  

}