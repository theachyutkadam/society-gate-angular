import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  IsloggedIn(){
    return !!localStorage.getItem('auth_token')
  }
}
