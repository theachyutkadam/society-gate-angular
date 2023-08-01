import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/components/connections/services/http-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  activeUsers: any
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

    this.collectUsers()
  }

  collectUsers(){
    this._http.health().subscribe((response: any) => {
      console.log("response", response)
      this.activeUsers = response['active_users']
    },err=>{
      console.log(err)
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
        sessionStorage.setItem('userDetails', response.user_details['full_name'])
        sessionStorage.setItem('userId', response.user_details['user_id'])
        sessionStorage.setItem('authToken', response.auth_token)
        sessionStorage.setItem('userInformationId', response.user_information_id)
        this.loginForm.reset()
        this.router.navigateByUrl('/home')
      }else{
        console.log(response.errors)
      }
    },err=>{
      console.log(err)
    })
  }
}
