import { Component, OnInit } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { staff } from '../../models/staff';
import { DatePipe, Location } from '@angular/common';
import { location, group, genericFieldsCombo } from '../../models/schemas';
import { ToastService } from 'src/app/services/toast.service';
import { schedule } from '../../models/schedule';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-schedule-staff',
  templateUrl: './schedule-staff.component.html',
  styleUrls: ['./schedule-staff.component.css']
})
export class ScheduleStaffComponent implements OnInit {

  isLoading: boolean = true;
  location: location[] = [];
  locationMain: location[] = [];
  schedule: schedule;
  temp = [];
  rows;
  group: group[] = [];
  groupMain: group[] = [];
  groupId: number;
  days: genericFieldsCombo[] = [];
  numberDays: number = 0;

  selected = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;


  constructor(private cnx: ConnexionService, private _location: Location, public toastService: ToastService, private router: Router) {
    this.days = [
      { cod: false, value: '2', content: 'Mon' },
      { cod: false, value: '3', content: 'Tue' },
      { cod: false, value: '4', content: 'Wed' },
      { cod: false, value: '5', content: 'Thu' },
      { cod: false, value: '6', content: 'Fri' },
      { cod: false, value: '7', content: 'Sat' },
      { cod: false, value: '1', content: 'Sun' }
    ];

    this.rows = new Array<staff>();
    this.schedule = new schedule();
  }

  ngOnInit() {
    this.getGroup();
    this.getLocation();
  }

  getLocation() {
    this.cnx.get_data<location>('location').subscribe(myLocations => {
      this.location = myLocations;
      this.locationMain = myLocations.filter(LOC => LOC.locationId);
    });
  }


  success(message: string, title: string) {
    this.toastService.success(message, title);
  }

  error(message: string, title: string) {
    this.toastService.error(message, title);
  }

  updateSelectedValueLocation(event) {
    this.schedule.locationId = event;
  }

  cancelSchedule() {
    this._location.back();
  }

  loadStaff() {
    this.remove();
    this.cnx.get_dataID<staff>('staff', '?groupId=' + this.groupId).subscribe(myStaff => {
      this.rows = myStaff;
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
      this.temp = this.rows.map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      });

    });
  }
  /*editFunction(event) {
    event.preventDefault();
    let datePipe = new DatePipe('en-US');

    this.tempDateTime.editStartDate = datePipe.transform(this.activeRow.fechaInicio, "yyyy-MM-dd");
    this.tempDateTime.editEndDate = datePipe.transform(this.activeRow.fechaFin, "yyyy-MM-dd");
    let splitTimeStart = this.activeRow.horaInicio.split(' ');
    let splitHourStart = splitTimeStart[0].split(':');
    if (splitTimeStart[1] == 'PM') {
      splitHourStart[0] = Number(splitHourStart[0]) + 12;
    }
    let reservStart = new Date(0, 0, 0, splitHourStart[0], splitHourStart[1]);
    this.tempDateTime.editStartTime = datePipe.transform(reservStart, "HH:mm");
    let splitTimeEnd = this.activeRow.horaInicio.split(' ');
    let splitHourEnd = splitTimeEnd[0].split(':');
    if (splitTimeEnd[1] == 'PM') {
      splitHourEnd[0] = Number(splitHourEnd[0]) + 12;
    }
    let reservEnd = new Date(0, 0, 0, splitHourEnd[0], splitHourEnd[1]);
    this.tempDateTime.editEndTime = datePipe.transform(reservEnd, "HH:mm");
  }*/

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }

  getGroup() {
    //get services
    this.cnx.get_data<group>('group').subscribe(myGroup => {
      this.group = myGroup;
      // prepara los datos para ser leidos en el combo
      this.groupMain = myGroup.filter(GRP => GRP.groupID);
    });
  }

  updateSelectedValueGroup(event) {
    this.groupId = event;
    this.loadStaff();
  }

  clearData()
  {
    this.groupId = undefined;
    this.schedule.locationId = undefined;
    this.rows = new Array<staff>();
    this.schedule = new schedule();
  }

  saveSched() {
    if (this.selected.length > 0) {
      if (this.schedule.endDate > this.schedule.startDate) {

        let selDays = '';
        for (let i = 0; i < this.days.length; i++) {
          if (this.days[i].cod) {
            this.numberDays++;
            selDays += this.days[i].value + ',';
          }
        }
        if (this.numberDays > 0) {
          this.schedule.selectedDays = selDays;
          this.schedule.overlappingCount = 1;

          for (let s = 0; s < this.selected.length; s++) {
            this.schedule.staffId = this.selected[s].staffID;
            this.cnx.add_dataWithParams<schedule>('staffSchedule', '?staffSchedJson=', this.schedule).subscribe(
              mySched => {
                console.log(mySched);
              });
          }
          this.clearData();
          this.success('Schedule saved successfully', 'Staff Schedule');
        }
        else {
          this.error('Please select days', 'Staff Schedule');
        }
      }
      else {
        this.error('End Date must be great than Start Date', 'Staff Schedule');
      }
    }
    else {
      this.error('Please Select Staff', 'Staff Schedule');
    }

  }
}
