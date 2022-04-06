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
var node_fetch_1 = __importDefault(require("node-fetch"));
var fs_1 = __importDefault(require("fs"));
var ejs_1 = __importDefault(require("ejs"));
var cross_spawn_1 = __importDefault(require("cross-spawn"));
var path = require('path');
var outputDir = process.cwd() + '/src/api';
var outputJsonFile = outputDir + '/api-json.json';
if (!fs_1.default.existsSync(outputDir)) {
    fs_1.default.mkdirSync(outputDir);
}
var arg = process.argv.splice(2)[0];
console.log(arg);
(0, node_fetch_1.default)('http://127.0.0.1:7001/api-json')
    .then(function (res) { return res.text(); })
    .then(function (body) {
    fs_1.default.writeFileSync(outputJsonFile, body);
    cross_spawn_1.default.sync('./node_modules/dtsgenerator/bin/dtsgen', [outputJsonFile, '-o', outputDir + '/api-bridge.d.ts'], { stdio: 'inherit' });
    var contentBuf = fs_1.default.readFileSync(outputDir + '/api-bridge.d.ts');
    var content = contentBuf.toString().replace(/export\stype\sDefault\s=\s([^\[\n]+)((\[\]){0,1})/g, function ($0, $1, $2) { return $2 ? $0 + '\n          export type VO = ' + $1 : $0 + '\n          export type VO = Default'; });
    fs_1.default.writeFileSync(outputDir + '/api-bridge.d.ts', content);
    var json = JSON.parse(body);
    var paths = Object.keys(json.paths).map(function (path) {
        var result = json.paths[path];
        result.path = path;
        result.requestSchema = '';
        result.requestRequired = '';
        result.responseSchema = 'any';
        result.responseVO = 'any';
        var operationId = result.post.operationId.replace(/_(.)/, function (m, m1) {
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
    ejs_1.default.renderFile(path.resolve(__dirname, '../tpl.ejs'), { paths: paths, arg: arg }, function (err, str) {
        if (err) {
            console.log(err);
            return;
        }
        fs_1.default.writeFileSync(outputDir + '/api.ts', str);
    });
});
