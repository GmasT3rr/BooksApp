import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Observable } from 'rxjs';
import { usuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';


type CollentionPredicate<T> = string | AngularFirestoreCollection;
type DocumentPredicate<T> = string | AngularFirestoreDocument;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private usuarioDatos: AngularFirestoreCollection
  private librosPrestados: AngularFirestoreCollection
  private librosInfo: AngularFirestoreCollection
  private itemDoc: AngularFirestoreDocument


  constructor(private afs: AngularFirestore,private http:HttpClient) {
    this.usuarioDatos = afs.collection('Usuarios')
    this.librosPrestados = afs.collection('Prestamos')
    this.librosInfo = afs.collection('LibrosIngresados')
   }

  //-------------- Almacenar info en firebase --------------\\

  // "guardarUsuarioFirebase" 
  // Guarda los datos de registro de los usuarios
  guardarUsuarioRegistrado(datos:usuarioModel):void{
    this.usuarioDatos.add(datos)
  }
 // Guarda un prestamos, relacionando ISBN y DNI de usuario
  saveBookToUser(isbn:any ,email:any ):void{
    this.librosPrestados.add({isbn,email});
  }
     
  //Guarda toda la informacion del libro
  saveBookToDB(libro:any,owner:string):void{
     this.librosInfo.add({libro,owner});
  }

  //-------------- Obtener info de firebase --------------\\

  // Obtiene los libros de firebase
  async getBooksInDB():Promise<Observable<any>>{
    return this.afs.collection('LibrosIngresados').snapshotChanges()
  }
    
  // Obtiene los prestamos de firebase
  async getLoans(){
    return this.afs.collection('Prestamos').snapshotChanges()
  }

  // Obtiene los usuarios de firebase
  obtenerUsuarioFirebase():Observable<any>{
    return this.afs.collection('Usuarios').snapshotChanges()

  }
  
   getUserBooks(owner:string){
    return this.afs.collection('LibrosIngresados',ref=> ref.where('owner','==',owner)).snapshotChanges()

  }

}
