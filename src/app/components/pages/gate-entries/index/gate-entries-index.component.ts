import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpServices } from 'src/app/components/connections/services/http-services';

@Component({
  selector: 'app-gate-entries-index',
  templateUrl: './gate-entries-index.component.html',
  styleUrls: ['./gate-entries-index.component.scss']
})
export class GateEntriesIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'full_name', 'gender', 'status', 'contact', 'vehicle_number',
  'actions'];
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
    this.getGateEntries()
  }

  getGateEntries(per_page: number = this.perPage, current_page: number = this.currentPage) {
    let params = [
      { key: "page", value: current_page},
      { key: "per_page", value: per_page }
    ]
    this._http.get('gate_entries', params)
    .subscribe(
      (response: any) => {
        console.warn("response", response)
        this.dataSource = new MatTableDataSource<any>(response['gate_entries']);
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
    if(status == "approved"){
      return "btn-success"
    }
    if(status == "pending"){
      return "btn-warning"
    }
    if(status == "exit"){
      return "btn-secondary"
    }
    if(status == "canceled"){
      return "btn-danger"
    }
    return "btn-primary"
  }

  setUser(user:any){
    // sessionStorage.setItem('selected_user_id', user)
    // this.router.navigateByUrl('/user-form')
  }

  // Handle pagination
  changePage(event: PageEvent) {
    console.log('Check--->', event);
    this.getGateEntries(event.pageSize, event.pageIndex)
  }
}
