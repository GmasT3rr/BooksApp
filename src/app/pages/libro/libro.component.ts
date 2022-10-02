import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { FirebaseService } from '../../services/firebase.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})


export class LibroComponent implements OnInit, OnDestroy {

  public  libro:any
  private user:any
  private currentUserEmail:string
  private userLoans:any[] = []
  private alreadyLoaned:any = ''
  public  exists= false

  constructor(private activatedRoute: ActivatedRoute,
    private librosService: LibrosService,
     private firebaseService:FirebaseService,
     private authService:AuthService) { }
  



  ngOnInit(): void {
    this.getCurrentUser()
    this.getCurrentBook()
    // this.getUserLoans()
    // this.loanExists()

  }
  ngOnDestroy(): void {
    this.librosService.resetearIdLibro()
  }
  

  //Trae el libro actual de la API
  getCurrentBook(){
    const id = this.activatedRoute.snapshot.params['id'];
    this.librosService.id = id
    this.librosService.searchBookById()
    .subscribe(libro=>{
    this.libro = libro
    this.getUserLoans()
    this.loanExists()

    })
  }


  // Guarda el prestamo realizado en Firebase
  saveLoan(){
    const userEmail = this.user.email
    if( !this.exists){
      this.firebaseService.saveBookToUser(this.libro.id, userEmail)
      this.firebaseService.saveBookToDB(this.libro,userEmail)
      Swal.fire({
        title: 'Gracias!',
        text: 'Ya puede ver su pedido en su perfil',
        timer: 2000
    }).then(()=>
    this.authService.refresh()
    );
    } else{
      Swal.fire({
        title: 'Lo sentimos',
        text: 'Usted ya posee este libro',
        timer: 2000
    }).then(()=>
      this.authService.refresh()
    );
    }
  }
  
  //Devuelve el usuario logueado
  async getCurrentUser(){
    (await this.authService.checkCurrentUser())
     .subscribe((user:any)=>{
        this.user = user
        this.currentUserEmail = user.email      
     });
  }

  //Trae los prestamos de este usuario para mas adelante compararlos
  async getUserLoans(){
      (await this.firebaseService.getLoans()).subscribe((loans:any)=>{
      loans.forEach((res:any) => {
        const book=res.payload.doc.data()
        if(book.email === this.currentUserEmail )
        {        
          this.userLoans.push(book)
        }
        if(book.email === this.currentUserEmail && book.isbn === this.libro.id )
        {        
          this.alreadyLoaned = book
        }
      });
    })
  }

  //Despues de un segundo verifica si el usuario posee este libro, a fin de evitar guardar libros duplicados
  loanExists(){
      Swal.showLoading()
  setTimeout(() => {
    if (this.libro.id === this.alreadyLoaned.isbn) {
      this.exists = true;
    }
    console.log(this.exists);
    Swal.close();
  }, 2000);

  }


  //----Modal

  displayStyle = "none";
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

}
