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
  selector: 'app-flat-form',
  templateUrl: './flat-form.component.html',
  styleUrls: ['./flat-form.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class FlatFormComponent implements OnInit {

  flatForm!: FormGroup
  flat_id = sessionStorage.getItem("selected_flat_id")
  formName = "new"

  flat: any;
  structure: any;
  tenantList: any;
  currentTenant: any;
  flatObject: any;
  is_rented: boolean = false;
  showTenantList: boolean = true;

  constructor(
    private router: Router,
    private _http: HttpServices,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private common: CommonTaskService
  ) { }

  ngOnInit(): void {
    this.initializeFlatForm()
    if (this.flat_id){
      this.getFlat()
      this.formName = "edit"
    }else{
      this.formName = "new"
    }

  }

  initializeFlatForm(){
    this.flatForm = this.fb.group({
			electricity_meter_number: ['', Validators.required],
			gas_meter_number: ['', Validators.required],
			letter_box_number: ['', Validators.required],
			number: ['', Validators.required],
			area_in_feet: ['', Validators.required],
			is_rented: ['', Validators.required],
			structure: ['', Validators.required],
			floor_id: ['', Validators.required],
			owner_id: ['', Validators.required],
			tenant_id: ['', Validators.required],
    })
    // if (this.showHandicapBox){
    //   this.flatForm.controls['handicap_details'].setErrors([Validators.required])
    // }
  }


  getFlat() {
    let url = `flats/${this.flat_id}`
    this._http.get(url)
      .subscribe((response: any) => {
        this.flat = response['flat']
        this.is_rented = this.flat['is_rented']
        this.is_rented ? this.currentTenant = this.flat['tenant']['user_information']['user']['id'] : this.currentTenant = ''
        this.getTenantList()
        this.structure = this.flat['structure']
        this.flatForm.patchValue({
          area_in_feet: this.flat['area_in_feet'],
          electricity_meter_number: this.flat['electricity_meter_number'],
          gas_meter_number: this.flat['gas_meter_number'],
          is_rented: this.is_rented,
          letter_box_number: this.flat['letter_box_number'],
          number: this.flat['number'],
          structure: this.structure,
          floor_id: this.flat['floor']['id'],
          owner_id: this.flat['owner']['id'],
          tenant_id: this.currentTenant
        })
      },
      err => {
        this.common.returnToastrMessages(err.error)
      }
    )
  }

  onBack(){
    sessionStorage.removeItem('selected_flat_id')
    this.router.navigateByUrl('/flats')
  }

  makeFlatObject(){
    this.flatObject = {
      "electricity_meter_number": this.flatForm.value.electricity_meter_number,
      "gas_meter_number": this.flatForm.value.gas_meter_number,
      "letter_box_number": this.flatForm.value.letter_box_number,
      "number": this.flatForm.value.number,
      "area_in_feet": this.flatForm.value.area_in_feet,
      "is_rented": this.is_rented,
      "structure": this.flatForm.value.structure,
      "floor_id": this.flatForm.value.floor_id,
      "owner_id": this.flatForm.value.owner_id,
      "tenant_id": this.flatForm.value.tenant_id,
    }
  }

  updateFlat(){
    this.makeFlatObject()
    this._http.put(`flats/${this.flat_id}`, this.flatObject).subscribe((response: any) => {
      if(response['meta']['status'] == 200){
        this.toastr.success("Flat updated successfully", 'Success');
        this.router.navigateByUrl('/flats')
      }else{
        this.common.returnToastrMessages(response.errors)
        console.log(response.errors)
      }
    },err=>{
      console.log(err)
      this.common.returnToastrMessages(err.error)
    })
  }

  createFlat(){
    this.makeFlatObject()
    this._http.post('flats', this.flatObject).subscribe((response: any) => {
      if(response['meta']['status'] == 200){
        this.toastr.success("Flat created successfully", 'Success');
        this.router.navigateByUrl('/flats')
      }else{
        this.common.returnToastrMessages(response.errors)
      }
    },err=>{
      this.common.returnToastrMessages(err.error)
    })
  }

  toggleIsRented(){
    if (this.is_rented){
      console.log('true');
      this.is_rented = false
      this.tenantList = ''
    } else {
      console.log('false');
      this.is_rented = true
      this.getTenantList()
    }
  }

  getTenantList(){
    if (this.is_rented) {
      this._http.get('users')
      .subscribe(
        (response: any) => {
          this.tenantList = response['users']
        },
        err => {
          console.log(err);
        }
      )
    }
  }

}
