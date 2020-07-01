import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { location } from '../../models/schemas';
let NewLocationComponent = /** @class */ (() => {
    let NewLocationComponent = class NewLocationComponent {
        constructor(cnx, route, router, _location, toastService) {
            this.cnx = cnx;
            this.route = route;
            this.router = router;
            this._location = _location;
            this.toastService = toastService;
            this.temp = [];
            this.myDate = new Date();
            this.department = [];
            this.departmentMain = [];
            this.listStates = [];
            this.isLoading = false;
            this.location = new location();
            this.isNew = true;
        }
        ngOnInit() {
            this.loadDepartment();
            this.fillStates();
            this.locationId = this.route.snapshot.params['locationID'];
            if (!this.locationId) {
                this.locationNew();
            }
            else {
                this.locationEdit();
            }
        }
        onActivate(event) {
            this.activeRow = event.row;
        }
        locationNew() {
            this.isNew = true;
            this.location.locationId = 0;
            this.location.active = true;
            this.title = "New Location";
            this.nameButton = "Add";
        }
        locationEdit() {
            this.isLoading = true;
            this.nameButton = "Edit";
            this.isNew = false;
            this.title = "Edit Location";
            this.cnx.get_dataID('location', '?locationId=' + this.locationId).subscribe(myLocation => {
                this.location = myLocation[0];
            });
            this.isLoading = false;
        }
        loadDepartment() {
            this.cnx.get_data('department').subscribe(myDepts => {
                this.department = myDepts;
                console.log(myDepts);
                // prepara los datos para ser leidos en el combo
                this.departmentMain = myDepts.filter(DEP => DEP.DepartmentID);
            });
        }
        success(message, title) {
            this.toastService.success(message, title);
        }
        error(message, title) {
            this.toastService.error(message, title);
        }
        updateSelectedValueDepartment(event) {
            this.location.departmentId = event;
        }
        saveClient() {
            try {
                this.cnx.add_dataWithParams('location', '?locJson=', this.location).subscribe(myLocation => {
                    console.log(myLocation.toString());
                    switch (myLocation.toString()) {
                        case 'Saved':
                            alert('Location saved successfully');
                            this.toastService.success('Location saved successfully', this.title);
                            this.router.navigate(['/location']);
                            break;
                        case 'error':
                            this.toastService.error('An error occurred while trying to save the List', this.title);
                            break;
                        default:
                            break;
                    }
                });
            }
            catch (error) {
            }
        }
        cancelLocation() {
            this._location.back();
        }
        fillStates() {
            this.listStates = [
                { cod: "Alabama", value: "Alabama", content: '' },
                { cod: "Alaska", value: "Alaska", content: '' },
                { cod: "Arizona", value: "Arizona", content: '' },
                { cod: "Arkansas", value: "Arkansas", content: '' },
                { cod: "California", value: "California", content: '' },
                { cod: "Colorado", value: "Colorado", content: '' },
                { cod: "Connecticut", value: "Connecticut", content: '' },
                { cod: "Delaware", value: "Delaware", content: '' },
                { cod: "Florida", value: "Florida", content: '' },
                { cod: "Georgia", value: "Georgia", content: '' },
                { cod: "Hawaii", value: "Hawaii", content: '' },
                { cod: "Idaho", value: "Idaho", content: '' },
                { cod: "Illinois", value: "Illinois", content: '' },
                { cod: "Indiana", value: "Indiana", content: '' },
                { cod: "Iowa", value: "Iowa", content: '' },
                { cod: "Kansas", value: "Kansas", content: '' },
                { cod: "Kentucky", value: "Kentucky", content: '' },
                { cod: "Louisiana", value: "Louisiana", content: '' },
                { cod: "Maine", value: "Maine", content: '' },
                { cod: "Maryland", value: "Maryland", content: '' },
                { cod: "Massachusetts", value: "Massachusetts", content: '' },
                { cod: "Michigan", value: "Michigan", content: '' },
                { cod: "Minnesota", value: "Minnesota", content: '' },
                { cod: "Mississippi", value: "Mississippi", content: '' },
                { cod: "Missouri", value: "Missouri", content: '' },
                { cod: "Montana", value: "Montana", content: '' },
                { cod: "Nebraska", value: "Nebraska", content: '' },
                { cod: "Nevada", value: "Nevada", content: '' },
                { cod: "New Hampshire", value: "New Hampshire", content: '' },
                { cod: "New Jersey", value: "New Jersey", content: '' },
                { cod: "New Mexico", value: "New Mexico", content: '' },
                { cod: "New York", value: "New York", content: '' },
                { cod: "North Carolina", value: "North Carolina", content: '' },
                { cod: "North Dakota", value: "North Dakota", content: '' },
                { cod: "Ohio", value: "Ohio", content: '' },
                { cod: "Oklahoma", value: "Oklahoma", content: '' },
                { cod: "Oregon", value: "Oregon", content: '' },
                { cod: "Pennsylvania", value: "Pennsylvania", content: '' },
                { cod: "Rhode Island", value: "Rhode Island", content: '' },
                { cod: "South Carolina", value: "South Carolina", content: '' },
                { cod: "South Dakota", value: "South Dakota", content: '' },
                { cod: "Tennessee", value: "Tennessee", content: '' },
                { cod: "Texas", value: "Texas", content: '' },
                { cod: "Utah", value: "Utah", content: '' },
                { cod: "Vermont", value: "Vermont", content: '' },
                { cod: "Virginia", value: "Virginia", content: '' },
                { cod: "Washington", value: "Washington", content: '' },
                { cod: "West Virginia", value: "West Virginia", content: '' },
                { cod: "Wisconsin", value: "Wisconsin", content: '' },
                { cod: "Wyoming", value: "Wyoming }", content: '' }
            ];
        }
    };
    __decorate([
        ViewChild('contextForm', { static: false })
    ], NewLocationComponent.prototype, "locationForm", void 0);
    NewLocationComponent = __decorate([
        Component({
            selector: 'app-new-location',
            templateUrl: './new-location.component.html',
            styleUrls: ['./new-location.component.css']
        })
    ], NewLocationComponent);
    return NewLocationComponent;
})();
export { NewLocationComponent };
//# sourceMappingURL=new-location.component.js.map