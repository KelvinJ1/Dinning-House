export class Auth {
    //constructor
    constructor(_id = "", email = "", password = "", role = 0){
        //inicializa los valores del atributo
        this._id = _id;
        this.email = email;
        this.password = password;
        this.role = role;
        
    }

    //atributos -  definicion
    _id:string
    email:string
    password:string
    role:number
}