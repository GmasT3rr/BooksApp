import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { SwiperModule } from 'swiper/angular';
import { BrowserModule } from '@angular/platform-browser';
import { LibrosPosterComponent } from './libros-poster/libros-poster.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SlideshowComponent,
    LibrosPosterComponent
  ],
  exports:[
    NavbarComponent,
    SlideshowComponent,
    LibrosPosterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SwiperModule,
    BrowserModule
  ]
})
export class ComponentsModule { }
