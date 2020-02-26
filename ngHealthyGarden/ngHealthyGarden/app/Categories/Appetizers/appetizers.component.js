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
var core_1 = require("@angular/core");
var web_services_1 = require("../../web.services");
var AppetizersComponent = /** @class */ (function () {
    function AppetizersComponent(services) {
        this.services = services;
    }
    AppetizersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.services.getCategoryByNameWithDishe(this.categoryName).subscribe(function (data) {
            _this.category = data;
            console.log(JSON.stringify(data));
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AppetizersComponent.prototype, "categoryName", void 0);
    AppetizersComponent = __decorate([
        core_1.Component({
            selector: 'appetizers',
            templateUrl: './appetizers.component.html',
            styleUrls: ['./appetizers.component.css']
        }),
        __metadata("design:paramtypes", [web_services_1.WebServices])
    ], AppetizersComponent);
    return AppetizersComponent;
}());
exports.AppetizersComponent = AppetizersComponent;
//# sourceMappingURL=appetizers.component.js.map