import { Component,  HostListener,  OnDestroy,  OnInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  libros: any[] = []
  librosSlideShow: any[] = []


  @HostListener('window:scroll',['$event'])
  onScroll(){
    
    const posicion = (document.documentElement.scrollTop) +1600
    const posMax = document.documentElement.scrollHeight

    if(posicion > posMax){
      
      if(this.librosService.cargando){return;}
      this.librosService.indice +=12;
      this.librosService.buscarLibrosAleatorios()
      .subscribe((resp)=>{
      this.libros.push(...resp.items);
      })}}

  constructor(private librosService: LibrosService, private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.refresh();

    this.librosService.buscarLibrosAleatorios()
    .subscribe(resp=>{
      this.libros = resp.items;
      this.librosSlideShow = resp.items;
    })
  }

 ngOnDestroy(): void {
     this.librosService.resetearIndiceDeBusqueda();
 }

}
