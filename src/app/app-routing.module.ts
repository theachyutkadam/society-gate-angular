import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './dashboard/dashboard-components/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { AlertsComponent } from './components/default/alerts/alerts.component';
import { ButtonsComponent } from './components/default/buttons/buttons.component';
import { ChipsComponent } from './components/default/chips/chips.component';
import { ExpansionComponent } from './components/default/expansion/expansion.component';
import { FormsComponent } from './components/default/forms/forms.component';
import { GridListComponent } from './components/default/grid-list/grid-list.component';
import { MenuComponent } from './components/default/menu/menu.component';
import { ProgressSnipperComponent } from './components/default/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/default/progress/progress.component';
import { SlideToggleComponent } from './components/default/slide-toggle/slide-toggle.component';
import { SliderComponent } from './components/default/slider/slider.component';
import { SnackbarComponent } from './components/default/snackbar/snackbar.component';
import { TabsComponent } from './components/default/tabs/tabs.component';
import { ToolbarComponent } from './components/default/toolbar/toolbar.component';
import { TooltipsComponent } from './components/default/tooltips/tooltips.component';

import { LoginComponent } from './components/pages/login/login.component';
import { LogoutComponent } from './components/pages/logout/logout.component';
import { AuthGuard } from './components/connections/auth.guard';
import { BuildingIndexComponent } from './components/pages/buildings/index/building-index.component';
import { BuildingFormComponent } from './components/pages/buildings/building-form/building-form.component';

import { UserIndexComponent } from './components/pages/users/index/user-index.component';
import { UserFormComponent } from './components/pages/users/user-form/user-form.component';
import { FlatIndexComponent } from './components/pages/flats/flat-index/flat-index.component'
import { FlatFormComponent } from './components/pages/flats/flat-form/flat-form.component'
import { VehicleIndexComponent } from './components/pages/vehicles/index/vehicle-index.component'
import { VehicleFormComponent } from './components/pages/vehicles/vehicle-form/vehicle-form.component'
import { GateEntriesIndexComponent } from './components/pages/gate-entries/index/gate-entries-index.component'

const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"/home", pathMatch:"full"},
      {path:"home", component:DashboardComponent, canActivate:[AuthGuard]},
      {path:"alerts", component:AlertsComponent},
      {path:"forms", component:FormsComponent},
      {path:"table", component:ProductComponent},
      {path:"grid-list", component:GridListComponent},
      {path:"menu", component:MenuComponent},
      {path:"tabs", component:TabsComponent},
      {path:"expansion", component:ExpansionComponent},
      {path:"chips", component:ChipsComponent},
      {path:"progress", component:ProgressComponent},
      {path:"toolbar", component:ToolbarComponent},
      {path:"progress-snipper", component:ProgressSnipperComponent},
      {path:"snackbar", component:SnackbarComponent},
      {path:"slider", component:SliderComponent},
      {path:"slide-toggle", component:SlideToggleComponent},
      {path:"tooltip", component:TooltipsComponent},
      {path:"button", component:ButtonsComponent},

      // paegs
      {path:"login", component:LoginComponent},
      {path:"logout", component:LogoutComponent},

      {path:"users", component:UserIndexComponent, canActivate:[AuthGuard]},
      {path:"user-form", component:UserFormComponent, canActivate:[AuthGuard]},
      {path:"buildings", component:BuildingIndexComponent, canActivate:[AuthGuard]},
      {path:"building-form", component:BuildingFormComponent, canActivate:[AuthGuard]},
      {path:"flats", component:FlatIndexComponent, canActivate:[AuthGuard]},
      {path:"flat-form", component:FlatFormComponent, canActivate:[AuthGuard]},

      {path:"vehicles", component:VehicleIndexComponent, canActivate:[AuthGuard]},
      {path:"vehicle-form", component:VehicleFormComponent, canActivate:[AuthGuard]},

      {path:"gate-entries", component:GateEntriesIndexComponent, canActivate:[AuthGuard]},
    ]
  },

  {path:"", redirectTo:"/home", pathMatch:"full"},
  // {path:"**", redirectTo:"/home", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
