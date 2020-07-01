import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmComponent } from "./adm.component";
import { MainComponent } from "./views/main/main.component";
import { ProfileComponent } from './views/profile/profile.component';
import { StaffListComponent } from './views/staff-list/staff-list.component';
import { NewStaffComponent } from './views/new-staff/new-staff.component';
import { ClientListComponent } from './views/client-list/client-list.component';
import { NewClientComponent } from './views/new-client/new-client.component';
import { ServicesListComponent } from './views/services-list/services-list.component';
import { DeactivateGuardService } from "./services/deactivate-guard.service";
import { LocationListComponent } from './views/location-list/location-list.component';
import { NewLocationComponent } from './views/new-location/new-location.component';
import { GroupListComponent } from './views/group-list/group-list.component';
import { NewGroupComponent } from './views/new-group/new-group.component';
import { NewServiceComponent } from './views/new-service/new-service.component';
import { StaffServicesComponent } from './views/staff-services/staff-services.component';
import { ScheduleStaffComponent } from './views/schedule-staff/schedule-staff.component';
import { AppointmentComponent } from './reports/appointment/appointment.component';
import { DepartmentComponent } from './views/department/department.component';
import { NewDepartmentComponent } from './views/new-department/new-department.component';
import { ShowCalendarComponent } from './views/show-calendar/show-calendar.component';
import { CreateAppointmentComponent } from './views/create-appointment/create-appointment.component';
import { DetailAppointmentComponent } from './views/detail-appointment/detail-appointment.component';

const routes: Routes = [
  /*{
    path: '', component: AdmComponent, children:[
      { path: '', component: MainComponent }
    ]
  }*/
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: AdmComponent,
    children: [{ path: '', component: MainComponent }]
  },
  {
    path: 'profile',
    component: AdmComponent,
    children: [{ path: '', component: ProfileComponent }]
  },
  {
    path: 'staff',
    component: AdmComponent,
    children: [{ path: '', component: StaffListComponent }]
  },
  {
    path: 'new-staff',
    component: AdmComponent,
    children: [{ path: '', component: NewStaffComponent, canDeactivate: [DeactivateGuardService] }]
  },
  {
    path: 'edit-staff/:staffID',
    component: AdmComponent,
    children: [{ path: '', component: NewStaffComponent, canDeactivate: [DeactivateGuardService] }]
  },
  {
    path: 'staff-services',
    component: AdmComponent,
    children: [{ path: '', component: StaffServicesComponent }]
  },
  {
    path: 'schedule-staff',
    component: AdmComponent,
    children: [{ path: '', component: ScheduleStaffComponent }]
  },
  {
    path: 'client',
    component: AdmComponent,
    children: [{ path: '', component: ClientListComponent }]
  },
  {
    path: 'new-client',
    component: AdmComponent,
    children: [{ path: '', component: NewClientComponent }]
  },
  {
    path: 'edit-client/:clientID',
    component: AdmComponent,
    children: [{ path: '', component: NewClientComponent }]
  },
  {
    path: 'location',
    component: AdmComponent,
    children: [{ path: '', component: LocationListComponent }]
  },
  {
    path: 'new-location',
    component: AdmComponent,
    children: [{ path: '', component: NewLocationComponent }]
  },
  {
    path: 'edit-location/:locationID',
    component: AdmComponent,
    children: [{ path: '', component: NewLocationComponent }]
  },
  
  {
    path: 'department',
    component: AdmComponent,
    children: [{ path: '', component: DepartmentComponent }]
  },
  {
    path: 'new-department',
    component: AdmComponent,
    children: [{ path: '', component: NewDepartmentComponent }]
  },
  {
    path: 'edit-department/:departmentID',
    component: AdmComponent,
    children: [{ path: '', component: NewDepartmentComponent }]
  },

  {
    path: 'group',
    component: AdmComponent,
    children: [{ path: '', component: GroupListComponent }]
  },
  {
    path: 'new-group',
    component: AdmComponent,
    children: [{ path: '', component: NewGroupComponent }]
  },
  {
    path: 'edit-group/:groupID',
    component: AdmComponent,
    children: [{ path: '', component: NewGroupComponent }]
  },
  {
    path:'service',
    component: AdmComponent,
    children: [{ path: '', component: ServicesListComponent}]
  },
  {
    path: 'new-service',
    component: AdmComponent,
    children: [{ path: '', component: NewServiceComponent }]
  },
  {
    path: 'edit-service/:programId',
    component: AdmComponent,
    children: [{ path: '', component: NewServiceComponent }]
  },
  {
    path: 'reports/appointment',
    component: AdmComponent,
    children: [{ path: '', component: AppointmentComponent }]
  },
  {
    path: 'show-calendar',
    component: AdmComponent,
    children: [{ path: '', component: ShowCalendarComponent }]
  },
  {
    path: 'create-appointment',
    component: AdmComponent,
    children: [{ path: '', component: CreateAppointmentComponent }]
  },
  {
    path: 'detail-appointment',
    component: AdmComponent,
    children: [{ path: '', component: DetailAppointmentComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmRoutingModule { }
