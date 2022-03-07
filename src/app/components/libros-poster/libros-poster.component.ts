import { Component, OnInit, Input } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-libros-poster',
  templateUrl: './libros-poster.component.html',
  styleUrls: ['./libros-poster.component.css']
})
export class LibrosPosterComponent implements OnInit {

  @Input() libros:any [] = []

  constructor(private librosService: LibrosService, private router: Router) { }

  ngOnInit(): void {
    // console.log('libros-poster .items ->',this.libros)

  }

  idLibro:string
  clickEnLibro(libro: LibrosService){
    this.idLibro = libro['id']
    this.router.navigateByUrl(`/libro/${this.idLibro}`)
    console.log('libros-poster id libro',this.idLibro)
  }
    
}
