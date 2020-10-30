import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PhotoComponent } from './components/photo/photo.component'
import { VideoComponent } from './components/video/video.component';

const routes: Routes = [
  {
    path: '', component: PhotoComponent
  },
  {
    path: 'videos', component: VideoComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'contact', component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
