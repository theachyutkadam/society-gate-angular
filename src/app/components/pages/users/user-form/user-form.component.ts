import { Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/connections/services/http-services';
import { FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { first } from 'rxjs';
import { Session } from 'inspector';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class UserFormComponent implements OnInit {
  checked = true;
  userInformationForm!: FormGroup
  is_handicap: boolean = false
  id = sessionStorage.getItem('userInformationId')
  user_information_id = sessionStorage.getItem("selected_user_id")

  constructor(
    private router: Router,
    private _http: HttpServices,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeUserInforationForm()
    this.getUserInformations()
  }

  initializeUserInforationForm(){
    this.userInformationForm = this.fb.group({
      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],
      contact: ['', Validators.required],
      adhaar_card_number: ['', Validators.required],
      pan_card_number: ['', Validators.required],
      handicap_details: [''],
      is_handicap: ['']
    })
  }

  getUserInformations() {
    const url = `user_informations/${this.user_information_id}`
    this._http.get(url)
      .subscribe((response: any) => {

        this.userInformationForm.patchValue({
          first_name: response['first_name'],
          middle_name: response['middle_name'],
          last_name: response['last_name'],
          contact: response['contact'],
          adhaar_card_number: response['adhaar_card_number'],
          pan_card_number: response['pan_card_number'],
          handicap_details: response['handicap_details'],
          is_handicap: response['is_handicap']
        })
        this.is_handicap = response['is_handicap']
      },
      err => {
        console.log(err);
      }
    )
  }

  onSave(event:any): void {
  }

  onBack(){
    sessionStorage.setItem('selected_user_id', "0")
    this.router.navigateByUrl('/users')
  }

  saveUserInformation(){
    console.log('Check--->start');
    const url = `user_informations/${this.user_information_id}`

    const userInformation = {
      "first_name": this.userInformationForm.value.first_name,
      "middle_name": this.userInformationForm.value.middle_name,
      "last_name": this.userInformationForm.value.last_name,
      "contact": this.userInformationForm.value.contact,
      "gender": "male",
      "birth_date": "June 12, 2011",
      "adhaar_card_number": this.userInformationForm.value.adhaar_card_number,
      "pan_card_number": this.userInformationForm.value.pan_card_number,
      "handicap_details": this.userInformationForm.value.handicap_details,
      "is_handicap": this.userInformationForm.value.is_handicap,
      "maritial_status": "devorsed",
      "user_id": this.user_information_id
    }

    this._http.put(url, userInformation).subscribe((response: any) => {
      console.warn("response", response)

      if(response.status == 200){
        this.updateSessionUserDetails(response['full_name'], this.user_information_id)

        console.log('200--->', response);
        // this.router.navigateByUrl('/users')
      }else{
        console.log(response.errors)
      }
    },err=>{
      console.log(err)
    })
  }

  updateSessionUserDetails(name: any, selected_user_id: any){
    if(sessionStorage.getItem('userId') == selected_user_id){
      sessionStorage.setItem('userDetails', name)
    }
  }
}
