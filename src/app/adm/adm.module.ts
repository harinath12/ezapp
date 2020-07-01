import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AngularMultiSelectModule } from "angular2-multiselect-dropdown";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AdmRoutingModule } from './adm-routing.module';
import { AdmComponent } from './adm.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainComponent } from './views/main/main.component';
import { ProfileComponent } from './views/profile/profile.component';
import { StaffListComponent } from './views/staff-list/staff-list.component';
import { NewStaffComponent } from './views/new-staff/new-staff.component';
import { ClientListComponent } from './views/client-list/client-list.component';
import { NewClientComponent } from './views/new-client/new-client.component';
import { ServicesListComponent } from './views/services-list/services-list.component';
import { ShowErrorsComponent } from './tools/show-errors/show-errors.component';
import { ToastComponent } from "../modules/toast/toast.component";
import { LocationListComponent } from './views/location-list/location-list.component';
import { NewLocationComponent } from './views/new-location/new-location.component';
import { NewGroupComponent } from './views/new-group/new-group.component';
import { GroupListComponent } from './views/group-list/group-list.component';
import { NewServiceComponent } from './views/new-service/new-service.component';
import { StaffServicesComponent } from './views/staff-services/staff-services.component';
import { ScheduleStaffComponent } from './views/schedule-staff/schedule-staff.component';
import { AppointmentComponent } from './reports/appointment/appointment.component';
import { DepartmentComponent } from './views/department/department.component';
import { NewDepartmentComponent } from './views/new-department/new-department.component';
import { ShowCalendarComponent, HaveslotsPipe } from './views/show-calendar/show-calendar.component';
import { CreateAppointmentComponent } from './views/create-appointment/create-appointment.component';
import { DetailAppointmentComponent } from './views/detail-appointment/detail-appointment.component';
import { from } from 'rxjs';
import { FullCalendarModule } from '@fullcalendar/angular';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AdmComponent, 
    NavbarComponent, 
    SidebarComponent, 
    FooterComponent, 
    MainComponent, 
    ProfileComponent, 
    StaffListComponent, 
    NewStaffComponent, 
    ClientListComponent, 
    NewClientComponent, 
    ShowErrorsComponent, 
    ToastComponent, 
    ServicesListComponent, 
    NewServiceComponent, 
    StaffServicesComponent, 
    LocationListComponent, 
    NewLocationComponent, 
    NewGroupComponent, 
    GroupListComponent, 
    ScheduleStaffComponent, 
    AppointmentComponent, DepartmentComponent, NewDepartmentComponent, ShowCalendarComponent, HaveslotsPipe,
    CreateAppointmentComponent,
    DetailAppointmentComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    AngularMultiSelectModule,
    FullCalendarModule,
    AdmRoutingModule,
    DragDropModule,
    BsDatepickerModule.forRoot()
  ]
})
export class AdmModule { }
