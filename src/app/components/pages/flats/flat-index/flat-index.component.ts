import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { HttpServices } from 'src/app/components/connections/services/http-services';

@Component({
  selector: 'app-flat-index',
  templateUrl: './flat-index.component.html',
  styleUrls: ['./flat-index.component.scss']
})

export class FlatIndexComponent implements OnInit {
  displayedColumns: string[] = ['id', 'number', 'structure', 'is_rented', 'owner', 'tenant', 'actions'];
  // flats: any;
  dataSource: any;
  public perPage = 5;
  public currentPage = 1;
  public totalCount = 0;
  public totalPages = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router, private _http: HttpServices) { }

  ngOnInit(): void {
    this.getFlats()
  }

  getFlats(per_page: number = this.perPage, current_page: number = this.currentPage) {
    let params = [
      { key: "page", value: current_page},
      { key: "per_page", value: per_page }
    ]
    this._http.get('flats', params)
    .subscribe(
      (response: any) => {
        console.warn("response", response)
        // this.dataSource = new MatTableDataSource<any>(response);
        this.dataSource = new MatTableDataSource<any>(response['flats']);
        this.totalCount = response['meta']['total_count']
        this.totalPages = response['meta']['total_pages']
      },
      err => {
        console.log(err);
      }
    )
  }

  isRented(status: boolean){
    if(status == true){
      return "btn-success"
    } else {
      return "btn-danger"
    }
  }

  setFlat(flat:any){
    sessionStorage.setItem('selected_flat_id', flat)
    this.router.navigateByUrl('/flat-form')
  }

  // Handle pagination
  changePage(event: PageEvent) {
    console.log('Check--->', event);
    this.getFlats(event.pageSize, event.pageIndex)
  }
}
