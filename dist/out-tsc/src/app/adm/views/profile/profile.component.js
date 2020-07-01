import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProfileComponent = /** @class */ (() => {
    let ProfileComponent = class ProfileComponent {
        constructor(toastService) {
            this.toastService = toastService;
        }
        ngOnInit() {
        }
        success(message, title) {
            this.toastService.success(message, title);
        }
        error(message, title) {
            this.toastService.error(message, title);
        }
        info(message, title) {
            this.toastService.info(message, title);
        }
        warn(message, title) {
            this.toastService.warn(message, title);
        }
        clear() {
            this.toastService.clear();
        }
    };
    ProfileComponent = __decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        })
    ], ProfileComponent);
    return ProfileComponent;
})();
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map