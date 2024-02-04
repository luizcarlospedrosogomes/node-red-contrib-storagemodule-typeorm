"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveLibraryEntry = exports.getLibraryEntry = exports.saveSettings = exports.getSettings = exports.saveCredentials = exports.saveFlows = exports.getCredentials = exports.getFlows = exports.init = void 0;
var data_source_1 = require("./data-source");
var flows_entity_1 = require("./flows.entity");
var library_entity_1 = require("./library.entity");
var connection = null;
var init = function (settings) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, data_source_1.AppDataSource)(settings).initialize()];
            case 1:
                connection = _a.sent();
                initialize();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.init = init;
var initialize = function () { return __awaiter(void 0, void 0, void 0, function () {
    var flows, flowsEntity, flowsRepository;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connection.manager.find(flows_entity_1.Flows)];
            case 1:
                flows = _a.sent();
                if (!(flows.length === 0)) return [3 /*break*/, 3];
                flowsEntity = new flows_entity_1.Flows();
                flowsEntity.flows = '[]';
                flowsEntity.settings = '{}';
                flowsEntity.credentials = '{}';
                flowsRepository = connection.getRepository(flows_entity_1.Flows);
                return [4 /*yield*/, flowsRepository.save(flowsEntity)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var getFlows = function () { return __awaiter(void 0, void 0, void 0, function () {
    var flows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connection.manager.find(flows_entity_1.Flows)];
            case 1:
                flows = _a.sent();
                if (flows.length === 0) {
                    return [2 /*return*/, []];
                }
                return [2 /*return*/, JSON.parse(flows[0].flows)];
        }
    });
}); };
exports.getFlows = getFlows;
var saveFlows = function (flows) { return __awaiter(void 0, void 0, void 0, function () {
    var flowsRepository, flowsToUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                flowsRepository = connection.getRepository(flows_entity_1.Flows);
                return [4 /*yield*/, flowsRepository.findOneBy({ id: 1 })];
            case 1:
                flowsToUpdate = _a.sent();
                flowsToUpdate.flows = JSON.stringify(flows);
                return [4 /*yield*/, flowsRepository.save(flowsToUpdate)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveFlows = saveFlows;
var getCredentials = function () { return __awaiter(void 0, void 0, void 0, function () {
    var flows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connection.manager.find(flows_entity_1.Flows)];
            case 1:
                flows = _a.sent();
                if (flows.length === 0) {
                    return [2 /*return*/, {}];
                }
                if (flows[0].credentials === null) {
                    return [2 /*return*/, {}];
                }
                return [2 /*return*/, JSON.parse(flows[0].credentials)];
        }
    });
}); };
exports.getCredentials = getCredentials;
var saveCredentials = function (credentials) { return __awaiter(void 0, void 0, void 0, function () {
    var flowsRepository, flowsToUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                flowsRepository = connection.getRepository(flows_entity_1.Flows);
                return [4 /*yield*/, flowsRepository.findOneBy({ id: 1 })];
            case 1:
                flowsToUpdate = _a.sent();
                flowsToUpdate.credentials = JSON.stringify(credentials);
                return [4 /*yield*/, flowsRepository.save(flowsToUpdate)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveCredentials = saveCredentials;
var getSettings = function () { return __awaiter(void 0, void 0, void 0, function () {
    var flows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connection.manager.find(flows_entity_1.Flows)];
            case 1:
                flows = _a.sent();
                if (flows.length === 0) {
                    return [2 /*return*/, {}];
                }
                if (flows[0].settings === null) {
                    return [2 /*return*/, {}];
                }
                return [2 /*return*/, JSON.parse(flows[0].settings)];
        }
    });
}); };
exports.getSettings = getSettings;
var saveSettings = function (settings) { return __awaiter(void 0, void 0, void 0, function () {
    var flowsRepository, flowsToUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                flowsRepository = connection.getRepository(flows_entity_1.Flows);
                return [4 /*yield*/, flowsRepository.findOneBy({ id: 1 })];
            case 1:
                flowsToUpdate = _a.sent();
                flowsToUpdate.settings = JSON.stringify(settings);
                return [4 /*yield*/, flowsRepository.save(flowsToUpdate)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveSettings = saveSettings;
var getLibraryEntry = function (type, path) {
    return __awaiter(this, void 0, void 0, function () {
        var toReturn, foldersPushed, sqlRes, _i, sqlRes_1, row, folderName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //console.log('getLibraryEntry',type,path);
                    if ((type !== "flows") && (type !== "functions")) {
                        return [2 /*return*/]; //throw new err;
                    }
                    toReturn = [];
                    foldersPushed = new Set();
                    return [4 /*yield*/, connection.manager.find(library_entity_1.Library)];
                case 1:
                    sqlRes = _a.sent();
                    for (_i = 0, sqlRes_1 = sqlRes; _i < sqlRes_1.length; _i++) {
                        row = sqlRes_1[_i];
                        if (path == "".concat(row.filepath).concat(row.filename)) {
                            return [2 /*return*/, row.file];
                        }
                        else if (path == row.filepath) {
                            toReturn.push({ 'fn': row.filename });
                        }
                        else if (row.filepath.startsWith(path)) {
                            folderName = row.filepath.replace(path, '').split('/')[0];
                            if (!(foldersPushed.has(folderName))) {
                                foldersPushed.add(folderName);
                                toReturn.push(folderName);
                            }
                        }
                    }
                    return [2 /*return*/, toReturn];
            }
        });
    });
};
exports.getLibraryEntry = getLibraryEntry;
var saveLibraryEntry = function (type, path, meta, body) { return __awaiter(void 0, void 0, void 0, function () {
    var splitPath, filename, filepath, library, flowsRepository;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //console.log('saveLibraryEntry',type,path,meta,body);
                if ((type !== "flows") && (type !== "functions")) {
                    return [2 /*return*/]; //throw new err;
                }
                splitPath = path.split('/');
                filename = splitPath[splitPath.length - 1];
                filepath = path.replace(filename, '');
                library = new library_entity_1.Library();
                library.filename = filename;
                library.filepath = filepath;
                library.file = body;
                library.meta = meta;
                flowsRepository = connection.getRepository(library_entity_1.Library);
                return [4 /*yield*/, flowsRepository.save(library)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.saveLibraryEntry = saveLibraryEntry;
//# sourceMappingURL=index.js.map