export class Photo{
    public id: String;
    public nombre: String;
    public src: String;
    public date: String;
    public views: String;
    public likes: number;

    constructor(
        id, nombre, src, date, views, likes
    ){
        this.id = id;
        this.nombre = nombre;
        this.src = src;
        this.date = date;
        this.views = views;
        this.likes = likes
    }
}