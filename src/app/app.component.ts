import { Component } from '@angular/core';
import { AuthService } from "../app/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'frontend';
  isAuth=false;

  constructor(private authservice: AuthService){
  }

  ngOnInit(){

    this.authservice.getAuthStatusListener().subscribe(resp=>{ 
      if (!this.authservice.getisAuthenticated()) { 
        
        return this.isAuth=resp
      }
      return this.isAuth=resp;
    });
  this.authservice.autoAuthUser();  
  
  }
  



}
