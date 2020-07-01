import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AdmComponent = /** @class */ (() => {
    let AdmComponent = class AdmComponent {
        constructor(cnx) {
            this.cnx = cnx;
        }
        ngOnInit() {
            this.cnx.showMessage(false);
        }
    };
    AdmComponent = __decorate([
        Component({
            selector: 'app-adm',
            templateUrl: './adm.component.html',
            styleUrls: ['./adm.component.css']
        })
    ], AdmComponent);
    return AdmComponent;
})();
export { AdmComponent };
//# sourceMappingURL=adm.component.js.map