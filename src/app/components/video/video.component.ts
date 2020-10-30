import { Component, OnInit } from '@angular/core';
import { Photo } from '../../models/photo/photoModel';
import { PhotoService } from '../../services/photo/photo.service'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  public photo: Photo;
  public photos: Array<Photo>

  constructor(
    private _services: PhotoService
  ) { }

  ngOnInit(): void {
    this.getVideo();
  }


  getVideo(){
    this._services.getPhotos().subscribe(
      res => {
        console.log("exito", res);
        this.photos = res;
      },
      err => {
        console.log("hubo un error", err)
      }
    )
  }

  processFile(imageInput: any){
    console.log(imageInput.files)
    console.log(imageInput.files[0])
    
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.photo = new Photo(Date.now().toString(), file.name , event.target.result, new Date, '999,999');

      this._services.postPhoto(this.photo).subscribe(
        res => {
          console.log("Exitoso", res);
          this.getVideo();
        },
        err => {
          console.log("hubo un error", err)
        }
      )
    });

    reader.readAsDataURL(file);

  }



}
