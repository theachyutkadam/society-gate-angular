import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import { FlatFormComponent } from './flats/flat-form/flat-form.component';
import { FlatIndexComponent } from './flats/flat-index/flat-index.component';
import { UserIndexComponent } from './users/index/user-index.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { BuildingFormComponent } from './buildings/building-form/building-form.component';
import { BuildingIndexComponent } from './buildings/index/building-index.component';
import { VehicleIndexComponent } from './vehicles/index/vehicle-index.component';
import { GateEntriesIndexComponent } from './gate-entries/index/gate-entries-index.component';
import { VehicleFormComponent } from './vehicles/vehicle-form/vehicle-form.component';

@NgModule({
  declarations: [
    // PagesComponent,

    // FlatFormComponent,
    // FlatIndexComponent
    // UserIndexComponent,
    // UserFormComponent,
    // BuildingIndexComponent,
    // BuildingFormComponent

    // VehicleIndexComponent,
    // GateEntriesIndexComponent

    // VehicleFormComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
