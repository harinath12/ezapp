import { __decorate } from "tslib";
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HammerConfig } from './hammer.config';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
let AppModule = /** @class */ (() => {
    let AppModule = class AppModule {
    };
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent
            ],
            imports: [
                BrowserModule,
                BrowserAnimationsModule,
                AppRoutingModule,
                FormsModule,
                HttpClientModule
            ],
            providers: [
                {
                    provide: HAMMER_GESTURE_CONFIG,
                    useClass: HammerConfig
                },
                {
                    provide: LocationStrategy,
                    useClass: HashLocationStrategy
                }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
})();
export { AppModule };
//# sourceMappingURL=app.module.js.map