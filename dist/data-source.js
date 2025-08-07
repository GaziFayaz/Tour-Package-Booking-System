"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.default = new typeorm_1.DataSource({
    type: 'mysql',
    host: configService.get('DB_HOST') || 'localhost',
    port: +configService.get('DB_PORT') || 3306,
    username: configService.get('DB_USERNAME') || 'root',
    password: configService.get('DB_PASSWORD') || 'password',
    database: configService.get('DB_DATABASE') || 'nestjs_app',
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
    synchronize: false,
});
//# sourceMappingURL=data-source.js.map