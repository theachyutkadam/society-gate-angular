import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/components/connections/services/http-services';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Columns } from 'angular-feather/icons';

@Component({
  selector: 'app-building-index',
  templateUrl: './building-index.component.html',
  styleUrls: ['./building-index.component.scss'],
  viewProviders: [MatExpansionPanel],

})

export class BuildingIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'status', 'location', 'actions'];
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
    this.getBuildings()
  }

  getBuildings(per_page: number = this.perPage, current_page: number = this.currentPage) {
    let params = [
      { key: "page", value: current_page},
      { key: "per_page", value: per_page },
      { key: "column", value: this.column },
      { key: "order_by", value: this.order_by }
    ]
    this._http.get('buildings', params)
    .subscribe(
      (response: any) => {
        console.log("response", response)
        this.order_by == "asc" ? this.order_by = "desc" : this.order_by = "asc"
        this.dataSource = new MatTableDataSource<any>(response['buildings']);
        this.totalCount = response['meta']['total_count']
        this.totalPages = response['meta']['total_pages']
      },
      err => {
        console.error(err);
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

  setBuilding(building:any){
    building ? sessionStorage.setItem('selected_building_id', building) : sessionStorage.removeItem('selected_building_id')
    this.router.navigateByUrl('/building-form')
  }

  sortBy(column: string = this.column, order_by: string = this.order_by){
    this.column = column
    this.order_by = order_by
    this.getBuildings(this.perPage, this.currentPage)
  }

  // Handle pagination
  changePage(event: PageEvent) {
    this.perPage = event.pageSize
    this.currentPage = event.pageIndex
    this.getBuildings(event.pageSize, event.pageIndex)
  }

}
