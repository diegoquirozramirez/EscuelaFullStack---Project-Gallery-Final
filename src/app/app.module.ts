import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store'
import { simpleReducer } from './simple.reducer'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PhotoComponent } from './components/photo/photo.component';
import { VideoComponent } from './components/video/video.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from "ngx-spinner";
import { SpinerSimpleComponent } from './components/custom/spinner/spiner-simple/spiner-simple.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotoComponent,
    VideoComponent,
    AboutComponent,
    ContactComponent,
    SpinerSimpleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    StoreModule.forRoot({ photos: simpleReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
