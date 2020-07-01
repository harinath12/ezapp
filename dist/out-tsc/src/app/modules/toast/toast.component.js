import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { AlertType } from 'src/app/adm/models/alert';
let ToastComponent = /** @class */ (() => {
    let ToastComponent = class ToastComponent {
        constructor(toastService) {
            this.toastService = toastService;
            this.alerts = [];
        }
        ngOnInit() {
            this.subscription = this.toastService.onAlert(this.id)
                .subscribe(alert => {
                if (!alert.message) {
                    // clear alerts when an empty alert is received
                    this.alerts = [];
                    return;
                }
                // add alert to array
                this.alerts.push(alert);
                this.message = alert.message;
                this.title = alert.title;
                this.tipoAlert = this.cssClass(alert);
                $('.toast').toast('show');
            });
        }
        ngOnDestroy() {
            // unsubscribe to avoid memory leaks
            this.subscription.unsubscribe();
        }
        removeAlert(alert) {
            // remove specified alert from array
            this.alerts = this.alerts.filter(x => x !== alert);
        }
        cssClass(alert) {
            if (!alert) {
                return;
            }
            // return css class based on alert type
            switch (alert.type) {
                case AlertType.Success:
                    return 'alert alert-success';
                case AlertType.Error:
                    return 'alert alert-danger';
                case AlertType.Info:
                    return 'alert alert-info';
                case AlertType.Warning:
                    return 'alert alert-warning';
            }
        }
    };
    __decorate([
        Input()
    ], ToastComponent.prototype, "id", void 0);
    ToastComponent = __decorate([
        Component({
            selector: 'app-toast',
            templateUrl: './toast.component.html',
            styleUrls: ['./toast.component.css']
        })
    ], ToastComponent);
    return ToastComponent;
})();
export { ToastComponent };
//# sourceMappingURL=toast.component.js.map