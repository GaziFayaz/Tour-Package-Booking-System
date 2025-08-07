"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackagesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const packages_entity_1 = require("./packages.entity");
const packages_service_1 = require("./packages.service");
const packages_controller_1 = require("./packages.controller");
let PackagesModule = class PackagesModule {
};
exports.PackagesModule = PackagesModule;
exports.PackagesModule = PackagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                packages_entity_1.Package,
                packages_entity_1.Slot,
                packages_entity_1.PackageFare,
                packages_entity_1.AdultInstallment,
                packages_entity_1.ChildInstallment,
                packages_entity_1.InfantInstallment,
                packages_entity_1.AdultAddon,
                packages_entity_1.ChildAddon,
                packages_entity_1.InfantAddon
            ])
        ],
        controllers: [
            packages_controller_1.PackagesController,
            packages_controller_1.SlotsController,
            packages_controller_1.PackageFaresController,
            packages_controller_1.AdultInstallmentsController,
            packages_controller_1.ChildInstallmentsController,
            packages_controller_1.InfantInstallmentsController,
            packages_controller_1.AdultAddonsController,
            packages_controller_1.ChildAddonsController,
            packages_controller_1.InfantAddonsController
        ],
        providers: [packages_service_1.PackagesService],
        exports: [packages_service_1.PackagesService, typeorm_1.TypeOrmModule],
    })
], PackagesModule);
//# sourceMappingURL=packages.module.js.map