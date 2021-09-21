export class Menu {
    //constructor
    constructor(_id = "", titulo = "", price = "", description = "", URL = ""){
        //inicializa los valores del atributo
        this.id = _id;
        this.titulo = titulo;
        this.price = price;
        this.description = description;
        this.URL = URL;
    }

    //atributos -  definicion
    id:string
    titulo:string
    price:string
    description:string
    URL:string



    
}