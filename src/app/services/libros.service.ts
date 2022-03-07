import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  indice = 0;
  private url = 'https://www.googleapis.com/books/v1'
  private apiKey = 'keyAIzaSyBAQ3UewltGmcPET4QpMOwIRcHWw9TfKEI'
  private cantidad ='maxResults=12'
  cargando:boolean = false
  titulo:string;
  id:string

  constructor(private hhtp: HttpClient) { }

  //Busca todos los libros recientes
  buscarLibrosAleatorios():Observable<any>{
    this.cargando=true

    return this.hhtp.get (`${this.url}/volumes?q=orderBy=relevance&startIndex=${this.indice}&${this.cantidad}&${this.apiKey}`)
    .pipe(tap(()=>{
      this.cargando = false; 
  }));

  }
  
  //Busca el libro especifico que hayas clickeado
  buscarLibroEspecifico(texto: string){
    
    this.titulo = texto
    this.cargando=true
    return this.hhtp.get (`${this.url}/volumes?q=intitle=${this.titulo}&startIndex=${this.indice}&maxResults=12&${this.apiKey}`)
    .pipe(tap(()=>{
      this.cargando = false; 
    }));

  }
  
  //Busca el libro por isbn<->id
  buscarLibroPorId(){
    
    return this.hhtp.get (`${this.url}/volumes/${this.id}`)

  }
  

  resetearIndiceDeBusqueda(){
    this.indice = 0;
  }

  resetearIdLibro(){
    this.id = ''
  }
}




// https://www.googleapis.com/books/v1/volumes?q=isbn=LTTvmUU8rskC&keyAIzaSyBAQ3UewltGmcPET4QpMOwIRcHWw9TfKEI