import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Variables, Routes } from './globalVariables';
import { map } from "rxjs/operators";
let ConnexionService = /** @class */ (() => {
    let ConnexionService = class ConnexionService {
        constructor(http) {
            this.http = http;
            this.mostrarMensaje = false;
            this.urlBase = Variables.domain + '/';
            this.urlBaseEzgoh = Variables.domainEzgoh + '/';
        }
        showMessage(variable = true) {
            this.mostrarMensaje = variable;
        }
        get_dataEzgoh(path) {
            let subPath = Routes[path];
            return this.http.get(this.urlBaseEzgoh + subPath).pipe(map(response => response));
        }
        get_dataIDEzgoh(path, id) {
            let subPath = Routes[path];
            return this.http.get(this.urlBaseEzgoh + subPath + id).pipe(map(response => response));
        }
        get_data(path) {
            let subPath = Routes[path];
            return this.http.get(this.urlBase + subPath).pipe(map(response => response));
        }
        get_dataID(path, id) {
            let subPath = Routes[path];
            return this.http.get(this.urlBase + subPath + id).pipe(map(response => response));
        }
        get_dataWithParams(path, params) {
            let subPath = Routes[path];
            console.log(this.urlBase + subPath + params);
            return this.http.get(this.urlBase + subPath + params).pipe(map(response => response));
        }
        add_data(path, object) {
            let subPath = Routes[path];
            return this.http.post(this.urlBase + subPath + '/', object).pipe(map(response => response));
        }
        edit_data(path, object) {
            let subPath = Routes[path];
            let xid = object['id'];
            return this.http.put(this.urlBase + subPath + "/" + xid + "/", object).pipe(map(res => res));
        }
        del_data(path, id) {
            let subPath = Routes[path];
            return this.http.delete(this.urlBase + subPath + '/' + id).pipe(map(response => response));
        }
        del_data2(path, params, id) {
            let subPath = Routes[path];
            return this.http.delete(this.urlBase + subPath + '?' + params + '=' + id).pipe(map(response => response));
        }
        del_data2Params(path, param1, id1, param2, id2) {
            let subPath = Routes[path];
            console.log('entra');
            console.log(this.urlBase + subPath + '?' + param1 + '=' + id1 + "&" + param2 + "=" + id2);
            return this.http.delete(this.urlBase + subPath + '?' + param1 + '=' + id1 + "&" + param2 + "=" + id2).pipe(map(response => response));
        }
        add_dataWithParams(path, params, object) {
            let subPath = Routes[path];
            console.log(this.urlBase + subPath + params + JSON.stringify(object));
            return this.http.post(this.urlBase + subPath + params + JSON.stringify(object), "").pipe(map(response => response));
        }
        add_dataWithParamsOH(path, param1, valueparam1, param2, valueparam2, param3, valueparam3) {
            let subPath = Routes[path];
            //console.log(this.urlBase + subPath + param1 + valueparam1 + param2 + valueparam2 + param3 + valueparam3);
            return this.http.post(this.urlBase + subPath + param1 + valueparam1 + param2 + valueparam2 + param3 + valueparam3, "").pipe(map(response => response));
        }
        add_dataWithParams3P(path, param1, object, param2, valueparam2, param3, valueparam3) {
            let subPath = Routes[path];
            console.log('as� sale: ', this.urlBase + subPath + param1 + JSON.stringify(object) + param2 + valueparam2 + param3 + valueparam3);
            //console.log(this.urlBase + subPath + param1 + valueparam1 + param2 + valueparam2 + param3 + valueparam3);
            return this.http.post(this.urlBase + subPath + param1 + JSON.stringify(object) + param2 + valueparam2 + param3 + valueparam3, "").pipe(map(response => response));
        }
        add_dataWithParams2P(path, param1, object, param2, valueparam2) {
            let subPath = Routes[path];
            console.log(this.urlBase + subPath + param1 + object + param2 + valueparam2);
            return this.http.post(this.urlBase + subPath + param1 + JSON.stringify(object) + param2 + valueparam2, "").pipe(map(response => response));
        }
    };
    ConnexionService = __decorate([
        Injectable({
            providedIn: 'root'
        })
    ], ConnexionService);
    return ConnexionService;
})();
export { ConnexionService };
//# sourceMappingURL=connexion.service.js.map