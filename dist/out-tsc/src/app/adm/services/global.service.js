import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let GlobalService = /** @class */ (() => {
    let GlobalService = class GlobalService {
        constructor() {
            this.domain = 'http://alberta-api.ezsoftco.com';
        }
    };
    GlobalService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], GlobalService);
    return GlobalService;
})();
export { GlobalService };
//# sourceMappingURL=global.service.js.map