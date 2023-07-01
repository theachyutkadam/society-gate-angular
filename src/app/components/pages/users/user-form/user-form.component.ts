import { Component, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { HttpServices } from 'src/app/connections/services/http-services';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class UserFormComponent implements OnInit {

  checked = true;
  user_information: any;

  constructor(private router: Router, private _http: HttpServices) { }

  ngOnInit(): void {
    this.getUserInformations()
  }

  getUserInformations() {
    const user_information_id = sessionStorage.getItem("user_id")
    this._http.get(`user_informations/${user_information_id}`)
    .subscribe(
      (response: any) => {
        console.warn("user_info", response)
        this.user_information = response
      },
      err => {
        console.log(err);
      }
    )
  }

  onSave(event:any): void {
    // this.router.navigate(['/flexy/home']);
  }

  onBack(){
    sessionStorage.setItem('user_id', "0")
    this.router.navigateByUrl('/users')
  }
}
