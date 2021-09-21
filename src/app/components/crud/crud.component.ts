import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/models/Auth';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {catchError, map} from 'rxjs/operators'
import { Menu } from 'src/app/models/Menu';
import {  Subject, throwError } from 'rxjs';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {

  menuUpdated = new Subject<Menu[]>();
  prodUpdated = new Subject<Menu>();
  showTable:boolean=false
  menu:Menu[]=[];

  constructor(public menuService: MenuService,public router:Router) { }

  ngOnInit(): void {
  }

invalid(){

  Swal.fire(
    'Error',
    'Formulario inválido.',
    'error'
  )
}

adding(agregar: NgForm){

if (agregar.invalid) {
  return this.invalid();
  
}
  this.menuService.add(agregar.value).subscribe( 
    (res) => {
      Swal.fire(
        'Perfecto.',
        '¡Producto agregado exitosamente!',
        'success'
      )
  
    this.router.navigateByUrl('/home', {skipLocationChange: true})
    .then(()=> this.router.navigate(["/crud"]))
  },
  (err) => {
    Swal.fire(
      'Error',
      'No se pudo agregar el producto. Comunicate con soporte.',
      'error'
    );
  }
)

}


show(){

  this.showTable=true;
}

  
  }




