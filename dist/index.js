"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: huajian
 * @Date: 2022-04-06 21:48:10
 * @LastEditors: huajian
 * @LastEditTime: 2022-04-07 22:56:23
 * @Description:
 */
var node_fetch_1 = __importDefault(require("node-fetch"));
var fs = __importStar(require("fs-extra"));
var Config = {
    /** 输出目录 */
    outputDir: process.cwd() + '/src/api',
    /** 临时目录*/
    tempDir: __dirname + '/temp',
    /** 数据源文件  */
    sourceFile: __dirname + '/temp/api.json',
    /** 声明文件 */
    dtsFile: process.cwd() + '/src/api/dts.ts',
};
var Build = {
    /** 源数据 */
    sourceData: '',
    /** 准备目录 */
    initDir: function () {
        fs.removeSync(Config.outputDir);
        fs.mkdirpSync(Config.outputDir);
        fs.removeSync(Config.tempDir);
        fs.mkdirpSync(Config.tempDir);
    },
    /**
     * 下载源文件
     */
    initSource: function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, node_fetch_1.default)('http://127.0.0.1:7001/api-json')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.text()];
                    case 2:
                        data = _a.sent();
                        this.sourceData = JSON.parse(data);
                        fs.writeFileSync(Config.sourceFile, data);
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
     * 初始化
     */
    init: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.initDir();
                        return [4 /*yield*/, this.initSource()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    /**
     * 格式化paths
     */
    formatPaths: function () {
        var paths = this.sourceData.paths;
        Object.keys(paths).forEach(function (key) {
            var _a;
            var path = paths[key].post;
            var tag = (_a = path.tags) === null || _a === void 0 ? void 0 : _a[0];
        });
    },
    getSchema: function (data) {
        return {
            required: data.required,
            schema: data.content['application/json'].schema
        };
    }
};
Build.init();
// const arg = process.argv.splice(2)[0];
// console.log(arg);
// fetch('http://127.0.0.1:7001/api-json')
// 	.then((res) => res.text())
// 	.then((body) => {
// 		fs.writeFileSync(outputJsonFile, body);
// 		spawn.sync(
// 			'./node_modules/dtsgenerator/bin/dtsgen',
// 			[outputJsonFile, '-o', outputDir + '/api-bridge.d.ts'],
// 			{ stdio: 'inherit' }
// 		);
// 		const contentBuf = fs.readFileSync(outputDir + '/api-bridge.d.ts');
// 		const content = contentBuf.toString().replace(/export\stype\sDefault\s=\s([^\[\n]+)((\[\]){0,1})/g, ($0, $1, $2) => { return $2 ? $0 + '\n          export type VO = ' + $1 : $0 + '\n          export type VO = Default' });
// 		fs.writeFileSync(outputDir + '/api-bridge.d.ts', content);
// 		const json = JSON.parse(body);
// 		const paths = Object.keys(json.paths).map((path) => {
// 			const result = json.paths[path];
// 			result.path = path;
// 			result.requestSchema = '';
// 			result.requestRequired = '';
// 			result.responseSchema = 'any';
// 			result.responseVO = 'any';
// 			const operationId = result.post.operationId.replace(/_(.)/, (m: string, m1: string) => {
// 				return m1.toUpperCase();
// 			})
// 			// 验证是否有有参数
// 			if (result.post.requestBody) {
// 				result.requestSchema = 'Paths.' + operationId + '.RequestBody';
// 				result.requestRequired = result.post.requestBody.required ? '' : '?';
// 			}
// 			// 验证返回值
// 			if (result.post.responses) {
// 				if (result.post.responses.default) {
// 					result.responseSchema = 'Paths.' + operationId + '.Responses.Default';
// 					result.responseVO = 'Paths.' + operationId + '.Responses.VO';
// 				}
// 				if (result.post.responses['201']) {
// 					result.responseSchema = 'Paths.' + operationId + '.Responses.$201';
// 				}
// 			}
// 			return result;
// 		});
// 		ejs.renderFile(path.resolve(__dirname, '../tpl.ejs'), { paths, arg }, (err, str) => {
// 			if (err) {
// 				console.log(err);
// 				return;
// 			}
// 			fs.writeFileSync(outputDir + '/api.ts', str);
// 		});
// 	});
