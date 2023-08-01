import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatExpansionPanel } from '@angular/material/expansion';
import { HttpServices } from 'src/app/components/connections/services/http-services';

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

  constructor(
    private router: Router,
    private _http: HttpServices,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeBuildingForm()
    this.getBuildings()
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

  getBuildings() {
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

  saveBuilding(){
    let url = `buildings/${this.building_id}`
    const building = {
      "name": this.buildingForm.value.name,
      "location": this.buildingForm.value.location,
      "status": this.buildingForm.value.status,
      "society_id": this.building ? this.building['society_id'] : this.buildingForm.value.society_id
    }

    this._http.put(url, building).subscribe((response: any) => {
      console.warn("response", response)
      if(response.status == 200){
        this.router.navigateByUrl('/buildings')
      }else{
        console.log(response.errors)
      }
    },err=>{
      console.log(err)
    })
  }
}
