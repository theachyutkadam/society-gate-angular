import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/connections/services/http-services';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})

// enum status: { active: 0, pending: 1, blocked: 2, deleted: 3 }, _default: "active"
// enum user_type: { admin: 0, owner: 1, tenant: 2 }, _default: "owner"

export class UserIndexComponent implements OnInit {
  displayedColumns: string[] = ['id', 'user_details', 'status', 'user_type'];
  users: any;
  dataSource: any;

  constructor(private router: Router, private _http: HttpServices) { }

  ngOnInit(): void {
    this.getUserInformations()
  }

  getUserInformations() {
    this._http.get('users')
    .subscribe(
      (response: any) => {
        console.warn("##############")
        console.warn("response", response)
        console.warn("##############")
        this.dataSource = new MatTableDataSource<any>(response);
      },
      err => {
        console.log(err);
      }
    )
  }

  checkStatus(status: any){
    if(status == "active"){
      return "btn-success"
    }
    if(status == "pending"){
      return "btn-warning"
    }
    if(status == "blocked"){
      return "btn-secondary"
    }
    if(status == "deleted"){
      return "btn-danger"
    }
    return "btn-primary"
  }

  setUser(user:any){
    console.log('Check--->', user);
    sessionStorage.setItem('user_id', user)
    this.router.navigateByUrl('/user-form')
  }
}
