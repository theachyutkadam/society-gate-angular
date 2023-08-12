import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { DemoFlexyModule } from '../demo-flexy-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertsComponent } from './default/alerts/alerts.component';
import { ButtonsComponent } from './default/buttons/buttons.component';
import { ChipsComponent } from './default/chips/chips.component';
import { ExpansionComponent } from './default/expansion/expansion.component';
import { FormsComponent } from './default/forms/forms.component';
import { GridListComponent } from './default/grid-list/grid-list.component';
import { MenuComponent } from './default/menu/menu.component';
import { ProgressSnipperComponent } from './default/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './default/progress/progress.component';
import { SlideToggleComponent } from './default/slide-toggle/slide-toggle.component';
import { SliderComponent } from './default/slider/slider.component';
import { SnackbarComponent } from './default/snackbar/snackbar.component';
import { TabsComponent } from './default/tabs/tabs.component';
import { ToolbarComponent } from './default/toolbar/toolbar.component';
import { TooltipsComponent } from './default/tooltips/tooltips.component';

// pages
import { DashboardModule } from "../dashboard/dashboard.module";
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { BuildingFormComponent } from './pages/buildings/building-form/building-form.component';
import { BuildingIndexComponent } from './pages/buildings/index/building-index.component';

import { UserIndexComponent } from './pages/users/index/user-index.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { FlatIndexComponent } from './pages/flats/flat-index/flat-index.component';
import { FlatFormComponent } from './pages/flats/flat-form/flat-form.component';

import { VehicleIndexComponent } from './pages/vehicles/index/vehicle-index.component';
import { VehicleFormComponent } from './pages/vehicles/vehicle-form/vehicle-form.component';
import { GateEntriesIndexComponent } from './pages/gate-entries/index/gate-entries-index.component';

@NgModule({
    declarations: [
        AlertsComponent,
        FormsComponent,
        GridListComponent,
        MenuComponent,
        TabsComponent,
        ExpansionComponent,
        ChipsComponent,
        ProgressComponent,
        ToolbarComponent,
        ProgressSnipperComponent,
        SnackbarComponent,
        SliderComponent,
        SlideToggleComponent,
        ButtonsComponent,
        TooltipsComponent,

        UserIndexComponent,
        UserFormComponent,
        LoginComponent,
        LogoutComponent,
        BuildingFormComponent,
        BuildingIndexComponent,
        FlatIndexComponent,
        FlatFormComponent,
        VehicleIndexComponent,
        VehicleFormComponent,
        GateEntriesIndexComponent
    ],
    exports: [
        AlertsComponent,
        FormsComponent,
        GridListComponent,
        MenuComponent,
        TabsComponent,
        ExpansionComponent,
        ChipsComponent,
        ProgressComponent,
        ToolbarComponent,
        ProgressSnipperComponent,
        SnackbarComponent,
        SliderComponent,
        SlideToggleComponent,
        ButtonsComponent,
    ],
    imports: [
        CommonModule,
        FeatherModule.pick(allIcons),
        DemoFlexyModule,
        FormsModule,
        DashboardModule,
        ReactiveFormsModule,

    ]
})
export class ComponentsModule { }
