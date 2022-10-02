import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { BrowserModule } from '@angular/platform-browser';
import { LibrosPosterComponent } from './libros-poster/libros-poster.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    LibrosPosterComponent,
    NavbarComponent,
    SlideshowComponent,
    FooterComponent
  ],
  exports:[
    LibrosPosterComponent,
    NavbarComponent,
    SlideshowComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SwiperModule,
    BrowserModule
  ]
})
export class SharedModule { }
