import { Injectable } from '@angular/core';
//cliente de http
import { HttpClient } from '@angular/common/http';
//modelo de datos
import { Menu } from 'src/app/models/Menu';
import {catchError, map} from 'rxjs/operators'
import {  Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuUpdated = new Subject<Menu[]>();
  prodUpdated = new Subject<Menu>();
  menu:Menu[]=[];
  selectedMenu: Menu
  users: Menu[] = [];
  readonly URL_API = "http://localhost:5000"

  constructor(private http: HttpClient) { 
    this.selectedMenu = new Menu
  }

  add(agregar:Menu){
    console.log(`${this.URL_API}/menu/create`)
    return this.http.post<any>(`${this.URL_API}/menu/create`, agregar)
  }


  getAllMenus(){
    console.log(`${this.URL_API}/menu/showAll`)
    return this.http.get<any>(`${this.URL_API}/menu/showAll`)}
 
  

     

}
