import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonTaskService } from '../../connections/common/common-task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private common: CommonTaskService
  ) { }

  ngOnInit(): void {
    sessionStorage.clear()
    this.toastr.success("Successfully Logout", 'Success');
    this.router.navigate(['/login'])
  }

}
