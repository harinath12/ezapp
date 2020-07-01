import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { location } from '../../models/schemas';
let LocationListComponent = /** @class */ (() => {
    let LocationListComponent = class LocationListComponent {
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
            this.location = new location();
        }
        obtenerDatos(state) {
            this.isLoading = true;
            this.cnx.get_data('location').subscribe(myLoc => {
                this.rows = myLoc;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1500);
                this.temp = myLoc.map((prop, key) => {
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
            this.router.navigate(['/edit-location/' + this.activeRow.locationId]);
        }
        deleteFunction(event) {
            event.preventDefault();
            if (confirm('Are you sure you want to remove ' + this.activeRow.locationName + ' location')) {
                let eliminar;
                for (let i = 0; i < this.temp.length; i++) {
                    if (this.activeRow.locationId == this.temp[i].locationId) {
                        eliminar = i;
                        break;
                    }
                }
                this.temp.splice(eliminar, 1);
                this.temp = [...this.temp];
                this.success('Location ' + this.activeRow.locationName + ' successfully removed.', 'Alberta Location');
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
    LocationListComponent = __decorate([
        Component({
            selector: 'app-location-list',
            templateUrl: './location-list.component.html',
            styleUrls: ['../../adm.component.css', './location-list.component.css']
        })
    ], LocationListComponent);
    return LocationListComponent;
})();
export { LocationListComponent };
//# sourceMappingURL=location-list.component.js.map