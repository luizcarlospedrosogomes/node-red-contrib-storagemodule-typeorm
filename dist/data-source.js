"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var flows_entity_1 = require("./flows.entity");
var library_entity_1 = require("./library.entity");
var entities = [flows_entity_1.Flows, library_entity_1.Library];
var types = ['sqlite', 'hana', 'postgres'];
var AppDataSource = function (settings) {
    settings = settings.dataSource;
    validate(settings);
    switch (settings.type) {
        case 'sqlite':
            return dataSourceSqlite(settings.name);
            break;
        case 'postgres':
            validateDataSourcePG(settings);
            return dataSourcePG(settings);
        default:
            break;
    }
};
exports.AppDataSource = AppDataSource;
var dataSourceSqlite = function (name) { return new typeorm_1.DataSource({
    type: "sqlite",
    database: name,
    synchronize: true,
    logging: false,
    entities: entities,
    migrations: [],
    subscribers: [],
}); };
var dataSourcePG = function (settings) { return new typeorm_1.DataSource({
    type: "postgres",
    host: settings.host,
    port: settings.port || 5432,
    username: settings.username,
    password: settings.password,
    database: settings.name,
    schema: settings.schema || 'public',
    synchronize: settings.synchronize || true,
    ssl: settings.ssl || true,
    entities: entities,
}); };
var validateDataSourcePG = function (settings) {
    var host = settings.host, username = settings.username, password = settings.password, name = settings.name, ssl = settings.ssl;
    if (!host) {
        throw new Error("The [host] field is required and cannot be empty.");
    }
    if (!username) {
        throw new Error("The [username] field is required and cannot be empty.");
    }
    if (!password) {
        throw new Error("The [password] field is required and cannot be empty.");
    }
    if (!name) {
        throw new Error("The [name] field is required and cannot be empty.");
    }
};
var validate = function (settings) {
    if (!settings.type) {
        throw new Error('[type] is required');
    }
    for (var index = 0; index < types.length; index++) {
        var element = types[index];
        if (!element) {
            throw new Error("type is out range ".concat(JSON.stringify(types)));
        }
    }
    if (!settings.name) {
        throw new Error('[name] is required');
    }
};
//# sourceMappingURL=data-source.js.map