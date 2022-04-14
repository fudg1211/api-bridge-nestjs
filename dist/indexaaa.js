"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description:sdfsdf
 * @Author: huajian
 * @LastEditors: huajian
 * @LastEditTime: 2021-08-18 23:08:55
 */
const node_fetch_1 = __importDefault(require("node-fetch"));
const fs_1 = __importDefault(require("fs"));
const ejs_1 = __importDefault(require("ejs"));
const cross_spawn_1 = __importDefault(require("cross-spawn"));
const path = require('path');
const outputDir = process.cwd() + '/src/api';
const outputJsonFile = outputDir + '/api-json.json';
if (!fs_1.default.existsSync(outputDir)) {
    fs_1.default.mkdirSync(outputDir);
}
const arg = process.argv.splice(2)[0];
console.log(arg);
(0, node_fetch_1.default)('http://127.0.0.1:7001/api-json')
    .then((res) => res.text())
    .then((body) => {
    fs_1.default.writeFileSync(outputJsonFile, body);
    cross_spawn_1.default.sync('./node_modules/dtsgenerator/bin/dtsgen', [outputJsonFile, '-o', outputDir + '/api-bridge.d.ts'], { stdio: 'inherit' });
    const contentBuf = fs_1.default.readFileSync(outputDir + '/api-bridge.d.ts');
    const content = contentBuf.toString().replace(/export\stype\sDefault\s=\s([^\[\n]+)((\[\]){0,1})/g, ($0, $1, $2) => { return $2 ? $0 + '\n          export type VO = ' + $1 : $0 + '\n          export type VO = Default'; });
    fs_1.default.writeFileSync(outputDir + '/api-bridge.d.ts', content);
    const json = JSON.parse(body);
    const paths = Object.keys(json.paths).map((path) => {
        const result = json.paths[path];
        result.path = path;
        result.requestSchema = '';
        result.requestRequired = '';
        result.responseSchema = 'any';
        result.responseVO = 'any';
        const operationId = result.post.operationId.replace(/_(.)/, (m, m1) => {
            return m1.toUpperCase();
        });
        // 验证是否有有参数
        if (result.post.requestBody) {
            result.requestSchema = 'Paths.' + operationId + '.RequestBody';
            result.requestRequired = result.post.requestBody.required ? '' : '?';
        }
        // 验证返回值
        if (result.post.responses) {
            if (result.post.responses.default) {
                result.responseSchema = 'Paths.' + operationId + '.Responses.Default';
                result.responseVO = 'Paths.' + operationId + '.Responses.VO';
            }
            if (result.post.responses['201']) {
                result.responseSchema = 'Paths.' + operationId + '.Responses.$201';
            }
        }
        return result;
    });
    ejs_1.default.renderFile(path.resolve(__dirname, '../tpl.ejs'), { paths, arg }, (err, str) => {
        if (err) {
            console.log(err);
            return;
        }
        fs_1.default.writeFileSync(outputDir + '/api.ts', str);
    });
});
