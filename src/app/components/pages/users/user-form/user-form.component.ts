import { Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/components/connections/services/http-services';
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
  id = sessionStorage.getItem('userInformationId')
  user_information_id = sessionStorage.getItem("selected_user_id")
  userInformation: any;
  userAvatar: any;
  showHandicapBox: boolean = false
  gender: any
  maritial_status: any

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
      birth_date: ['', Validators.required],
      gender: ['', Validators.required],
      maritial_status: ['', Validators.required],
      adhaar_card_number: ['', Validators.required],
      pan_card_number: ['', Validators.required],
      handicap_details: [''],
      is_handicap: [''],
      avatar_url: [''],
    })
    if (this.showHandicapBox){
      this.userInformationForm.controls['handicap_details'].setErrors([Validators.required])
    }
  }

  getUserInformations() {
    let url = `user_informations/${this.user_information_id}`
    this._http.get(url)
      .subscribe((response: any) => {

        this.userInformation = response['user_information']
        this.userInformation['is_handicap']? this.showHandicapBox = true : this.showHandicapBox = false
        this.gender = this.userInformation['gender']
        this.maritial_status = this.userInformation['maritial_status']
        this.userInformationForm.patchValue({
          first_name: this.userInformation['first_name'],
          middle_name: this.userInformation['middle_name'],
          last_name: this.userInformation['last_name'],
          contact: this.userInformation['contact'],
          birth_date: new Date(this.userInformation['birth_date']),
          adhaar_card_number: this.userInformation['adhaar_card_number'],
          pan_card_number: this.userInformation['pan_card_number'],
          handicap_details: this.userInformation['handicap_details'],
          is_handicap: this.userInformation['is_handicap'],
          avatar_url: this.userInformation['avatar_url']
        })
      },
      err => {
        console.log(err);
      }
    )
  }

  onBack(){
    sessionStorage.setItem('selected_user_id', "0")
    this.router.navigateByUrl('/users')
  }

  saveUserInformation(){
    let url = `user_informations/${this.user_information_id}`
    const userInformation = {
      "first_name": this.userInformationForm.value.first_name,
      "middle_name": this.userInformationForm.value.middle_name,
      "last_name": this.userInformationForm.value.last_name,
      "contact": this.userInformationForm.value.contact,
      "gender": this.gender,
      "birth_date": this.userInformationForm.value.birth_date,
      "adhaar_card_number": this.userInformationForm.value.adhaar_card_number,
      "pan_card_number": this.userInformationForm.value.pan_card_number,
      "handicap_details": this.userInformationForm.value.handicap_details,
      "is_handicap": this.userInformationForm.value.is_handicap,
      "maritial_status": this.maritial_status,
      "user_id": this.user_information_id,
      "avatar_url": this.userInformationForm.value.avatar_url
    }

    console.log('Check- update values-->', userInformation);

    this._http.put(url, userInformation).subscribe((response: any) => {
      console.warn("response", response)
      if(response.status == 200){
        this.updateSessionUserDetails(response['full_name'], this.user_information_id)
        this.router.navigateByUrl('/')
      }else{
        console.log(response.errors)
      }
    },err=>{
      console.log(err)
    })
  }

  // seRadioBtnValue(field:any, object:any){
  //   if (field == "maritial_status"){
  //     this.maritial_status = object.value
  //   }else{
  //     this.gender = object.value
  //   }
  // }

  setAvatar(event: any) {
    console.log('Check--->', event.target.files[0]);
    this.userAvatar = event.target.files[0];
    this.userInformationForm.controls["avatar_url"].setValue(this.userAvatar, this.userAvatar.name)
    console.log('Check-name-->', this.userAvatar.name);
  }

  toggleHandicapText(){
    this.showHandicapBox? this.showHandicapBox = false : this.showHandicapBox = true
  }

  updateSessionUserDetails(name: any, selected_user_id: any){
    if(sessionStorage.getItem('userId') == selected_user_id){
      sessionStorage.setItem('userDetails', name)
    }
  }
}
