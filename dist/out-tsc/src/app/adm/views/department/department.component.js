import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { department } from '../../models/department';
let DepartmentComponent = /** @class */ (() => {
    let DepartmentComponent = class DepartmentComponent {
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
            this.department = new department();
        }
        obtenerDatos(state) {
            this.isLoading = true;
            this.cnx.get_data('department').subscribe(myDep => {
                this.rows = myDep;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1500);
                this.temp = myDep.map((prop, key) => {
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
            this.router.navigate(['/edit-department/' + this.activeRow.DepartmentID]);
        }
        deleteFunction(event) {
            event.preventDefault();
            if (confirm('Are you sure you want to remove ' + this.activeRow.DepartmentName + ' department')) {
                let eliminar;
                for (let i = 0; i < this.temp.length; i++) {
                    if (this.activeRow.DepartmentID == this.temp[i].DepartmentID) {
                        eliminar = i;
                        break;
                    }
                }
                this.temp.splice(eliminar, 1);
                this.temp = [...this.temp];
                this.success('Department ' + this.activeRow.DepartmentName + ' successfully removed.', 'Alberta Department');
                // this.temp = this.rows.filter(entry => entry.id !== this.activeRow.id);
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
    };
    DepartmentComponent = __decorate([
        Component({
            selector: 'app-department',
            templateUrl: './department.component.html',
            styleUrls: ['../../adm.component.css', './department.component.css']
        })
    ], DepartmentComponent);
    return DepartmentComponent;
})();
export { DepartmentComponent };
//# sourceMappingURL=department.component.js.map