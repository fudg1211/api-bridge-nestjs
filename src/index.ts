/*
 * @Author: huajian
 * @Date: 2022-04-06 21:48:10
 * @LastEditors: huajian
 * @LastEditTime: 2022-04-08 18:48:20
 * @Description: 
 */
import fetch from 'node-fetch';
import * as fs from 'fs-extra';
import ejs from 'ejs';
import spawn from 'cross-spawn';
import * as beautify from 'js-beautify';
import * as path from 'path';

export const Config = {
	/** 输出目录 */
	outputDir: process.cwd() + '/src/api',
	/** 数据源文件  */
	sourceFile: __dirname + '/temp/api.json',
	/** 远程地址 */
	remoteUrl: '',
	/** 声明文件 */
	dtsFile: process.cwd() + '/src/api/dts.ts',
}

/** 临时目录*/
const tempDir = __dirname + '/temp';

interface IOSchema {
	name: string;
	description?:string;
	type?: string;
	ref?: string;
	required: boolean;
	enum?: any[];
}

interface MethodSchema {
	/** 方法名称 */
	methodName: string;
	/** 方法描述 */
	description?: string,
	/** 请求Schema */
	request?: IOSchema;
	/** 返回Schema */
	response?: IOSchema;
}

interface ComponentSchema{
	type:string,
	properties:{
		[key:string]:{
			type:string,
			items?:{}
		}		
	}
}


interface Schema {
	pahts:{
		[key:string]:MethodSchema[]
	},
	components:{
		[key:string]:ComponentSchema
	}
}

let ResultSchema:Schema;




export const Build = {
	/** 源数据 */
	sourceData: '',
	/** 准备目录 */
	initDir() {
		fs.removeSync(Config.outputDir);
		fs.mkdirpSync(Config.outputDir);
		fs.removeSync(tempDir);
		fs.mkdirpSync(tempDir);
	},
	/**
	 * 初始化源文件
	 */
	async initSource() {
		let data = '';

		if (Config.remoteUrl) {
			const response = await fetch(Config.remoteUrl);
			data = await response.text();
		} else {
			data = fs.readFileSync(Config.sourceFile).toString().replace(/\$ref/,'ref').replace(/#\/components\/schemas\//g,'');
		}
		this.sourceData = JSON.parse(data);
	},
	/**
	 * 初始化
	 */
	async init() {
		this.initDir();
		await this.initSource();
		ResultSchema.pahts = this.formatPaths();
		ResultSchema.components = this.sourceData.components;
	},

	/**
	 * 格式化paths
	 */
	formatPaths() {
		let result:{
			[key:string]:MethodSchema[]
		};
		const paths = this.sourceData.paths;
		Object.keys(paths).forEach((key) => {
			let schema: MethodSchema ={} as MethodSchema;
			const path = paths[key].post;
			const tag = path.tags?.[0];
			if (!tag) {
				return;
			}
			schema.methodName = key.replace(tag, '');
			schema.description = path.description;
			schema.request = this.genRequestSchema(path.requestBody);
			schema.response = this.genResponseSchema(path.response);
			if(result[tag]){
				result[tag].push(schema);
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
	genRequestSchema(body?: any): IOSchema {
		try {
			const content = body.content['application/json'].schema;
			let schema: IOSchema = {} as IOSchema;
			schema.type = content.type;
			schema.ref = content.ref;
			schema.required = body.required;
			schema.description = body.content.description;
			return schema;
		} catch (err) {
			console.log('genRequestBody', err);
		}
	},


	/**
	 * 获取request body请求
	 * @param body 
	 * @returns 
	 */
	genResponseSchema(res?: any): IOSchema {
		try {
			const content = res.default.content['application/json'].schema;
			let schema: IOSchema ={} as IOSchema;
			schema.type = content.type;
			schema.ref = content['$ref'].replace('#/components/schemas/','');
			schema.required = res.default.required;
			return schema;
		} catch (err) {
			console.log('genResponseSchema', err);
		}
	},


	getSchema(data: any) {
		return {
			required: data.required,
			schema: data.content['application/json'].schema
		}
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
