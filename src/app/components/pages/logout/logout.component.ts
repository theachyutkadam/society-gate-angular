import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/components/connections/services/http-services';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
  	private router: Router,
    private _http: HttpServices,

  ) { }

  ngOnInit(): void {
  	this.logoutFromBackend()
  }

  logoutFromBackend(){
    this._http.get('users/logout').subscribe((response: any) => {
      if(response.status == 200){
      	sessionStorage.clear()
      	console.log('Check---Loguot sesscesffuly>');
      	this.router.navigate(['/login'])
      }
    },err=>{
      console.log(err)
    })
  }

}
