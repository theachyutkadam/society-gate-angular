import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  IsloggedIn(){
    return !!sessionStorage.getItem('auth_token')
  }
}
