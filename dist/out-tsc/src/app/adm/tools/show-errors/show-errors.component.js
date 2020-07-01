import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let ShowErrorsComponent = /** @class */ (() => {
    var ShowErrorsComponent_1;
    let ShowErrorsComponent = ShowErrorsComponent_1 = class ShowErrorsComponent {
        constructor() { }
        ngOnInit() {
        }
        shouldShowErrors() {
            return this.control &&
                this.control.errors &&
                (this.control.dirty || this.control.touched);
        }
        listOfErrors() {
            //console.log('esto mandamos al directiva show erros:', this.control);
            return Object.keys(this.control.errors)
                .map(field => this.getMessage(field, this.control.errors[field]));
        }
        getMessage(type, params) {
            return ShowErrorsComponent_1.errorMessages[type](params);
        }
    };
    ShowErrorsComponent.errorMessages = {
        'required': () => 'This field is required',
        'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
        'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
        'pattern': (params) => 'The required pattern is: ' + 'mail@ejemplo.com',
        'email': () => 'The required pattern is: mail@ejemplo.com',
        'years': (params) => params.message,
        'countryCity': (params) => params.message,
        'crisCode': (params) => params.message,
        'telephoneNumbers': (params) => params.message,
        'telephoneNumber': (params) => params.message
    };
    __decorate([
        Input()
    ], ShowErrorsComponent.prototype, "control", void 0);
    ShowErrorsComponent = ShowErrorsComponent_1 = __decorate([
        Component({
            selector: 'app-show-errors',
            templateUrl: './show-errors.component.html',
            styleUrls: ['./show-errors.component.css']
        })
    ], ShowErrorsComponent);
    return ShowErrorsComponent;
})();
export { ShowErrorsComponent };
//# sourceMappingURL=show-errors.component.js.map