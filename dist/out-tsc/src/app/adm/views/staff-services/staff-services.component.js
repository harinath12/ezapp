import { __decorate } from "tslib";
import { Component } from '@angular/core';
let StaffServicesComponent = /** @class */ (() => {
    let StaffServicesComponent = class StaffServicesComponent {
        constructor(cnx, router, toastService) {
            this.cnx = cnx;
            this.router = router;
            this.toastService = toastService;
            this.staff = [];
            this.staffMain = [];
            this.service = [];
            this.serviceMain = [];
            this.temp = [];
            this.isLoading = false;
        }
        ngOnInit() {
            // get staff
            this.cnx.get_dataWithParams('staff', '?searchParamsJson={active:' + true + '}').subscribe(myStaff => {
                this.staff = myStaff;
                // prepara los datos para ser leidos en el combo
                this.staffMain = myStaff.filter(LOC => LOC.staffID);
            });
        }
        getServices() {
            //get services
            this.cnx.get_dataWithParams('program', '?sId=' + this.staffid + '&assined=0').subscribe(myServ => {
                this.service = myServ;
                // prepara los datos para ser leidos en el combo
                this.serviceMain = myServ.filter(LOC => LOC.programId);
            });
        }
        listStaffServices() {
            this.isLoading = true;
            this.cnx.get_dataWithParams('program', '?sId=' + this.staffid + '&assined=1').subscribe(myAds => {
                this.rows = myAds;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1500);
                this.temp = myAds.map((prop, key) => {
                    return Object.assign(Object.assign({}, prop), { id: key });
                });
            });
            this.isLoading = false;
        }
        updateSelectedValueStaff(event) {
            this.staffid = event;
            this.getServices();
            this.listStaffServices();
        }
        updateSelectedValueService(event) {
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
        saveServiceStaff() {
            this.cnx.add_dataWithParamsOH('staff', '?staffId=', this.staffid.toString(), "&serviceId=", this.serviceid.toString(), "&servName=", this.servicename).subscribe(myStaff => {
            });
        }
        deleteFunction($event) {
            $event.preventDefault();
            //this.temp = this.rows.filter(entry => entry.id !== this.activeRow.id);
            this.cnx.del_data2Params('staff', 'serviceId', this.activeRow.programId, 'staffId', this.staffid.toString()).subscribe(myStaff => {
            });
            this.listStaffServices();
        }
    };
    StaffServicesComponent = __decorate([
        Component({
            selector: 'app-staff-services',
            templateUrl: './staff-services.component.html',
            styleUrls: ['./staff-services.component.css']
        })
    ], StaffServicesComponent);
    return StaffServicesComponent;
})();
export { StaffServicesComponent };
//# sourceMappingURL=staff-services.component.js.map