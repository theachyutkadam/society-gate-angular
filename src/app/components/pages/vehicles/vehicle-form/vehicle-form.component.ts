import { Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/components/connections/services/http-services';
import { FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { first } from 'rxjs';
import { Session } from 'inspector';
import { CommonTaskService } from 'src/app/components/connections/common/common-task.service';
import { ToastrService } from 'ngx-toastr';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class VehicleFormComponent implements OnInit {

  vehicleForm!: FormGroup
  vehicle_id = sessionStorage.getItem("selected_vehicle_id")
  formName = "new"

  vehicle: any;
  status: any;
  vehicle_type: any;
  color = "black";
  flatList: any;
  currentFlat: any;
  vehicleObject: any;

  constructor(
    private router: Router,
    private _http: HttpServices,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private common: CommonTaskService
  ) { }

  ngOnInit(): void {
    this.initializeVehicleForm()
    if (this.vehicle_id){
      this.getVehicle()
      this.formName = "edit"
    }else{
      this.formName = "new"
    }
  }

  initializeVehicleForm(){
    this.vehicleForm = this.fb.group({
			color: ['', Validators.required],
			company: ['', Validators.required],
			flat_id: ['', Validators.required],
			name: ['', Validators.required],
			number: ['', Validators.required],
			status: ['', Validators.required],
			user_id: ['', Validators.required],
			vehicle_type: ['', Validators.required],
    })
  }


  getVehicle() {
    let url = `vehicles/${this.vehicle_id}`
    this._http.get(url)
      .subscribe((response: any) => {
        console.log('Check- Vehicle-->', response);
        this.vehicle = response['vehicle']
        this.currentFlat = this.vehicle['flat']['id']
        this.status = this.vehicle['status']
        this.color = this.vehicle['color']
        this.vehicle_type = this.vehicle['vehicle_type']
        // this.getTenantList()
        this.vehicleForm.patchValue({
          color: this.color,
          company: this.vehicle['company'],
          flat_id: this.currentFlat,
          name: this.vehicle['name'],
          number: this.vehicle['number'],
          status: this.status,
          user_id: this.vehicle['user']['id'],
          vehicle_type: this.vehicle_type,
        })
      },
      err => {
        this.common.returnToastrMessages(err.error)
      }
    )
  }

  onBack(){
    sessionStorage.removeItem('selected_vehicle_id')
    this.router.navigateByUrl('/vehicles')
  }

  makeVehicleObject(){
    this.vehicleObject = {
      "color": this.vehicleForm.value.color,
      "company": this.vehicleForm.value.company,
      "flat_id": this.currentFlat,
      "name": this.vehicleForm.value.name,
      "number": this.vehicleForm.value.number,
      "status": this.status,
      "user_id": this.vehicleForm.value.user_id,
      "vehicle_type": this.vehicle_type,
    }
  }

  updateVehicle(){
    this.makeVehicleObject()
    this._http.put(`vehicles/${this.vehicle_id}`, this.vehicleObject).subscribe((response: any) => {
      if(response['meta']['status'] == 200){
        this.toastr.success("Vehicle updated successfully", 'Success');
        this.router.navigateByUrl('/vehicles')
      }else{
        this.common.returnToastrMessages(response.errors)
        console.log(response.errors)
      }
    },err=>{
      console.log(err)
      this.common.returnToastrMessages(err.error)
    })
  }

  createVehicle(){
    this.makeVehicleObject()
    this._http.post('vehicles', this.vehicleObject).subscribe((response: any) => {
      if(response['meta']['status'] == 200){
        this.toastr.success("Vehicle created successfully", 'Success');
        this.router.navigateByUrl('/vehicles')
      }else{
        this.common.returnToastrMessages(response.errors)
      }
    },err=>{
      this.common.returnToastrMessages(err.error)
    })
  }

  // toggleIsRented(event: any){
  //   console.log('Check--->', event.target.value);
  //   if (this.is_rented){
  //     console.log('true');
  //     this.is_rented = false
  //     this.flatList = ''
  //   } else {
  //     console.log('false');
  //     this.is_rented = true
  //     this.getTenantList()
  //   }
  // }

  // getTenantList(){
  //   if (this.is_rented) {
  //     this._http.get('users')
  //     .subscribe(
  //       (response: any) => {
  //         this.flatList = response['users']
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     )
  //   }
  // }

}

