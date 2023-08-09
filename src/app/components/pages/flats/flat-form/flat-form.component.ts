import { Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/components/connections/services/http-services';
import { FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { first } from 'rxjs';
import { Session } from 'inspector';

@Component({
  selector: 'app-flat-form',
  templateUrl: './flat-form.component.html',
  styleUrls: ['./flat-form.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class FlatFormComponent implements OnInit {
  flatForm!: FormGroup
  flat_id = sessionStorage.getItem("selected_flat_id")

  flat: any;
  structure: any;
  tenantList: any;
  is_rented: boolean = false;
  showTenantList: boolean = true;

  constructor(
    private router: Router,
    private _http: HttpServices,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeFlatForm()
    this.getFlat()
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
          tenant_id: this.is_rented? this.flat['tenant']['id'] : ''
        })
      },
      err => {
        console.log(err);
      }
    )
  }

  onBack(){
    sessionStorage.setItem('selected_flat_id', "0")
    this.router.navigateByUrl('/flats')
  }

  saveFlat(){
    let url = `flats/${this.flat_id}`
    const flat = {
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

    this._http.put(url, flat).subscribe((response: any) => {
      console.warn("response", response)
      if(response['meta']['status'] == 200){
        this.router.navigateByUrl('/flats')
      }else{
        console.log(response.errors)
      }
    },err=>{
      console.log(err)
    })
  }

  getTenantList(event: any){
    event.target.value ? this.showTenantList = true : this.showTenantList = false

    this._http.get('users')
    .subscribe(
      (response: any) => {
        console.log("check users list", response)
        this.tenantList = response['users']
      },
      err => {
        console.log(err);
      }
    )
  }

}
