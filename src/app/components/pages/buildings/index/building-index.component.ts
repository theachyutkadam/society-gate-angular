import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/components/connections/services/http-services';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-building-index',
  templateUrl: './building-index.component.html',
  styleUrls: ['./building-index.component.scss'],
  viewProviders: [MatExpansionPanel],

})

export class BuildingIndexComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'status', 'location', 'actions'];
  dataSource: any;

  public perPage = 10;
  public currentPage = 1;
  public totalCount = 0;
  public totalPages = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router, private _http: HttpServices) { }

  ngOnInit(): void {
    this.getBuildings()
  }

  getBuildings(per_page: number = this.perPage, current_page: number = this.currentPage) {
    let params = [
      { key: "page", value: current_page},
      { key: "per_page", value: per_page }
    ]
    this._http.get('buildings', params)
    .subscribe(
      (response: any) => {
        console.warn("response", response)

        this.dataSource = new MatTableDataSource<any>(response['buildings']);
        this.totalCount = response['meta']['total_count']
        this.totalPages = response['meta']['total_pages']
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

  setBuilding(building:any){
    building ? sessionStorage.setItem('selected_building_id', building) : sessionStorage.setItem('selected_building_id', '')
    this.router.navigateByUrl('/building-form')
  }

  // Handle pagination
  changePage(event: PageEvent) {
    console.log('Check--->', event);
    this.getBuildings(event.pageSize, event.pageIndex)
  }

}
