import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "./toast/toast.component";
import { ToastService } from "../services/toast.service";
let ModulesModule = /** @class */ (() => {
    let ModulesModule = class ModulesModule {
    };
    ModulesModule = __decorate([
        NgModule({
            declarations: [ToastComponent],
            imports: [
                CommonModule
            ],
            providers: [ToastService],
            exports: [ToastComponent]
        })
    ], ModulesModule);
    return ModulesModule;
})();
export { ModulesModule };
//# sourceMappingURL=modules.module.js.map