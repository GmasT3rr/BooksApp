import { Component,  OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  
  private email = localStorage.getItem('Email')
   private dni = localStorage.getItem('dni')


  constructor(private firebase:FirebaseService, 
    private router:Router, 
    private authService: AuthService,
    ) {     }

  ngOnInit(): void {

  this.getUsuarioFirebase();
  this.getTablaPrestamo();
  this.getLibrosDelUsuario();
}

//Obtener datos del usuario logueado


getUsuarioFirebase(){
  this.firebase.obtenerUsuarioFirebase()
  .subscribe(resp=>{
    this.usuarioEnFirebase = []
    this.DNI = []
    resp.forEach((element:any) => {
    if(this.email === element.payload.doc.data().email){
      this.usuarioEnFirebase.push({
        id: element.payload.doc.id,
        ... element.payload.doc.data()
      })
      this.DNI.push({
        dni: element.payload.doc.data().dni
      })
    }
    });
    // console.log('Perfil-component: Datos del usuario  ->',this.usuarioEnFirebase)
    // console.log('Usuario DNI  ->',this.DNI[0].dni)
    // localStorage.setItem('dni',this.DNI[0].dni)

    // this.authService.refresh();

  })

}


//Trae todos los libros de firebase, es solo de prueba
getLibrosDelUsuario(){
  this.firebase.obtenerInfoLibro()
  .subscribe(resp=>{
    this.librosDelUsuario = []
    resp.forEach((element:any) => {
      if(this.DNI[0].dni === element.payload.doc.data().dni  ){
        this.librosDelUsuario.push({
          ... element.payload.doc.data()
        }) 
      }
    });
  })
  //  console.log('Perfil-component: Libros del usuario  ->',this.librosDelUsuario)

}

//Obtiene los prestamos relacioandos al DNI del usuario
getTablaPrestamo(){
  this.firebase.obtenerPrestamosFirebase()
  .subscribe(resp=>{
    this.prestamoEnFirebase = []
    resp.forEach((element:any) => {
      if(this.DNI[0].dni === element.payload.doc.data().DNI  ){
        this.prestamoEnFirebase.push({
          ... element.payload.doc.data()
        })
      }

    });
     console.log('Perfil-component: Traer prestamos de este usuario  ->',this.prestamoEnFirebase)
  })
}


//Te redirige a la pagina con la informacion de libro cuando clikeas en el
 idLibro:string
clickEnLibro(libro: any){
  this.idLibro = libro.libro.id
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
