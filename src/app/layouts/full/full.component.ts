import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {
  userDetails = sessionStorage.getItem("userDetails")
  userInformationId = sessionStorage.getItem("userInformationId")

  search: boolean = false;
  show_header = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  constructor(private router: Router, private breakpointObserver: BreakpointObserver) { }

  ngOnit(){
    console.log("testig ng")
    if(sessionStorage.getItem('authToken')){
      this.show_header = true
    }
  }

  routerActive: string = "activelink";

  setUser(user:any){
    sessionStorage.setItem('selected_user_id', user)
    this.router.navigateByUrl('/user-form')
  }

  logoutUser(){
    console.log('Check logout link clicked--->');
    this.router.navigateByUrl('/logout')
  }

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/buildings",
      icon: "table",
      menu: "Buildings",
    },
    {
      link: "/flats",
      icon: "home",
      menu: "Flats",
    },
    {
      link: "/users",
      icon: "grid",
      menu: "Users",
    },
    {
      link: "/button",
      icon: "disc",
      menu: "Buttons",
    },
    {
      link: "/forms",
      icon: "layout",
      menu: "Forms",
    },
    {
      link: "/alerts",
      icon: "info",
      menu: "Alerts",
    },
    {
      link: "/grid-list",
      icon: "file-text",
      menu: "Grid List",
    },
    {
      link: "/menu",
      icon: "menu",
      menu: "Menus",
    },
    {
      link: "/table",
      icon: "grid",
      menu: "Tables",
    },
    {
      link: "/expansion",
      icon: "divide-circle",
      menu: "Expansion Panel",
    },
    {
      link: "/chips",
      icon: "award",
      menu: "Chips",
    },
    {
      link: "/tabs",
      icon: "list",
      menu: "Tabs",
    },
    {
      link: "/progress",
      icon: "bar-chart-2",
      menu: "Progress Bar",
    },
    {
      link: "/toolbar",
      icon: "voicemail",
      menu: "Toolbar",
    },
    {
      link: "/progress-snipper",
      icon: "loader",
      menu: "Progress Snipper",
    },
    {
      link: "/tooltip",
      icon: "bell",
      menu: "Tooltip",
    },
    {
      link: "/snackbar",
      icon: "slack",
      menu: "Snackbar",
    },
    {
      link: "/slider",
      icon: "sliders",
      menu: "Slider",
    },
    {
      link: "/slide-toggle",
      icon: "layers",
      menu: "Slide Toggle",
    },
  ]

}
