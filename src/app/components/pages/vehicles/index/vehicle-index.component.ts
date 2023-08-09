import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { HttpServices } from 'src/app/components/connections/services/http-services';
import { MatExpansionPanel } from '@angular/material/expansion';
@Component({
  selector: 'app-vehicle-index',
  templateUrl: './vehicle-index.component.html',
  styleUrls: ['./vehicle-index.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class VehicleIndexComponent implements OnInit {
  displayedColumns: string[] = ['id', 'vehicle', 'details', 'vehicle_type', 'flat', 'actions'];
  // vehicles: any;
  dataSource: any;
  public perPage = 10;
  public currentPage = 1;
  public totalCount = 0;
  public totalPages = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private router: Router, private _http: HttpServices) { }

  ngOnInit(): void {
    this.getVehicles()
  }

  getVehicles(per_page: number = this.perPage, current_page: number = this.currentPage) {
    let params = [
      { key: "page", value: current_page},
      { key: "per_page", value: per_page }
    ]
    this._http.get('vehicles', params)
    .subscribe(
      (response: any) => {
        console.warn("response", response)
        this.dataSource = new MatTableDataSource<any>(response['vehicles']);
        this.totalCount = response['meta']['total_count']
        this.totalPages = response['meta']['total_pages']
      },
      err => {
        console.log(err);
      }
    )
  }

  setVehicle(vehicle:any){
    vehicle ? sessionStorage.setItem('selected_vehicle_id', vehicle) : sessionStorage.setItem('selected_vehicle_id', '')
    // this.router.navigateByUrl('/vehicle-form')
  }

  // Handle pagination
  changePage(event: PageEvent) {
    this.getVehicles(event.pageSize, event.pageIndex)
  }
}
