import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/models/Auth';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  signup(userCreated: NgForm){
    this.authService.signup(userCreated.value).subscribe(
      (res) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario creado',
          showConfirmButton: false,
          timer: 1000
        })
        this.clean(userCreated)
      },
      (err) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'El usuario ya existe',
          showConfirmButton: false,
          timer: 1000
        })
        this.clean(userCreated)
      }
    )
  }

  clean(form?: NgForm){
    if(form) {
      form.reset()
      this.authService.selectedAuth = new Auth()
    }
  }

}
