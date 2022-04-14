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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Build = exports.Config = void 0;
/*
 * @Author: huajian
 * @Date: 2022-04-06 21:48:10
 * @LastEditors: huajian
 * @LastEditTime: 2022-04-14 22:44:16
 * @Description:
 */
const node_fetch_1 = __importDefault(require("node-fetch"));
const fs = __importStar(require("fs-extra"));
exports.Config = {
    /** 输出目录 */
    outputDir: process.cwd() + '/src/api',
    /** 数据源文件  */
    sourceFile: __dirname + '/temp/api.json',
    /** 远程地址 */
    remoteUrl: '',
    /** 声明文件 */
    dtsFile: process.cwd() + '/src/api/dts.ts',
};
/** 临时目录*/
const tempDir = __dirname + '/temp';
let ResultSchema = { paths: {}, components: {} };
exports.Build = {
    /** 源数据 */
    sourceData: '',
    /** 准备目录 */
    initDir() {
        fs.removeSync(exports.Config.outputDir);
        fs.mkdirpSync(exports.Config.outputDir);
        fs.removeSync(tempDir);
        fs.mkdirpSync(tempDir);
    },
    /**
     * 下载源文件
     */
    initSource() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = '';
            debugger;
            if (exports.Config.remoteUrl) {
                const response = yield (0, node_fetch_1.default)(exports.Config.remoteUrl);
                data = yield response.text();
            }
            else {
                data = fs.readFileSync(exports.Config.sourceFile).toString().replace(/\$ref/, 'ref').replace(/#\/components\/schemas\//g, '');
            }
            this.sourceData = JSON.parse(data);
        });
    },
    /**
     * 初始化
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.initDir();
            yield this.initSource();
            ResultSchema.paths = this.formatPaths();
            ResultSchema.components = this.sourceData.components;
        });
    },
    /**
     * 格式化paths
     */
    formatPaths() {
        let result = {};
        const paths = this.sourceData.paths;
        Object.keys(paths).forEach((key) => {
            var _a;
            let schema = {};
            const path = paths[key].post;
            const tag = (_a = path.tags) === null || _a === void 0 ? void 0 : _a[0];
            if (!tag) {
                return;
            }
            schema.methodName = key.replace(tag, '').replace(/\//g, '');
            schema.description = path.description;
            schema.request = this.genRequestSchema(path.requestBody);
            schema.response = this.genResponseSchema(path.response);
            if (result[tag]) {
                result[tag].push(schema);
                return;
            }
            result[tag] = [schema];
        });
        return result;
    },
    /**
     * 获取request body请求
     * @param body
     * @returns
     */
    genRequestSchema(body) {
        try {
            const content = body.content['application/json'].schema;
            let schema = {};
            schema.type = content.type;
            schema.ref = content.ref;
            schema.required = body.required;
            schema.description = body.content.description;
            return schema;
        }
        catch (err) {
            console.log('genRequestBody', err);
        }
    },
    /**
     * 获取request body请求
     * @param body
     * @returns
     */
    genResponseSchema(res) {
        try {
            const content = res.default.content['application/json'].schema;
            let schema = {};
            schema.type = content.type;
            schema.ref = content['$ref'].replace('#/components/schemas/', '');
            schema.required = res.default.required;
            return schema;
        }
        catch (err) {
            console.log('genResponseSchema', err);
        }
    },
    getSchema(data) {
        return {
            required: data.required,
            schema: data.content['application/json'].schema
        };
    }
};
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
