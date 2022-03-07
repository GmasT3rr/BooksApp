import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute,  } from '@angular/router';
import { LibrosService } from '../../services/libros.service';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css']
})
export class LibroComponent implements OnInit, OnDestroy {


  constructor(private activatedRoute: ActivatedRoute,
    private librosService: LibrosService,
     private firebase:FirebaseService,
     private afs: AngularFirestore,) { }
  
  public libro:any;
  private DNI:any[] = [] 
  private email = localStorage.getItem('Email')


  ngOnInit(): void {
    this.buscarLibroPorId()
    this.obtenerDNI()
    this.tablaPrestamos()
  }
  
  buscarLibroPorId(){
    const id = this.activatedRoute.snapshot.params['id'];
    // console.log('libro-component esta es la id',id)
    this.librosService.id = id
    this.librosService.buscarLibroPorId()
    .subscribe(libro=>{
    // console.log('libro-component: Datos del libro ->',libro)
    this.libro = libro
    })
  }

  obtenerDNI(){
    this.firebase.obtenerUsuarioFirebase()
    .subscribe(resp=>{
      this.DNI = []
      resp.forEach((element:any) => {
      if(this.email === element.payload.doc.data().email)
        this.DNI.push({
          dni: element.payload.doc.data().dni
        })
      });
       console.log('libro-component: Traer usuario DNI  ->',this.DNI[0].dni)
    })
  }

  ngOnDestroy(): void {
      this.librosService.resetearIdLibro()
  }

  guardarPrestamo(){
    const dniUsuario = this.DNI[0].dni
    this.firebase.guardarPrestamo(this.libro.id, dniUsuario)
  }

  guardarInfoLibro(){
    const dniUsuario = this.DNI[0].dni
    this.firebase.guardarInfoLibro(this.libro,dniUsuario) 
      Swal.fire({
        title: 'Gracias!',
        text: 'Ya puede ver su pedido en su perfil',
        timer: 2000
    })
  }

  //----Modal

  displayStyle = "none";
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  //------Escribir en firebase pruebaa


  agregarLibrosIngreasados(){
    this.firebase.guardarLibrosIngresados(this.libro.id,'0')
  }

  //-------------------------------------------------//
  tabla:any
  tablaPrestamos(){
    this.firebase.obtenerLibrosIngresados().subscribe(tabla =>{
      this.tabla=tabla
      console.log('libros en prestamo',this.tabla)
    })
  }
  



  // public librosDelUsuario: any[] = []

  // getLibrosDelUsuario(){
  //   this.firebase.obtenerLibroFirebase()
  //   .subscribe(resp=>{
  //     this.librosDelUsuario = []
  //     resp.forEach((element:any) => {
  //       if(this.DNI[0].dni === element.payload.doc.data().dni  ){
  //         this.librosDelUsuario.push({
  //           ... element.payload.doc.data()
  //         }) 
  //       }
  //     });
  //   })
  //   //  console.log('Perfil-component: Libros del usuario  ->',this.librosDelUsuario)
  // }


  
}
