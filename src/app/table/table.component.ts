import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';
import { CRUDComponent } from 'src/app/components/crud/crud.component';
import { Subscription } from 'rxjs';
import { Auth } from 'src/app/models/Auth';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {catchError, map} from 'rxjs/operators'
import { Menu } from 'src/app/models/Menu';
import {  Subject, throwError } from 'rxjs';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  show:boolean=false;
  private menuSub!:Subscription;
  menuUpdated = new Subject<Menu[]>();
  prodUpdated = new Subject<Menu>();
  menu:Menu[]=[];
  close=true;
  infoToEdit!:Menu;


  constructor(public menuService: MenuService,public router:Router ) {


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

    delete(id:string){

      this.menuService.delete(id)
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Eliminaremos este producto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
    
        if (result.isConfirmed) {
    
          Swal.fire(
            'Perfecto!',
            'Producto eliminado exitosamente!',
            'success'
          )
         
        }
      })
    

    }

    edit(id: string,titulo: string,description:string,URL: string,price:string){
      this.infoToEdit = new Menu(id,titulo,price,description,URL);
      console.log(this.infoToEdit)
    }

    newInformation(form: NgForm){
      this.menuService.edit(this.infoToEdit.id,form.value.titulo,form.value.description,form.value.URL,form.value.price);
    }


modal(id: string,titulo: string,description:string,URL: string,price:string){
this.edit(id,titulo,description,URL,price)
return this.show=true;
}

closeModal(){
 return this.show=false
  }

  enviar(){
  Swal.fire(
    'Perfecto!',
    'Producto editado exitosamente!',
    'success'
  )
}


}