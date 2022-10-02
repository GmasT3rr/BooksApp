import { Component,  HostListener,  OnDestroy,  OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  books: any[] = []
  librosSlideShow: any[] = []

  
  constructor(private librosService: LibrosService, private authService:AuthService) { }

  @HostListener('window:scroll',['$event'])
  onScroll(){
    
    const posicion = (document.documentElement.scrollTop) +1600
    const posMax = document.documentElement.scrollHeight

    if(posicion > posMax){
      
      if(this.librosService.cargando){return;}
      this.librosService.indice +=12;
      this.librosService.buscarLibrosAleatorios()
      .subscribe((resp)=>{
      this.books.push(...resp.items);
      })}}


  ngOnInit(): void {
    // this.authService.refresh();
    this.librosService.buscarLibrosAleatorios()
    .subscribe(resp=>{
      this.books = resp.items;
      this.librosSlideShow = resp.items;
    })
  }

 ngOnDestroy(): void {
     this.librosService.resetearIndiceDeBusqueda();
 }

}
