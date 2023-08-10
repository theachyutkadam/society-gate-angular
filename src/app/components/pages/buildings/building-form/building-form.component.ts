import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatExpansionPanel } from '@angular/material/expansion';
import { HttpServices } from 'src/app/components/connections/services/http-services';
import { ToastrService } from 'ngx-toastr';
import { CommonTaskService } from 'src/app/components/connections/common/common-task.service';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.scss'],
  viewProviders: [MatExpansionPanel],
})
export class BuildingFormComponent implements OnInit {

  buildingForm!: FormGroup
  id = sessionStorage.getItem('buildingId')
  building_id = sessionStorage.getItem("selected_building_id")
  building: any;
  societies: any;
  status: any
  formName: String = "new"
  buildingObject: any

  constructor(
    private router: Router,
    private _http: HttpServices,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private common: CommonTaskService
  ) { }

  ngOnInit(): void {
    this.initializeBuildingForm()
    this.getBuilding()
    this.formName == 'new' ? this.getSocieties() : ''
  }

  initializeBuildingForm(){
    this.buildingForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required],
      society_id: [''],
    })
  }

  getSocieties(){
    this._http.get('societies')
      .subscribe((response: any) => {
        this.societies = response['societies']
      },
      err => {
        console.log(err);
      }
    )
  }

  getBuilding() {
    let url = `buildings/${this.building_id}`
    this._http.get(url)
      .subscribe((response: any) => {
        this.building = response['building']
        this.status = this.building['status']
        this.formName = "edit"
        this.buildingForm.patchValue({
          name: this.building['name'],
          location: this.building['location'],
          society_id: this.building['society']['id'],
        })
      },
      err => {
        console.log(err);
      }
    )
  }

  onBack(){
    sessionStorage.setItem('selected_building_id', "0")
    this.router.navigateByUrl('/buildings')
  }

  makeBuildingObject(){
    this.buildingObject = {
      "name": this.buildingForm.value.name,
      "location": this.buildingForm.value.location,
      "status": this.buildingForm.value.status,
      "society_id": this.building ? this.building['society']['id'] : this.buildingForm.value.society_id
    }
  }

  updateBuilding(){
    this._http.put(`buildings/${this.building_id}`, this.buildingObject).subscribe((response: any) => {
      if(response['meta']['status'] == 200){
        this.toastr.success("Building updated successfully", 'Success');
        this.router.navigateByUrl('/buildings')
      }else{
        console.log("call success", response.errors)
        this.toastr.error(response, 'Error');
      }
    },err=>{
      this.toastr.error("Something went wrong!", 'Error');
      console.log("No call", err.error)
      this.common.returnToastrMessages(err.error)
    })
  }

  createBuilding(){
    this._http.post('buildings', this.buildingObject).subscribe((response: any) => {
      if(response['meta']['status'] == 200){
        this.router.navigateByUrl('/buildings')
      }else{
        console.log(response.errors)
      }
    },err=>{
      console.log(err)
    })
  }
}
