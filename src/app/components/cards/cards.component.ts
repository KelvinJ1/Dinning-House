import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { map} from 'rxjs/operators'
import { Menu } from 'src/app/models/Menu';
import {  Subject, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  private menuSub!:Subscription;
  menuUpdated = new Subject<Menu[]>();
  prodUpdated = new Subject<Menu>();
  menu:Menu[]=[];
 
  constructor(public menuService: MenuService,public router:Router ) { 
    this.showMenu();
  }

  ngOnInit(): void {
    this.showMenu();
  }


  showMenu(){

    this.menuService.getAllMenus().pipe(map((res)=>{
  
      console.log(res)
  return res.map((menu:{_id:string, titulo:string, price: string, description: string, URL:string})=>{
  console.log(menu)
  return {
    id:menu._id,
    titulo:menu.titulo,
    price:menu.price,
    description:menu.description,
    URL:menu.URL
  }
  })
    })).subscribe((dataT)=>{
      this.menu= dataT;
      this.menuUpdated.next([...this.menu]);
    })
    
  }
  
  
    getMenuUpdateListener(){
  
  return this.menuUpdated.asObservable();
  
    }
  

add(){

  Swal.fire({
    title: '¿Estás seguro?',
    text: "Añadiremos este producto",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, añadir producto',
    cancelButtonText: 'Cancelar'
  }).then((result) => {

    if (result.isConfirmed) {

      Swal.fire(
        'Agregado!',
        'Producto agregado exitosamente!',
        'success'
      )
     
    }
  })



}

}
