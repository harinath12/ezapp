import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertType } from '../adm/models/alert';
import { filter } from 'rxjs/operators';
import { NavigationStart } from '@angular/router';
let ToastService = /** @class */ (() => {
    let ToastService = class ToastService {
        constructor(router) {
            this.router = router;
            this.subject = new Subject();
            this.keepAfterRouteChange = false;
            // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
            this.router.events.subscribe(event => {
                if (event instanceof NavigationStart) {
                    if (this.keepAfterRouteChange) {
                        // only keep for a single route change
                        this.keepAfterRouteChange = false;
                    }
                    else {
                        // clear alert messages
                        this.clear();
                    }
                }
            });
        }
        // enable subscribing to alerts observable
        onAlert(alertId) {
            return this.subject.asObservable().pipe(filter(x => x && x.alertId === alertId));
        }
        // convenience methods
        success(message, title, alertId) {
            this.alert(new Alert({ message, title, type: AlertType.Success, alertId }));
        }
        error(message, title, alertId) {
            this.alert(new Alert({ message, title, type: AlertType.Error, alertId }));
        }
        info(message, title, alertId) {
            this.alert(new Alert({ message, title, type: AlertType.Info, alertId }));
        }
        warn(message, title, alertId) {
            this.alert(new Alert({ message, title, type: AlertType.Warning, alertId }));
        }
        // main alert method    
        alert(alert) {
            this.keepAfterRouteChange = alert.keepAfterRouteChange;
            this.subject.next(alert);
        }
        // clear alerts
        clear(alertId) {
            this.subject.next(new Alert({ alertId }));
        }
    };
    ToastService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], ToastService);
    return ToastService;
})();
export { ToastService };
//# sourceMappingURL=toast.service.js.map