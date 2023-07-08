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
import { UserIndexComponent } from './components/pages/users/index/user-index.component';
import { UserFormComponent } from './components/pages/users/user-form/user-form.component';
import { LoginComponent } from './components/pages/login/login.component';

const routes: Routes = [
  {
    path:"",
    component:FullComponent,
    children: [
      {path:"", redirectTo:"/home", pathMatch:"full"},
      {path:"home", component:DashboardComponent},
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
      {path:"users", component:UserIndexComponent},
      {path:"user-form", component:UserFormComponent},
      {path:"login", component:LoginComponent},

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
