import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/components/connections/services/http-services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})

export class UserIndexComponent implements OnInit {
  displayedColumns: string[] = ['id', 'full_name', 'user_details', 'status', 'avatar', 'maritial_status', 'user_type', 'actions'];
  dataSource: any;

  public perPage = 5;
  public currentPage = 0;
  public totalCount = 0;
  public totalPages = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private router: Router,
    private _http: HttpServices,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserInformations()
  }

  getUserInformations(per_page: number = this.perPage, current_page: number = this.currentPage) {
    let params = [
      { key: "page", value: current_page},
      { key: "per_page", value: per_page }
    ]
    this._http.get('user_informations', params)
    .subscribe(
      (response: any) => {
        console.warn("response", response)
        this.dataSource = new MatTableDataSource<any>(response['user_informations']);
        this.totalCount = response['meta']['total_count']
        this.totalPages = response['meta']['total_pages']
      },
      err => {
        console.log(err);
        this.toastr.error(err, 'Error');
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

  editUser(user_id:any){
    this.router.navigateByUrl(`/user-form/${user_id}`)
  }

  deleteUser(user_id: any) {
    this._http.delete(`user_informations/${user_id}`)
    .subscribe(
      (response: any) => {
        this.toastr.success('User deleted successfully');
        this.getUserInformations()
      },
      err => {
        console.log(err);
        this.toastr.error(err, 'Error');
      }
    )
  }

  // Handle pagination
  changePage(event: PageEvent) {
    this.getUserInformations(event.pageSize, event.pageIndex)
  }
}
