import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
// import { FlatFormComponent } from './flats/flat-form/flat-form.component';
// import { FlatIndexComponent } from './flats/flat-index/flat-index.component';
// import { PagesComponent } from './pages/pages.component';
// import { UserFormComponent } from './users/user-form/user-form.component';
// import { UserIndexComponent } from './users/index/user-index.component';


@NgModule({
  declarations: [
    // PagesComponent,
    // UserFormComponent,
    // UserIndexComponent
    // FlatFormComponent,
    // FlatIndexComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
