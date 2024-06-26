import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  public searchedBooks:any[] = []; 
  public texto:string

  constructor( private  activatedRoute: ActivatedRoute, private librosService: LibrosService) { }

  ngOnInit(): void {
    this.getSearchParams()
  }

  getSearchParams(){
    this.activatedRoute.params.subscribe(params=>{
      this.texto = params['texto']
      this.librosService.buscarLibroEspecifico(params['texto'])
      .subscribe(resp=>{
      this.searchedBooks = resp['items']
      })
    })
  }

  @HostListener('window:scroll',['$event'])
  addBooklsOnScroll(){
    const posicion = (document.documentElement.scrollTop) +1300
    const posMax = document.documentElement.scrollHeight
    if(posicion > posMax){
      if(this.librosService.cargando){return;}
      this.librosService.indice +=12;
      this.librosService.buscarLibroEspecifico(this.texto)
      .subscribe((resp)=>{
      this.searchedBooks.push(...resp['items']);
      })
    }
  }

    
}
