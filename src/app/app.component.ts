import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'SaftyGate';
  show_header: boolean = false

  ngOnInit(){
  	if(sessionStorage.getItem('authToken')){
  	  this.show_header = true
  	}
  }
}
