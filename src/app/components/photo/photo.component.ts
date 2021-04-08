import { Component, OnInit, ViewChild } from '@angular/core';
import { PhotoService } from '../../services/photo/photo.service'
import { Photo } from '../../models/photo/photoModel'



@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  public photos: Array<Photo>; // Arreglo de tipo Photo (donde: Photo es una clase de modelo)
  public conditional: Boolean;
  public photo: Photo;
  public dataFilter: string;

  public loading = false;

  @ViewChild('form') form; // nos permite referencias elemtos en nuestra plantilla HTML
  @ViewChild('form2') form2;

  constructor(
    private _service: PhotoService // "capa de servicio" --> consumer servicios o endpoints | API REST
    
  ) { 
    this.conditional = false;
    this.dataFilter = "";
   }

  ngOnInit(): void { // evento dentro del ciclo de vida de un componente primero en renderizar
    this.loading = true;
    this.getPhotos();
    this.loading = false;
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


  async processFile(imageInput: any){

    // Eleccion de event entrante para files
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    // registro de evento para elemento FileReader llamada 'load'    
    reader.addEventListener('load', async (event: any) => {
      this.photo = new Photo(Date.now().toString(), file.name , event.target.result, new Date, '999,999', 0);
      this.loading = true;
      this._service.postPhoto(this.photo).subscribe(
        res => {
          setTimeout( () => {
            this.loading = false;
          }, 3000)
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
      alert("No se encontraron imagenes disponibles");
    }else{
      this.photos = resutl;      
    }

  }

  clearFilter(){
    this.dataFilter = "";
    this.getPhotos();
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
      this.photo = new Photo(id, file.name , event.target.result, new Date, '999,999', 0);

      this._service.putPhoto(id, this.photo).subscribe(
        res => {
          console.log("Exitoso", res);
          this.photo = new Photo("", "", "", "", '', 0);
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

  sendLike(id){
    this._service.getOnePhoto(id).subscribe(
      res => {
        this.photo = new Photo(res.id, res.nombre, res.src, res.date, res.views, res.likes);
        this.photo.likes = this.photo.likes + 1;
        
        this._service.putPhoto(id, this.photo).subscribe(
          resp => {
            console.log(resp);
            this.getPhotos();
            if(this.photo.likes % 3 === 0) {
              alert("Wuao, esta foto esta genial")
            }
          },
          erro => {
            console.error(erro);
            
          }
        )
      },
      err => {
        console.error(err)
      }
    )
  }

}
