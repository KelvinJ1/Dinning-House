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

  private menuSub!:Subscription;
  menuUpdated = new Subject<Menu[]>();
  prodUpdated = new Subject<Menu>();
  menu:Menu[]=[];
 


  constructor(public menuService: MenuService,public router:Router ) {

  
  }

  ngOnInit(): void {
    this.showMenu();
  
  }


  showMenu(){

    this.menuService.getAllMenus().pipe(map((res)=>{
  
      console.log(res)
  return res.map((menu:{_id:string, title:string, price: string, description: string, URL:string})=>{
  console.log(menu)
  return {
    id:menu._id,
    title:menu.title,
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
  


    // showMenu(){

    //   this.menuService.getAllMenus().pipe(map((res)=>{
    
    //     console.log(res)
    // return res.map((menu:{_id:string, title:string, price: string, description: string, URL:string})=>{
    
    // return {
    //   id:menu._id,
    //   title:menu.title,
    //   price:menu.price,
    //   description:menu.description,
    //   URL:menu.URL
    // }
    // })
    //   })).subscribe((dataT)=>{
    //     this.menu= dataT;
    //     this.menuUpdated.next([...this.menu]);
    //   })
      
    // }

}
