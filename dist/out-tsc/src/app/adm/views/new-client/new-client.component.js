import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { client } from '../../models/client';
import { appt } from '../../models/appt';
let NewClientComponent = /** @class */ (() => {
    let NewClientComponent = class NewClientComponent {
        constructor(cnx, route, router, _location, toastService) {
            this.cnx = cnx;
            this.route = route;
            this.router = router;
            this._location = _location;
            this.toastService = toastService;
            this.temp = [];
            this.myDate = new Date();
            this.isSaved = false;
            this.isLoading = false;
            this.client = new client();
            this.isNew = true;
            this.appt = new appt();
            this.isSaved = false;
        }
        ngOnInit() {
            this.clientID = this.route.snapshot.params['clientID'];
            if (!this.clientID) {
                this.clientNew();
            }
            else {
                this.clientEdit();
            }
        }
        onActivate(event) {
            this.activeRow = event.row;
        }
        clientNew() {
            this.isNew = true;
            this.title = "New Client";
            this.nameButton = "Add";
            this.isSaved = false;
        }
        clientEdit() {
            this.isLoading = true;
            this.nameButton = "Edit";
            this.isNew = false;
            this.isSaved = true;
            this.title = "Edit Client";
            this.cnx.get_dataID('client', '?clientId=' + this.clientID).subscribe(myClient => {
                this.client = myClient;
            });
            this.cnx.get_dataWithParams('appointment', '?clientId=' + this.clientID).subscribe(myAds => {
                this.rows = myAds;
                this.numberAppts = this.rows.length;
                this.temp = myAds.map((prop, key) => {
                    return Object.assign(Object.assign({}, prop), { id: key });
                });
            });
            this.isLoading = false;
        }
        canDeactivate() {
            if (this.contextGroupForm.dirty) {
                if (!this.isSaved) {
                    return confirm('Your changes are unsaved!! Do you like to exit');
                }
                return true;
            }
            return true;
        }
        saveClient() {
            this.cnx.add_dataWithParams('client', '?clJson=', this.client).subscribe(myClient => {
                console.log('res: ', myClient);
                this.toastService.success('Client saved successfully', this.title);
                alert('Client saved successfully');
                this.router.navigate(['/client']);
            });
        }
        cancelGroup() {
            this._location.back();
        }
    };
    __decorate([
        ViewChild('contextGroupForm', { static: false })
    ], NewClientComponent.prototype, "contextGroupForm", void 0);
    NewClientComponent = __decorate([
        Component({
            selector: 'app-new-client',
            templateUrl: './new-client.component.html',
            styleUrls: ['../../adm.component.css', './new-client.component.css']
        })
    ], NewClientComponent);
    return NewClientComponent;
})();
export { NewClientComponent };
//# sourceMappingURL=new-client.component.js.map