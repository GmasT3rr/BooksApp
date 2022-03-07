import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { usuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private usuarioDatos: AngularFirestoreCollection
  private librosPrestados: AngularFirestoreCollection
  private librosInfo: AngularFirestoreCollection
  private librosIngresados: AngularFirestoreCollection

  constructor(private afs: AngularFirestore,private http:HttpClient) {
    this.usuarioDatos = afs.collection('Usuarios')
    this.librosPrestados = afs.collection('Prestamos')
    this.librosInfo = afs.collection('Informacion de libros')
    //----//
    this.librosIngresados = afs.collection('Libros ingresados')


   }



 //--------De prueba-------//

   guardarLibrosIngresados(ISBN:any, cantPrestados:any ):void{
    this.librosIngresados.add({ISBN,cantPrestados});
  }

    obtenerLibrosIngresados():Observable<any>{
      return this.afs.collection('Libros ingresados').valueChanges()
  
    }
  
    itemDoc: AngularFirestoreDocument
    editar(item:any){
      this.itemDoc = this.afs.doc('Libros ingresados/'+item)
      this.itemDoc.update(item)
    }

 //--------De prueba-------//



    //-------------- Almacenar info en firebase --------------\\


  // "guardarUsuarioFirebase" 
  // Guarda los datos de registro de los usuarios
  guardarUsuarioRegistrado(datos:usuarioModel):void{
    this.usuarioDatos.add(datos)
  }
 // "guardarLibroFirebase" 
 // Guarda un prestamos, relacionando ISBN y DNI de usuario
  guardarPrestamo(ISBN:any ,DNI:any ):void{
    this.librosPrestados.add({ISBN,DNI});
  }
     
  // "guardarInfoLibro" 
  //Guarda toda la informacion del libro

  guardarInfoLibro(libro:any ,dni:any):void{
    this.librosInfo.add({libro,dni});
  }

  //-------------- Obtener info de firebase --------------\\

  // Obtiene los libros de firebase
  obtenerInfoLibro():Observable<any>{
    return this.afs.collection('Informacion de libros').snapshotChanges()

  }
    
  // Obtiene los prestamos de firebase

  obtenerPrestamosFirebase():Observable<any>{
    return this.afs.collection('Prestamos').snapshotChanges()

  }

  // Obtiene los usuarios de firebase

  obtenerUsuarioFirebase():Observable<any>{
    return this.afs.collection('Usuarios').snapshotChanges()

  }
  

}
