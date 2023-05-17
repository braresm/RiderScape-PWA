import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadarRoutingModule } from './radar-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddShiftComponent } from './components/add-shift/add-shift.component';
import { ListShiftsComponent } from './components/list-shifts/list-shifts.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AddShiftComponent,
    ListShiftsComponent
  ],
  imports: [
    CommonModule,
    RadarRoutingModule,
    SharedModule
  ]
})
export class RadarModule { }
