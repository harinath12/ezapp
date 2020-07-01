import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { group } from '../../models/schemas';
let NewGroupComponent = /** @class */ (() => {
    let NewGroupComponent = class NewGroupComponent {
        constructor(cnx, route, router, _location, toastService) {
            this.cnx = cnx;
            this.route = route;
            this.router = router;
            this._location = _location;
            this.toastService = toastService;
            this.isSaved = false;
            this.companyService = [];
            this.group = new group();
            this.isNew = true;
            this.isSaved = false;
        }
        /**
         * api/Group?groupId={groupId}
         */
        ngOnInit() {
            this.groupPermisionsView = [];
            this.groupPermisionsEdit = [];
            this.groupId = this.route.snapshot.params['groupID'];
            // extrae de la bd los datos CompanyServices
            this.cnx.get_data('companyServices').subscribe(myCompanyServices => {
                this.companyService = myCompanyServices;
                for (let i = 0; i < myCompanyServices.length; i++) {
                    this.groupPermisionsView.push(false);
                    this.groupPermisionsEdit.push(false);
                }
                if (!this.groupId) {
                    this.groupNew();
                }
                else {
                    this.groupEdit();
                }
            }, error => {
                console.log('Error: ', error);
            });
            // extrae de la bd los datos GROUP
        }
        groupNew() {
            this.isNew = true;
            this.group = new group;
            this.group.groupID = 0;
            this.group.groupPermisions = new Array();
            this.title = "New Group";
            this.nameButton = "Add";
        }
        success(message, title) {
            this.toastService.success(message, title);
        }
        error(message, title) {
            this.toastService.error(message, title);
        }
        groupEdit() {
            this.nameButton = "Edit";
            this.isNew = false;
            this.title = "Edit Group";
            this.cnx.get_dataID('group', '?groupId=' + this.groupId).subscribe(myGroup => {
                this.group = myGroup;
                for (let i = 0; i < this.companyService.length; i++) {
                    let view = false;
                    let edit = false;
                    for (let j = 0; j < this.group.groupPermisions.length; j++) {
                        if (this.companyService[i].serviceId == this.group.groupPermisions[j].key) {
                            view = this.group.groupPermisions[j].view;
                            edit = this.group.groupPermisions[j].edit;
                            break;
                        }
                    }
                    this.groupPermisionsView.shift();
                    this.groupPermisionsEdit.shift();
                    this.groupPermisionsView.push(view);
                    this.groupPermisionsEdit.push(edit);
                }
            });
        }
        saveGroup() {
            //this.group.delLocations = [];
            //this.group.selLocations = [];
            //this.group.modUser = 0;
            for (let i = 0; i < this.companyService.length; i++) {
                if (!this.isNew) {
                    this.group.groupPermisions.shift();
                }
                this.group.groupPermisions.push({ key: this.companyService[i].serviceId, view: this.groupPermisionsView[i], edit: this.groupPermisionsEdit[i] });
            }
            this.cnx.add_dataWithParams('group', '?groupDatajson=', this.group).subscribe(myGroup => {
                switch (myGroup.toString()) {
                    case 'saved':
                        alert('Group saved successfully');
                        this.toastService.success('Group saved successfully', this.title);
                        this.router.navigate(['/group']);
                        break;
                    case 'error':
                        this.toastService.error('An error occurred while trying to save the Group', this.title);
                        break;
                    default:
                        break;
                }
            });
        }
        cancelGroup() {
            this._location.back();
        }
        canDeactivate() {
            if (this.groupForm.dirty) {
                if (!this.isSaved) {
                    return confirm('Your changes are unsaved!! Do you like to exit');
                }
                return true;
            }
            return true;
        }
    };
    __decorate([
        ViewChild('groupForm', { static: false })
    ], NewGroupComponent.prototype, "groupForm", void 0);
    NewGroupComponent = __decorate([
        Component({
            selector: 'app-new-group',
            templateUrl: './new-group.component.html',
            styleUrls: ['./new-group.component.css']
        })
    ], NewGroupComponent);
    return NewGroupComponent;
})();
export { NewGroupComponent };
//# sourceMappingURL=new-group.component.js.map