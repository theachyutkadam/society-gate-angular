import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonTaskService } from '../../connections/common/common-task.service';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
    private common: CommonTaskService
  ) { }

  ngOnInit(): void {
  	this.logoutFromBackend()
  }

  logoutFromBackend(){
    this._http.get('users/logout').subscribe((response: any) => {
      this.resetAuthentication()
    },err=>{
      console.log(err)
      this.resetAuthentication()
    })
  }

  resetAuthentication() {
    sessionStorage.clear()
    this.toastr.success("Successfully Logout", 'Success');
    this.router.navigate(['/login'])
  }

}
