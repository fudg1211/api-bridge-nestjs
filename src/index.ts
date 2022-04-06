/*
 * @Author: huajian
 * @Date: 2022-04-06 21:48:10
 * @LastEditors: huajian
 * @LastEditTime: 2022-04-06 23:09:20
 * @Description: 
 */
import fetch from 'node-fetch';
import * as fs from 'fs-extra';
import ejs from 'ejs';
import spawn from 'cross-spawn';
import * as beautify from 'js-beautify';
import * as path from 'path';

const Config = {
	/** 输出目录 */
	outputDir: process.cwd() + '/src/api',
	/** 临时目录*/
	tempDir: __dirname + '/temp',
	/** 数据源文件  */
	sourceFile: __dirname + '/temp/api.json',
	/** 声明文件 */
	dtsFile:process.cwd() + '/src/api/dts.ts',
}

const Build = {
	/** 源数据 */
	sourceData:'',
	/** 准备目录 */
	initDir() {
		fs.removeSync(Config.outputDir);
		fs.mkdirpSync(Config.outputDir);
		fs.removeSync(Config.tempDir)
		fs.mkdirpSync(Config.tempDir);
	},
	/**
	 * 初始化源文件
	 */
	async initSource() {
		const response = await fetch('http://127.0.0.1:7001/api-json');
		const data = await response.text();
		this.sourceData = JSON.parse(data);
		fs.writeFileSync(Config.sourceFile, data);
	},
	/**
	 * 初始化
	 */
	async init() {
		this.initDir();
		await this.initSource();
		this.genDts();
	},

	/** 生成dts文件 */
	genDts(){
		spawn.sync(
			'./node_modules/dtsgenerator/bin/dtsgen',
			[Config.sourceFile, '-o', Config.dtsFile],
			{ stdio: 'inherit' }
		);
		const sourceData = fs.readFileSync(Config.dtsFile);
		let str = sourceData.toString().replace(/declare\snamespace\sPaths[\s\S]+$/,'');
		str = str.replace(/^[\s\S]+namespace\sSchemas\s\{\n/,'');
		str = str.replace(/\}\s*\n\s*\}\s*\n/,'');
		str = str.replace(/(\s\s)/g,'');
		fs.writeFileSync(Config.dtsFile,beautify.js(str,{ indent_size: 4, space_in_empty_paren: true }));
	},

	/**
	 * 格式化paths
	 */
	formatPaths(){
		const paths = this.sourceData.paths;
		Object.keys(paths).forEach((key)=>{
			const path = paths[key].post;
			const tag = path.tags?.[0];
			
		})
	},

	getSchema(data:any){
		return {
			required:data.required,
			schema:data.content['application/json'].schema
		}
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
