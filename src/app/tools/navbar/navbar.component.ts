import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/models/Auth';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth:boolean=false;
  role:Number=0;
  private authListenerSub!: Subscription;
  constructor(public authService: AuthService, private router: Router) { 

    this.isAuth=this.authService.getisAuthenticated();
    this.role= Number(localStorage.getItem("role"));
    this.router.navigate(['/home'])
    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe((isAuthenticated)=>{
      this.isAuth = isAuthenticated;
    
    }); 

  }

  ngOnInit(): void {
    this.isAuth=this.authService.getisAuthenticated();
    this.role= Number(localStorage.getItem("role"));
    this.router.navigate(['/home'])
    this.authListenerSub = this.authService.getAuthStatusListener()
    .subscribe((isAuthenticated)=>{
      this.isAuth = isAuthenticated;
    
    }); 
  }

  


}
