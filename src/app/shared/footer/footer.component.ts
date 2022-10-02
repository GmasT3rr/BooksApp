import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public user=false
  constructor(private authService:AuthService) { }

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
}
