import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { LibrosService } from '../../services/libros.service';
import Swiper from 'swiper';
import { Router } from '@angular/router';


@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() libros:any [] = []

  private mySwiper: Swiper;


  constructor(private librosService: LibrosService,private router:Router) { }

  ngAfterViewInit(): void {
  this.mySwiper = new Swiper('.swiper-container', {
  loop: true,
  spaceBetween: 4000,
  
}); 
}

  ngOnInit(): void {
    
  }



 onSlideNext(){
   this.mySwiper.slideNext()
 }

  onSlidePrev(){
  this.mySwiper.slidePrev()
}

idLibro:string
clickEnLibro(libro: LibrosService){
  this.idLibro = libro['id']
  this.router.navigateByUrl(`/libro/${this.idLibro}`)
  console.log('libros-poster id libro',this.idLibro)
}


}
