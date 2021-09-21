import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/Auth';
import {  Subject, throwError } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  selectedAuth: Auth
  auth:Auth[] = []
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  readonly URL_API = "http://localhost:5000"

  constructor(private http: HttpClient, private router: Router) {
    this.selectedAuth = new Auth()
  }
  

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
    }

  getisAuthenticated(){
    return this.isAuthenticated;
    
    }


  //Signup
  signup(userCreated:Auth){
    console.log(`${this.URL_API}/auth/signup`)
    return this.http.post(`${this.URL_API}/auth/signup`, userCreated)
  }

  signin(userLogged:Auth){
    console.log(`${this.URL_API}/auth/signin`)
    this.authStatusListener.next(true)
    return this.http.post<any>(`${this.URL_API}/auth/signin`, userLogged)
  }

  loggedIn(){
    //return !!localStorage.getItem('token')
    if(localStorage.getItem('token')){
      return localStorage.getItem('token'), localStorage.getItem('role')
    } else {
      return false
    }
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.isAuthenticated=false
    this.authStatusListener.next(false)
    this.router.navigate(['/signin'])
  }

  getToken(){
    return localStorage.getItem('token')
  }

  autoAuthUser(){

    const authInfo=this.getToken()
    if (!authInfo){
      return;
    }
    this.isAuthenticated=true
    this.authStatusListener.next(true)
    this.router.navigate(["/home"])

  }




}
