import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { reportAppointment } from '../../models/reports';
let AppointmentComponent = /** @class */ (() => {
    let AppointmentComponent = class AppointmentComponent {
        constructor(cnx, _location, toastService) {
            this.cnx = cnx;
            this._location = _location;
            this.toastService = toastService;
            this.location = [];
            this.program = [];
            this.programMain = [];
            this.status = [];
            this.statusMain = [];
            this.client = [];
            this.clientMain = [];
            this.staff = [];
            this.staffIds = [];
            this.locationsIds = [];
            this.settingsLocations = {};
            this.settingsStaff = {};
            this.ColumnMode = ColumnMode;
            this.SelectionType = SelectionType;
            this.isLoading = true;
            this.temp = [];
            this.selected = [];
        }
        ngOnInit() {
            this.report = new reportAppointment();
            this.inicializarCombos();
            this.cnx.get_dataWithParams('location', '?active=' + 'true').subscribe(myLocations => {
                this.location = myLocations;
                this.locationMain = new Array();
                myLocations.forEach(element => {
                    this.locationMain.push({ id: element.locationId, itemName: element.locationName });
                });
            });
            this.cnx.get_dataWithParams('program', '?active=' + 'true').subscribe(myPrograms => {
                this.program = myPrograms;
                //console.log(myPrograms);
                // prepara los datos para ser leidos en el combo
                this.programMain = myPrograms.filter(LOC => LOC.programId);
            });
            this.cnx.get_data('status').subscribe(myStatus => {
                this.status = myStatus;
                //console.log(myPrograms);
                // prepara los datos para ser leidos en el combo
                this.statusMain = myStatus.filter(LOC => LOC.tlkId);
            });
            this.cnx.get_dataWithParams('client', '?client=' + '').subscribe(myClient => {
                this.client = myClient;
                //console.log(myClient);
                // prepara los datos para ser leidos en el combo api/Staff?searchParamsJson={"active":"true"}
                this.clientMain = myClient.filter(LOC => LOC.clientID);
            });
            this.cnx.get_dataWithParams('staff', '?searchParamsJson=' + '{"active":"true"}').subscribe(myStaff => {
                this.staff = myStaff;
                this.staffMain = new Array();
                myStaff.forEach(element => {
                    this.staffMain.push({ id: element.staffID, itemName: element.lastName + ', ' + element.firstName });
                });
            });
        }
        inicializarCombos() {
            this.settingsLocations = {
                singleSelection: false,
                text: "Locatons List",
                selectAllText: "Select All",
                unSelectAllText: "UnSelect All",
                enableSearchFilter: true
            };
            this.settingsStaff = {
                singleSelection: false,
                text: "Staff List",
                selectAllText: "Select All",
                unSelectAllText: "UnSelect All",
                enableSearchFilter: true
            };
        }
        updateSelectedValueLocation(event) {
            //this.staff.locationID = event;
        }
        updateSelectedValueStaff(event) {
            //
        }
        updateSelectedValueAppointment(event) {
            //
        }
        updateSelectedValueStatus(event) {
            //
        }
        success(message, title) {
            this.toastService.success(message, title);
        }
        error(message, title) {
            this.toastService.error(message, title);
        }
        reportSearch() {
            let mystaffs = '';
            for (let i = 0; i < this.staffIds.length; i++) {
                mystaffs += this.staffIds[i]['id'] + ',';
            }
            mystaffs = mystaffs.substring(0, mystaffs.length - 1);
            if (mystaffs != '') {
                this.report.staffIds = mystaffs;
            }
            let locationsIds = '';
            for (let i = 0; i < this.locationsIds.length; i++) {
                locationsIds += this.locationsIds[i]['id'] + ',';
            }
            locationsIds = locationsIds.substring(0, locationsIds.length - 1);
            if (locationsIds != '') {
                this.report.locationsIds = locationsIds;
            }
            console.log(this.report);
            this.cnx.get_dataID('appointment', '?searchParams=' + JSON.stringify(this.report)).subscribe(myStaff => {
                console.log(myStaff);
                this.rows = myStaff;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1500);
                this.temp = this.rows.map((prop, key) => {
                    return Object.assign(Object.assign({}, prop), { id: key });
                });
            });
        }
        reportClean() {
            this.report = new reportAppointment();
            this.staffIds = [];
            this.locationsIds = [];
            this.inicializarCombos();
        }
        cancelReport() {
            this._location.back();
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
        onSelect({ selected }) {
            this.selected.splice(0, this.selected.length);
            this.selected.push(...selected);
        }
    };
    AppointmentComponent = __decorate([
        Component({
            selector: 'app-appointment',
            templateUrl: './appointment.component.html',
            styleUrls: ['./appointment.component.css']
        })
    ], AppointmentComponent);
    return AppointmentComponent;
})();
export { AppointmentComponent };
//# sourceMappingURL=appointment.component.js.map