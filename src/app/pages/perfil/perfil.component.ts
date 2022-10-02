import { Component,  OnInit, Input, AfterContentInit, AfterContentChecked } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LibrosService } from '../../services/libros.service';
import { delay, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  @Input() libros:any [] = []

  public librosDelUsuario: any[] = []
  public usuarioEnFirebase: any[] = []
  public prestamoEnFirebase: any[] = []
  private DNI:any[] = [] 
  private user:any
  private currentUserEmail:string
  private userLoans:any[] = []
  public userBooks=[]
  public allBooksInDB=[]
  public idLibro:string



  constructor(private firebaseService:FirebaseService, 
    private router:Router, 
    private authService: AuthService,
    ) {     }

  async ngOnInit(): Promise<void> {
    this.getCurrentUser()
    this.getLoans()
    this.getUserLoanedBooks()


}

//Obtener datos del usuario logueado

async getCurrentUser(){
   (await this.authService.checkCurrentUser())
    .subscribe((user:any)=>{
    this.user = user
    this.currentUserEmail = user.email
    });
  }
  

 async getLoans(){
     (await this.firebaseService.getLoans()).subscribe((loans:any)=>{
      loans.forEach((res:any) => {
        // console.log(res.payload.doc.data());
        const book=res.payload.doc.data()
        if(res.payload.doc.data().email === this.currentUserEmail)
        {        
          this.userLoans.push(book)
        }
      });
    })
  }

  getUserLoanedBooks(){
    setTimeout(() => {
      const email = this.currentUserEmail;
      this.firebaseService.getUserBooks(email).subscribe((res:any)=>{
       res.forEach(element => {
         //  console.log(element.payload.doc.data().libro);
         const book = element.payload.doc.data().libro
         this.userBooks.push(book)
       });
     })
    }, 500);
  }
  clickEnLibro(libro: any){
    this.idLibro = libro.id
    this.router.navigateByUrl(`/libro/${this.idLibro}`)
  }
  
  public show = false
  showMore(){
    this.show = true
  }
  showLess(){
  this.show = false
  }


}
