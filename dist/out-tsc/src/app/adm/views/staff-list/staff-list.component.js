import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { staff } from '../../models/staff';
let StaffListComponent = /** @class */ (() => {
    let StaffListComponent = class StaffListComponent {
        constructor(cnx, router, toastService) {
            this.cnx = cnx;
            this.router = router;
            this.toastService = toastService;
            this.entries = 10;
            this.status = true;
            this.selected = [];
            this.temp = [];
            this.isLoading = true;
            this.rows = new Array();
            this.staff = new staff();
        }
        obtenerDatos(state) {
            this.isLoading = true;
            this.cnx.get_dataWithParams('staff', '?searchParamsJson={active:' + state + '}').subscribe(myAds => {
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
        entriesChange($event) {
            this.entries = $event.target.value;
        }
        statusChange($event) {
            this.status = $event.target.value;
            this.obtenerDatos(this.status);
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
                        }
                        catch (error) {
                            console.log(d[key], error);
                        }
                    }
                }
                return false;
            });
        }
        onSelect($event) {
        }
        onActivate(event) {
            this.activeRow = event.row;
        }
        editFunction($event) {
            $event.preventDefault();
            this.router.navigate(['/edit-staff/' + this.activeRow.staffID]);
        }
        deleteFunction(event) {
            event.preventDefault();
            if (confirm('Are you sure you want to remove ' + this.activeRow.lastName + ' ' + this.activeRow.firstName + ' staff')) {
                let eliminar;
                for (let i = 0; i < this.temp.length; i++) {
                    if (this.activeRow.staffID == this.temp[i].staffID) {
                        eliminar = i;
                        break;
                    }
                }
                this.temp.splice(eliminar, 1);
                this.temp = [...this.temp];
                this.success('User ' + this.activeRow.userName + ' successfully removed.', 'Alberta Staff');
                //this.temp = this.rows.filter(entry => entry.id !== this.activeRow.id);
            }
        }
        refreshFunction(event) {
            event.preventDefault();
            this.obtenerDatos(this.status);
        }
        exportFunction(event) {
            event.preventDefault();
            this.error('Insufficient disk space', 'Alberta Export');
        }
        success(message, title) {
            this.toastService.success(message, title);
        }
        error(message, title) {
            this.toastService.error(message, title);
        }
        ngOnInit() {
            this.obtenerDatos(this.status);
        }
        permisoGenerico(nc) {
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
    };
    StaffListComponent = __decorate([
        Component({
            selector: 'app-staff-list',
            templateUrl: './staff-list.component.html',
            styleUrls: ['../../adm.component.css', './staff-list.component.css']
        })
    ], StaffListComponent);
    return StaffListComponent;
})();
export { StaffListComponent };
//# sourceMappingURL=staff-list.component.js.map