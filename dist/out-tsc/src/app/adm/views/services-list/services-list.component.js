import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { service } from '../../models/sevice';
let ServicesListComponent = /** @class */ (() => {
    let ServicesListComponent = class ServicesListComponent {
        constructor(cnx, router, toastService) {
            this.cnx = cnx;
            this.router = router;
            this.toastService = toastService;
            this.entries = 10;
            this.selected = [];
            this.temp = [];
            this.isLoading = false;
            this.rows = new Array();
            this.service = new service();
        }
        obtenerDatos() {
            this.isLoading = true;
            this.cnx.get_data('program').subscribe(myAds => {
                this.rows = myAds;
                this.temp = myAds.map((prop, key) => {
                    return Object.assign(Object.assign({}, prop), { id: key });
                });
            });
            this.isLoading = false;
        }
        entriesChange($event) {
            this.entries = $event.target.value;
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
        refreshFunction(event) {
            event.preventDefault();
            this.obtenerDatos();
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
        onSelect($event) {
        }
        onActivate(event) {
            this.activeRow = event.row;
        }
        editFunction($event) {
            $event.preventDefault();
            this.router.navigate(['/edit-service/' + this.activeRow.programId]);
        }
        deleteFunction($event) {
            $event.preventDefault();
            this.cnx.del_data2('program', 'programId', this.activeRow.programId).subscribe(myService => {
            });
        }
        ngOnInit() {
            this.obtenerDatos();
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
    ServicesListComponent = __decorate([
        Component({
            selector: 'app-services-list',
            templateUrl: './services-list.component.html',
            styleUrls: ['../../adm.component.css', './services-list.component.css']
        })
    ], ServicesListComponent);
    return ServicesListComponent;
})();
export { ServicesListComponent };
//# sourceMappingURL=services-list.component.js.map