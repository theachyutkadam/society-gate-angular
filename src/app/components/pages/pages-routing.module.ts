import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../connections/auth.guard';
import { UserIndexComponent } from './users/index/user-index.component';
import { FlatIndexComponent } from './flats/flat-index/flat-index.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { BuildingFormComponent } from './buildings/building-form/building-form.component';
import { BuildingIndexComponent } from './buildings/index/building-index.component';

const routes: Routes = [
  {
    // path: '',
    {path:"home", component:DashboardComponent, canActivate:[AuthGuard]},
    {path:"users", component:UserIndexComponent, canActivate:[AuthGuard]},
    {path:"user-form", component:UserFormComponent, canActivate:[AuthGuard]},
    {path:"buildings", component:BuildingIndexComponent, canActivate:[AuthGuard]},
    {path:"building-form", component:BuildingFormComponent, canActivate:[AuthGuard]},
    {path:"flats", component:FlatIndexComponent, canActivate:[AuthGuard]}
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
