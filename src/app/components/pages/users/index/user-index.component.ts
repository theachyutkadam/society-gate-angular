import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/components/connections/services/http-services';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})

export class UserIndexComponent implements OnInit {
  displayedColumns: string[] = ['id', 'user_details', 'status', 'user_type'];
  // users: any;
  dataSource: any;

  public perPage = 10;
  public currentPage = 1;
  public totalCount = 0;
  public totalPages = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router, private _http: HttpServices) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(per_page: number = 10, current_page: number = 0) {
    // if(current_page == 0){
    //   current_page = 1
    // }
    let params = [
      { key: "page", value: current_page},
      { key: "per_page", value: per_page }
    ]
    this._http.get('users', params)
    .subscribe(
      (response: any) => {
        console.warn("response", response)

        this.dataSource = new MatTableDataSource<any>(response['users']);
        this.totalCount = response['total_count']
        this.totalPages = response['total_pages']
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
    sessionStorage.setItem('selected_user_id', user)
    this.router.navigateByUrl('/user-form')
  }

  // Handle pagination
  changePage(event: PageEvent) {
    console.log('Check--->', event);
    this.getUsers(event.pageSize, event.pageIndex)
  }
}
