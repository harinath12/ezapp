import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let DeactivateGuardService = /** @class */ (() => {
    let DeactivateGuardService = class DeactivateGuardService {
        canDeactivate(component) {
            return component.canDeactivate && component.canDeactivate();
        }
        constructor() { }
    };
    DeactivateGuardService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], DeactivateGuardService);
    return DeactivateGuardService;
})();
export { DeactivateGuardService };
//# sourceMappingURL=deactivate-guard.service.js.map