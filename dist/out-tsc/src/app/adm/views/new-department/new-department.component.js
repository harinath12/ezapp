import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { department } from '../../models/department';
let NewDepartmentComponent = /** @class */ (() => {
    let NewDepartmentComponent = class NewDepartmentComponent {
        constructor(cnx, route, router) {
            this.cnx = cnx;
            this.route = route;
            this.router = router;
            this.temp = [];
            this.myDate = new Date();
            this.isLoading = false;
            this.department = new department();
            this.isNew = true;
        }
        ngOnInit() {
            this.departmentId = this.route.snapshot.params['departmentID'];
            if (!this.departmentId) {
                this.departmentNew();
            }
            else {
                this.departmentEdit();
            }
        }
        onActivate(event) {
            this.activeRow = event.row;
        }
        departmentNew() {
            this.isNew = true;
            this.department.DepartmentID = 0;
            this.title = 'New Department';
            this.nameButton = 'Add';
        }
        departmentEdit() {
            this.isLoading = true;
            this.nameButton = 'Edit';
            this.isNew = false;
            this.title = 'Edit Department';
            this.cnx.get_dataID('department', '?departmentId=' + this.departmentId).subscribe(myDepartment => {
                this.department = myDepartment;
                console.log('this.department', this.department);
            });
            this.isLoading = false;
        }
        saveClient() {
            this.department.ModUser = 46;
            console.log(this.department);
            try {
                this.cnx.add_dataWithParams('department', 'Department?deptJson=', this.department).subscribe(myDepartment => {
                    console.log(myDepartment);
                });
            }
            catch (error) {
            }
        }
    };
    NewDepartmentComponent = __decorate([
        Component({
            selector: 'app-new-department',
            templateUrl: './new-department.component.html',
            styleUrls: ['./new-department.component.css']
        })
    ], NewDepartmentComponent);
    return NewDepartmentComponent;
})();
export { NewDepartmentComponent };
//# sourceMappingURL=new-department.component.js.map