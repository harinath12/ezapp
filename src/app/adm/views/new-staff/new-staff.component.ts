import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';
import { staff, staffPermisions } from '../../models/staff';
import { role } from '../../models/role';
import { isNullOrUndefined } from 'util';
import { group, genericFields, program, location, clientPagination, permisions } from '../../models/schemas';
import { Location, DatePipe } from '@angular/common';
import { CanComponentDeactivate } from '../../services/deactivate-guard.service';
import { Observable } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { service, companyServices } from '../../models/sevice';
import { schedule } from '../../models/schedule';
import { Page } from '../../models/page';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.css']
})
export class NewStaffComponent implements OnInit, CanComponentDeactivate {

  @ViewChild('scheduleTable', { static: false }) table: any;
  //@ViewChild('contextForm', {static: false}) contextForm: ElementRef;
  @ViewChild('contextForm', { static: false }) contextForm: NgForm;

  staff: staff;
  group: group[] = [];
  program: program[] = [];
  groupMain: group[] = [];
  staffID: number;
  role: role[] = [];
  roleMain: role[] = [];
  location: location[] = [];
  locationMain: location[] = [];
  companyService: companyServices[] = [];
  staffPermisions: staffPermisions;
  isNew: boolean;
  title: string;
  ListLanguages: genericFields[] = [];
  listClonGroups;
  listClonPrograms;
  listClonLanguages = [];
  listSchedule: schedule[] = [];
  tempListSchedule: {}[];

  settingsGroups = {};
  settingsPrograms = {};
  settingsLanguages = {};
  selectedGroups = [];
  selectedPrograms = [];
  selectedLanguages = [];
  isSaved: boolean = false;

  staffPermisionsView: boolean[];
  staffPermisionsEdit: boolean[];

  page = new Page();
  clientPagination: clientPagination[];
  pageNumber: number;
  pageSize: number;
  entries: number = 5;

  activeRow: any;
  groups = [];
  temp = [];
  rows;
  isLoading: boolean = true;
  tempDateTime = { editStartDate: '', editStartTime: '', editEndDate: '', editEndTime: '' };

  constructor(private cnx: ConnexionService, private route: ActivatedRoute, private router: Router, private _location: Location, public toastService: ToastService) {
    this.staff = new staff();
    this.isNew = true;
    this.isSaved = false;

    this.clientPagination = new Array<clientPagination>();
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  /**
   * Llenado de Combos Multiselect
   */
  initializeMultiSelect() {
    // extrae de la bd los datos ROLE
    this.cnx.get_data<role>('role').subscribe(myRoles => {
      this.role = myRoles;
      // prepara los datos para ser leidos en el combo
      this.roleMain = myRoles.filter(LOC => LOC.roleId);
    });
    // extrae de la bd los datos LOCATION
    this.cnx.get_data<location>('location').subscribe(myLocations => {
      this.location = myLocations;
      console.log(this.location);
      // prepara los datos para ser leidos en el combo
      this.locationMain = myLocations.filter(LOC => LOC.locationId);
      console.log(this.locationMain);
    });

    this.listClonLanguages[0] = { id: 'EN', itemName: 'English' };
    this.listClonLanguages[1] = { id: 'SP', itemName: 'Spanish' };
  }

  /**
   * inicia las propiedades de cada combo angular2-multiselect
   */
  settingsMultiselect() {
    // combo angular2-multiselect GROUPS
    this.settingsGroups = {
      singleSelection: false,
      text: "Group Membership",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true
    };
    // combo angular2-multiselect PROGRAMS
    this.settingsPrograms = {
      singleSelection: false,
      text: "Program Types",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true
    };
    // combo angular2-multiselect LANGUAGE
    this.settingsLanguages = {
      singleSelection: false,
      text: "Languages",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      enableSearchFilter: true
    };
  }

  ngOnInit() {
    // extrae de la bd los datos CompanyServices: Appointments, Admin, Contacts, Workbench, Reports
    this.cnx.get_data<companyServices>('companyServices').subscribe(myCompanyServices => {
      this.companyService = myCompanyServices;
    });
    this.initializeMultiSelect(); //role, location, language
    this.settingsMultiselect(); // group, program, language

    // extrae de la bd los datos GROUP
    this.listClonGroups = new Array();
    this.cnx.get_dataWithParams<group>('group', '?status=1').subscribe(myGroup => {
      this.group = myGroup;
      myGroup.forEach(element => {
        this.listClonGroups.push({ id: element.groupID, itemName: element.groupName });
      });
    });
    // extrae de la bd los datos PROGRAMS
    this.listClonPrograms = new Array();
    this.cnx.get_data<program>('program').subscribe(myPrograms => {
      this.program = myPrograms;
      myPrograms.forEach(element => {
        this.listClonPrograms.push({ id: element.programId, itemName: element.programName });
      });
    });

    this.staffPermisionsView = [];
    this.staffPermisionsEdit = [];

    this.staffID = this.route.snapshot.params['staffID'];
    if (!this.staffID) {
      this.staffNew();
    } else {
      this.staffEdit();
    }

    //this.router.navigate(['/admin/inventory']);
  }

  staffNew() {
    this.isNew = true;
    this.title = "New Staff";
    this.isSaved = false;
    this.staff.reportsToID = 1;
    this.staff.systemUserId = 0;
    this.staff.active = true;
    this.staff.staffSched = null;
    this.staffPermisions = new staffPermisions;
  }

  staffEdit() {
    //this.isSaved = true
    this.isNew = false;
    this.title = "Edit Staff";
    this.cnx.get_dataID<staff>('staff', '?staffID=' + this.staffID).subscribe(myStaff => {
      this.staff = myStaff;
      this.fillMultiSelect(myStaff);
    });
    this.cnx.get_dataID<staffPermisions>('staff', '?staffSGId=' + this.staffID).subscribe(myStaffPermisions => {
      console.log(myStaffPermisions);

      this.staffPermisions = myStaffPermisions;
      for (let i = 0; i < this.companyService.length; i++) {
        let view = false;
        let edit = false;
        for (let j = 0; j < myStaffPermisions.staffPermisions.length; j++) {
          if (this.companyService[i].serviceId == myStaffPermisions.staffPermisions[j].key) {
            view = myStaffPermisions.staffPermisions[j].view;
            edit = myStaffPermisions.staffPermisions[j].edit;
            break;
          }
        }
        this.staffPermisionsView.push(view);
        this.staffPermisionsEdit.push(edit);
      }
    });

    this.isSaved = false;
    //this.obtenerDatos();
  }

  /*obtenerDatos() {
    this.tempListSchedule = [];
    this.cnx.get_dataWithParams<schedule>('staffSchedule', '?schedParamsJson={"staffId":' + this.staffID + ',"Page":' + (this.page.pageNumber + 1) + ',"PageSize":' + (this.entries) + '}').subscribe(mySchedule => {

      this.setPage({ offset: 0 });
      this.page.totalElements = mySchedule['Parameters'].total;
      console.log(mySchedule['Parameters'].total);

      this.page.totalPages = this.page.totalElements / this.page.size;
      console.log(mySchedule);

      this.listSchedule = mySchedule['Clients'];
      let datePipe = new DatePipe('en-US');


      let cantidad = mySchedule['Clients'].length;

      for (let i = 0; i < cantidad; i++) {
        this.tempListSchedule.push({ "dateId": mySchedule['Clients'][i].dateId, "fechaInicio": datePipe.transform(mySchedule['Clients'][i].startDate, 'fullDate'), "horaInicio": mySchedule['Clients'][i].startTime, "fechaFin": datePipe.transform(mySchedule['Clients'][i].endDate, 'fullDate'), "horaFin": mySchedule['Clients'][i].endTime });
      }
      this.rows = this.tempListSchedule;
      setTimeout(() => {
        this.isLoading = false;
      }, 1500);
      this.temp = this.tempListSchedule.map((prop, key) => {
        return {
          ...prop,
          id: key
        };
      });
    });
  }
  toggleExpandGroup($event, group) {
    $event.preventDefault();
    console.log('Toggled Expand Group!', group);
    this.table.groupHeader.toggleExpandGroup(group);
  }
  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
  entriesChange($event) {
    this.entries = $event.target.value;
    this.obtenerDatos();
  }
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    if (this.page.pageNumber != pageInfo.offset) {
      console.log(pageInfo.offset);
      this.obtenerDatos();
    }
  }

  filterTable($event) {
    let val = $event.target.value.toString().toLowerCase();
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key]) {
          try {
            if (d[key].toString().toLowerCase().indexOf(val) !== -1) {
              return true;
            }
          } catch (error) {
            console.log(d[key], error);
          }
        }
      }
      return false;
    });
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  editFunction(event) {
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
  }

  deleteFunction(event) {
    event.preventDefault();
    console.log(this.activeRow);
    
  }*/

  success(message: string, title: string) {
    this.toastService.success(message, title);
  }

  error(message: string, title: string) {
    this.toastService.error(message, title);
  }


  fillMultiSelect(myStaff: staff) {
    this.cnx.get_dataWithParams<string>('group', '?staffId=' + myStaff.staffID).subscribe(myGroups => {
      if (myGroups.length > 0) {
        myGroups.forEach(group => {
          this.selectedGroups.push({ id: group['groupId'], itemName: group['groupName'] });
        });
      }
    });

    this.cnx.get_dataWithParams<program>('program', '?staffID=' + myStaff.staffID).subscribe(myPrograms => {
      if (myPrograms.length > 0) {
        myPrograms.forEach(prog => {
          this.selectedPrograms.push({ id: prog['programId'], itemName: prog['programName'] });
        });
      }
    });

    if (myStaff.languages && (myStaff.languages.length > 0)) {
      for (let i = 0; i < myStaff.languages.length; i++) {
        for (let j = 0; j < this.listClonLanguages.length; j++) {
          if (this.listClonLanguages[j].id == myStaff.languages[i]) {
            this.selectedLanguages.push(this.listClonLanguages[j]);
            break;
          }
        }
      }
    }
  }

  updateSelectedValueLocation(event) {
    this.staff.locationID = event;
  }

  updateSelectedValueRole(event) {
    this.staff.rolID = event;
  }

  updateSelectedValueGroup(event) {
    this.staff.groupSecid = [event];
  }

  saveStaff() {
    // Verifica si el staff es nuevo o no
    if (this.isNew) {
      this.staff.staffID = 0;
    }
    // Verifica si hay grupos seleccionados
    if (this.selectedGroups.length != 0) {
      let tmp = [];
      for (let i = 0; i < this.selectedGroups.length; i++) {
        tmp.push(this.selectedGroups[i].id);
      }
      this.staff.groupSecid = tmp;
    } else {
      this.staff.groupSecid = null;
    }
    // Verifica si hay programas seleccionados
    if (this.selectedPrograms.length != 0) {
      let tmp = [];
      for (let j = 0; j < this.selectedPrograms.length; j++) {
        for (let i = 0; i < this.program.length; i++) {
          if (this.selectedPrograms[j].id == this.program[i].programId) {
            tmp.push(this.program[i]);
            break;
          }
        }
        this.staff.programTypes = tmp;
      }
    } else {
      this.staff.programTypes = [];
    }
    // Verifica si hay lenguajes seleccionados
    if (this.selectedLanguages.length != 0) {
      let tmp = [];
      for (let i = 0; i < this.selectedLanguages.length; i++) {
        tmp.push(this.selectedLanguages[i].id);
      }
      this.staff.languages = tmp;
    } else {
      this.staff.languages = ['EN'];
    }

    this.cnx.add_dataWithParams<staff>('staff', '?staffDatajson=', this.staff).subscribe(
      myStaff => {
        switch (myStaff.toString().toLowerCase()) {
          case 'saved':
            this.toastService.success('Staff saved successfully', this.title);
            this.saveService();
            this.isSaved = true;
            alert('Staff saved successfully');
            this.router.navigate(['/staff']);
            break;
          case 'error':
            this.toastService.error('An error occurred while trying to save the Staff', this.title);
            break;
          default:
            break;
        };
      });
  }

  saveService() {
    let services: permisions[] = [];
    for (let i = 0; i < this.companyService.length; i++) {
      services.push({ key: this.companyService[i].serviceId, view: this.staffPermisionsView[i], edit: this.staffPermisionsEdit[i] });
    }
    this.staffPermisions.staffPermisions = services;
    this.staffPermisions.groupsIds = this.staff.groupSecid;
    this.staffPermisions.rolId = this.staff.rolID;
    this.cnx.add_dataWithParams<staffPermisions>('staff', '?staffSecurityInfoJson=', this.staffPermisions).subscribe(
      resStaffPermisions => {
        console.log('respuesta de resStaffPermisions:', resStaffPermisions);
      }
    );
  }

  cancelStaff() {
    this._location.back();
  }

  onItemSelect(item: any) {
  }
  OnItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.contextForm.dirty) {
      if (!this.isSaved) {
        return confirm('Your changes are unsaved!! Do you like to exit');
      }
      return true;
    }
    return true;
  }

  permisoGenerico(nc: number): boolean {
    let res = false;
    //console.log("res", res);
    if (nc > 0) {
      res = true;
    }
    else {
      res = false;
    }

    //res = true;
    return res;
  }
}