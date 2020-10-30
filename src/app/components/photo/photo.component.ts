import { Component, OnInit, ViewChild } from '@angular/core';
import { PhotoService } from '../../services/photo/photo.service'
import { Photo } from '../../models/photo/photoModel'

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  public photos: Array<Photo>;
  public conditional: Boolean;
  public photo: Photo;
  public dataFilter: String;

  @ViewChild('form') form;
  @ViewChild('form2') form2;

  constructor(
    private _service: PhotoService
    
  ) { 
    this.conditional = false;
    this.dataFilter = "";
   }

  ngOnInit(): void {
    this.getPhotos();
  }

  /**
   * SECCION DE CONSUMO DE SERVICES
   */

  getPhotos(){
    this._service.getPhotos().subscribe(
      res => {
        console.log("Se obtuvieron las fotos", res);
        this.photos = res;
        if(this.photos.length > 0) return this.conditional = true;
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

      this._service.postPhoto(this.photo).subscribe(
        res => {
          console.log("Exitoso", res);
          this.getPhotos();
        },
        err => {
          console.log("hubo un error", err)
        }
      )
    });

    reader.readAsDataURL(file);

  }


  filter(){
    const resutl = this.photos.filter( v => v.nombre == this.dataFilter );
    if(resutl.length == 0){
      alert("No se encontraron imagenes disponibles")
    }else{
      this.photos = resutl;
    }
  }

  deletePhoto(id: String){
    console.log(id)
    this._service.deletePhoto(id).subscribe(
      res => {
        console.log("Se elimino");
        this.photos = this.photos.filter(v => v.id != id);
      },
      err => {
        console.log("hubo un error", err)
      }
    )
  }
  
  updatePhoto(id: String, imageInput: any){
    console.log(id)
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    this.form2.nativeElement.reset();

    reader.addEventListener('load', (event: any) => {
      this.photo = new Photo(id, file.name , event.target.result, new Date, '999,999');

      this._service.putPhoto(id, this.photo).subscribe(
        res => {
          console.log("Exitoso", res);
          this.photo = new Photo("", "", "", "", '');
          this.getPhotos();
        },
        err => {
          console.log("hubo un error", err)
        }
      )
    });

    reader.readAsDataURL(file);

  }

  reset(){
    this.form.nativeElement.reset();
  }

}
