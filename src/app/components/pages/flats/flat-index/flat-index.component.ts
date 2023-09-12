import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { HttpServices } from 'src/app/components/connections/services/http-services';
import { MatExpansionPanel } from '@angular/material/expansion';
@Component({
  selector: 'app-flat-index',
  templateUrl: './flat-index.component.html',
  styleUrls: ['./flat-index.component.scss'],
  viewProviders: [MatExpansionPanel]
})

export class FlatIndexComponent implements OnInit {
  displayedColumns: string[] = ['id', 'number', 'structure', 'is_rented', 'owner', 'tenant', 'actions'];
  // flats: any;
  dataSource: any;
  public perPage = 5;
  public currentPage = 1;
  public totalCount = 0;
  public totalPages = 0;
  column = "created_at"
  order_by = "asc"

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router, private _http: HttpServices) { }

  ngOnInit(): void {
    sessionStorage.removeItem('selected_flat_id')
    this.getFlats()
  }

  getFlats(per_page: number = this.perPage, current_page: number = this.currentPage) {
    let params = [
      { key: "page", value: current_page},
      { key: "per_page", value: per_page },
      { key: "column", value: this.column },
      { key: "order_by", value: this.order_by }
    ]
    this._http.get('flats', params)
    .subscribe(
      (response: any) => {
        console.warn("response", response)
        this.order_by == "asc" ? this.order_by = "desc" : this.order_by = "asc"
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
    flat ? sessionStorage.setItem('selected_flat_id', flat) : sessionStorage.removeItem('selected_flat_id')
    this.router.navigateByUrl('/flat-form')
  }

  sortBy(column: string = this.column, order_by: string = this.order_by){
    this.column = column
    this.order_by = order_by
    this.getFlats(this.perPage, this.currentPage)
  }

  // Handle pagination
  changePage(event: PageEvent) {
    this.perPage = event.pageSize
    this.currentPage = event.pageIndex
    this.getFlats(event.pageSize, event.pageIndex)
  }
}
