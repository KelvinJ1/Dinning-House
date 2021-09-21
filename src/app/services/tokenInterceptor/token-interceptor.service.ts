import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public authService: AuthService) { }

  intercept(req:any, next:any) {
    let addToken = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    })

    return next.handle(addToken)
  }
}
