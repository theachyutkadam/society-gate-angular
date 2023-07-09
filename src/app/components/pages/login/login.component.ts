import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/connections/services/http-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(
    private formbuilder: FormBuilder,
    private _http: HttpServices,
    private router: Router
  ){ }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: [''],
      password: ['', Validators.required]
    })
  }

  login(){
    const params = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password
    }

    this._http.post('users/login', params).subscribe((response: any) => {
      console.warn("response", response)

      if(response.status == 200){
        alert('Login Succesful');
        sessionStorage.setItem('user_id', response.user_id)
        sessionStorage.setItem('auth_token', response.auth_token)
        sessionStorage.setItem('user_information_id', response.user_information_id)
        this.loginForm.reset()
        this.router.navigate(["home"])
      }else{
        alert(response.errors)
      }
    },err=>{
      alert(err)
    })
  }
}