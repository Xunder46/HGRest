"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var WebServices = /** @class */ (function () {
    function WebServices(http) {
        this.http = http;
        this.baseUrl = "https://localhost:44384/api";
    }
    WebServices.prototype.getCategories = function () {
        return this.http.get(this.baseUrl + '/menu');
    };
    WebServices.prototype.getCategoryByNameWithDishe = function (category) {
        return this.http.get(this.baseUrl + '/menu/' + category);
    };
    WebServices = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], WebServices);
    return WebServices;
}());
exports.WebServices = WebServices;
//# sourceMappingURL=web.services.js.map