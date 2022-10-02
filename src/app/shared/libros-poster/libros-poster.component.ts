import { Component, OnInit, Input } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libros-poster',
  templateUrl: './libros-poster.component.html',
  styleUrls: ['./libros-poster.component.css']
})
export class LibrosPosterComponent implements OnInit {

  @Input() books:any [] = []

  constructor( private router: Router) { }

  ngOnInit(): void {

  }

  idLibro:string
  clickEnLibro(libro: LibrosService){
    this.idLibro = libro['id']
    this.router.navigateByUrl(`/libro/${this.idLibro}`)
  }
    
}
