import { Component, OnInit } from '@angular/core';
import { staff } from '../../models/staff';
import { ConnexionService } from '../../services/connexion.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { service, staffservice } from '../../models/sevice';

@Component({
  selector: 'app-staff-services',
  templateUrl: './staff-services.component.html',
  styleUrls: ['./staff-services.component.css']
})
export class StaffServicesComponent implements OnInit {
  staff: staff[] = [];
  staffMain: staff[] = [];
  staffid:Number;
  serviceid:Number;
  servicename:string;
  service: service[] = [];
  serviceMain: service[] = [];
  temp = [];
  rows;
  activeRow: any;

  constructor(private cnx: ConnexionService, private router: Router, public toastService: ToastService)
   { }

  ngOnInit() {
    // get staff
    this.cnx.get_dataWithParams<staff>('staff', '?searchParamsJson={active:' + true + '}').subscribe(myStaff => {
      this.staff = myStaff;
      // prepara los datos para ser leidos en el combo
      this.staffMain = myStaff.filter(LOC => LOC.staffID);
    });
    
  }

  getServices()
  {
    //get services
    this.cnx.get_dataWithParams<service>('program', '?sId=' + this.staffid + '&assined=0').subscribe(myServ => {
      this.service = myServ;
      // prepara los datos para ser leidos en el combo
      this.serviceMain = myServ.filter(LOC => LOC.programId);
    });
  }

  isLoading: boolean = false;

  listStaffServices()
  {
    this.isLoading = true;
    this.cnx.get_dataWithParams<service>('program', '?sId=' + this.staffid + '&assined=1').subscribe(myAds => {
      this.rows = myAds;
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
      this.temp = myAds.map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      });
    });
    this.isLoading = false;
  }

  updateSelectedValueStaff(event) {
    this.staffid = event;
    this.getServices();
    this.listStaffServices();
  }

  updateSelectedValueService(event)
  {
    this.serviceid = event;
    this.servicename = "";
    
    this.saveServiceStaff();
    this.listStaffServices();
    this.getServices();
  }

  onSelect($event) {
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  saveServiceStaff()
  {
    this.cnx.add_dataWithParamsOH<staffservice>('staff', '?staffId=' , this.staffid.toString(), "&serviceId=",this.serviceid.toString(),"&servName=",this.servicename).subscribe(myStaff => {
    });    
  }

  deleteFunction($event) {
    $event.preventDefault();
    //this.temp = this.rows.filter(entry => entry.id !== this.activeRow.id);
    
    this.cnx.del_data2Params<staffservice>('staff', 'serviceId', this.activeRow.programId, 'staffId', this.staffid.toString()).subscribe(myStaff => {
    });
    this.listStaffServices();
  }
}
