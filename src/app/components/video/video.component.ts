import { Component, OnInit } from '@angular/core';
import { Video } from '../../models/video/videoModel';
import { VideoService } from '../../services/video/video.service'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  public video: Video;
  public videos: Array<Video>;
  public loading: boolean;

  public typeContent: string = "data:video/webm;base64,";
  public contentDecoded: string;

  constructor(
    private _services: VideoService
  ) {
    this.loading = false;
   }

  ngOnInit(): void {
    this.getVideo();
  }


  getVideo(){
    this.loading = true;
    this._services.getVideos().subscribe(
      res => {
        console.log("exito", res);
        this.videos = res;        
      },
      err => {        
        console.log("hubo un error", err)
      }
    );
    this.loading = false;
  }

  processFile(videoInput: any){
    
    const file: File = videoInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.loading = true;
      this.contentDecoded = (event.target.result).toString().split(",")[1];
      this.video = new Video(Date.now().toString(), file.name , `${this.typeContent}${this.contentDecoded}`, new Date, '999,999');
      
      this._services.postVideo(this.video).subscribe(
        res => {
          console.log("Exitoso", res);
          this.getVideo();
          this.loading = false;
        },
        err => {
          console.log("hubo un error", err)
        }
      )
    });
    this.loading = false;
    reader.readAsDataURL(file);

  }

  deleteVideo(id: any){
    this.loading = true;
    this._services.deleteVideo(id).subscribe(
      res => {
        this.getVideo();
        alert("Se eliminó el video" + id)
      },
      err => {
        this.loading = false;
        alert("No se eliminó el video" + id)
      }
    );
    this.loading = false;
  }

  updatePhoto(id:string, videoInput: any){
    console.log("DATOs", id, videoInput)
    const file: File = videoInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.loading = true;
      this.contentDecoded = (event.target.result).toString().split(",")[1];
      this.video = new Video(Date.now().toString(), file.name , `${this.typeContent}${this.contentDecoded}`, new Date, '999,999');
      
      this._services.putVideo(id, this.video).subscribe(
        res => {
          console.log("Actualizacion correcta", res);
          this.getVideo();
          this.loading = false;
        },
        err => {
          console.log("hubo un error", err)
          this.loading = false;
        }
      )
    });
    this.loading = false;
    reader.readAsDataURL(file);

  }




}
