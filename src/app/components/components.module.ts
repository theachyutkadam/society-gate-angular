import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AlertsComponent } from '.defaul/alerts/alerts.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
// import { FormsComponent } from '.defaul/forms/forms.component';
import { DemoFlexyModule } from '../demo-flexy-module';
// import { GridListComponent } from '.defaul/grid-list/grid-list.component';
// import { MenuComponent } from '.defaul/menu/menu.component';
// import { TabsComponent } from '.defaul/tabs/tabs.component';
// import { ExpansionComponent } from '.defaul/expansion/expansion.component';
// import { ChipsComponent } from '.defaul/chips/chips.component';
// import { ProgressComponent } from '.defaul/progress/progress.component';
import { FormsModule } from '@angular/forms';
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
// import { ToolbarComponent } from '.defaul/toolbar/toolbar.component';
// import { ProgressSnipperComponent } from '.defaul/progress-snipper/progress-snipper.component';
// import { SnackbarComponent } from '.defaul/snackbar/snackbar.component';
// import { SliderComponent } from '.defaul/slider/slider.component';
// import { SlideToggleComponent } from '.defaul/slide-toggle/slide-toggle.component';
// import { ButtonsComponent } from '.defaul/buttons/buttons.component';
// import { TooltipsComponent } from '.defaul/tooltips/tooltips.component'


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
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    FormsModule
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
  ]
})
export class ComponentsModule { }
