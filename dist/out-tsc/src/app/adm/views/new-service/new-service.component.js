import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { service } from '../../models/sevice';
let NewServiceComponent = /** @class */ (() => {
    let NewServiceComponent = class NewServiceComponent {
        constructor(cnx, route, router, _location, toastService) {
            this.cnx = cnx;
            this.route = route;
            this.router = router;
            this._location = _location;
            this.toastService = toastService;
            this.isSaved = false;
            this.listTypes = [];
            this.isLoading = false;
            this.service = new service();
            this.isNew = true;
            this.isSaved = false;
        }
        ngOnInit() {
            this.serviceID = this.route.snapshot.params['programId'];
            this.listTypes = [
                { cod: 'Individual', value: 'Individual', content: '' },
                { cod: 'Group Registration Required', value: 'Group', content: '' }
            ];
            if (!this.serviceID) {
                this.serviceNew();
            }
            else {
                this.serviceEdit();
            }
        }
        serviceNew() {
            this.isNew = true;
            this.title = "New Service";
            this.nameButton = "Add";
        }
        serviceEdit() {
            this.isLoading = true;
            this.nameButton = "Edit";
            this.isNew = false;
            this.title = "Edit Service";
            this.cnx.get_dataID('program', '?programID=' + this.serviceID).subscribe(myService => {
                this.service = myService;
            });
        }
        saveService() {
            this.cnx.add_dataWithParams('program', '?progJson=', this.service).subscribe(myService => {
                switch (myService.toString().toLowerCase()) {
                    case 'saved':
                        this.toastService.success('Service saved successfully', this.title);
                        alert('Service saved successfully');
                        this.isSaved = true;
                        this.router.navigate(['/service']);
                        break;
                    case 'error':
                        this.toastService.error('An error occurred while trying to save the Service', this.title);
                        break;
                    default:
                        break;
                }
                ;
            });
        }
        cancelService() {
            this._location.back();
        }
        canDeactivate() {
            if (this.contextServiceForm.dirty) {
                if (!this.isSaved) {
                    return confirm('Your changes are unsaved!! Do you like to exit');
                }
                return true;
            }
            return true;
        }
    };
    __decorate([
        ViewChild('contextServiceForm', { static: false })
    ], NewServiceComponent.prototype, "contextServiceForm", void 0);
    NewServiceComponent = __decorate([
        Component({
            selector: 'app-new-service',
            templateUrl: './new-service.component.html',
            styleUrls: ['./new-service.component.css']
        })
    ], NewServiceComponent);
    return NewServiceComponent;
})();
export { NewServiceComponent };
//# sourceMappingURL=new-service.component.js.map