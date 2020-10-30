export class Photo{
    public id: String;
    public nombre: String;
    public src: String;
    public date: String;
    public views: String;

    constructor(
        id, nombre, src, date, views
    ){
        this.id = id;
        this.nombre = nombre;
        this.src = src;
        this.date = date;
        this.views = views
    }
}