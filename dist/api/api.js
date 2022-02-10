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
exports.ConstantController_add = exports.ConstantController_update = exports.ConstantController_del = exports.ConstantController_list = exports.CaseController_getById = exports.CaseController_del = exports.CaseController_update = exports.CaseController_add = exports.CaseController_list = exports.ProjectController_getById = exports.ProjectController_getScriptsListById = exports.ProjectController_del = exports.ProjectController_update = exports.ProjectController_add = exports.ProjectController_list = exports.ScriptController_del = exports.ScriptController_update = exports.ScriptController_add = exports.ScriptController_list = exports.FunctionController_del = exports.FunctionController_update = exports.FunctionController_add = exports.FunctionController_list = void 0;
var go_request_1 = require("@go/go-request");
function FunctionController_list(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/function/list', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.FunctionController_list = FunctionController_list;
function FunctionController_add(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/function/add', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.FunctionController_add = FunctionController_add;
function FunctionController_update(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/function/update', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.FunctionController_update = FunctionController_update;
function FunctionController_del(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/function/del', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.FunctionController_del = FunctionController_del;
function ScriptController_list(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/script/list', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ScriptController_list = ScriptController_list;
function ScriptController_add(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/script/add', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ScriptController_add = ScriptController_add;
function ScriptController_update(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/script/update', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ScriptController_update = ScriptController_update;
function ScriptController_del(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/script/del', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ScriptController_del = ScriptController_del;
function ProjectController_list(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/project/list', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ProjectController_list = ProjectController_list;
function ProjectController_add(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/project/add', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ProjectController_add = ProjectController_add;
function ProjectController_update(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/project/update', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ProjectController_update = ProjectController_update;
function ProjectController_del(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/project/del', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ProjectController_del = ProjectController_del;
function ProjectController_getScriptsListById(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/project/getScriptsListById', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ProjectController_getScriptsListById = ProjectController_getScriptsListById;
function ProjectController_getById(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/project/getById', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ProjectController_getById = ProjectController_getById;
function CaseController_list(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/case/list', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.CaseController_list = CaseController_list;
function CaseController_add(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/case/add', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.CaseController_add = CaseController_add;
function CaseController_update(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/case/update', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.CaseController_update = CaseController_update;
function CaseController_del(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/case/del', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.CaseController_del = CaseController_del;
function CaseController_getById(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/wx/case/getById', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.CaseController_getById = CaseController_getById;
function ConstantController_list() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/mall/constant/list')];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ConstantController_list = ConstantController_list;
function ConstantController_del(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/mall/constant/del', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ConstantController_del = ConstantController_del;
function ConstantController_update(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/mall/constant/update', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ConstantController_update = ConstantController_update;
function ConstantController_add(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, go_request_1.Request)('/mall/constant/add', data)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.ConstantController_add = ConstantController_add;
