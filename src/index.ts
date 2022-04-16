/*
 * @Author: huajian
 * @Date: 2022-04-06 21:48:10
 * @LastEditors: huajian
 * @LastEditTime: 2022-04-16 16:08:47
 * @Description: 
 */
import fetch from 'node-fetch';
import * as fs from 'fs/promises';
import ejs from 'ejs';
import * as path from 'path';
import openapiTS from "openapi-typescript";


export const Config = {
	/** 输出目录 */
	outputDir: process.cwd() + '/src/api',
	tplFile: (new URL('../tpl.ejs',import.meta.url)).pathname,
	/** 远程地址 */
	remoteUrl: 'http://127.0.0.1:7001/api-json',
	apis: []
}

// 执行参数
const arg = process.argv.splice(2)[0];

export const Build = {
	/** 源数据 */
	sourceData: '',
	/** 准备目录 */
	async initDir() {
		try {
			await fs.rmdir(Config.outputDir, { recursive: true });
		} catch (err) { }
		await fs.mkdir(Config.outputDir);
	},
	/**
	 * 下载源文件
	 */
	async initSource() {
		const response = await fetch(Config.remoteUrl);
		const data = await response.text();
		this.sourceData = JSON.parse(data);
	},

	/**
	 * 初始化
	 */
	async init() {
		await this.initDir();
		await this.initSource();
		const output = await openapiTS(this.sourceData);
		await fs.writeFile(Config.outputDir + '/api.d.ts', output);
		await this.genApiFile();
	},

	async genApiFile() {
		const tplStr = await fs.readFile(Config.tplFile, { encoding: 'utf-8' });
		for (let i = 0; i < Config.apis.length; i++) {
			const api = Config.apis[i];
			const apiName = path.basename(api);
			const apiFile = apiName + '.ts';
			const apiPath = path.resolve(Config.outputDir, '.' + api, '..');
			await fs.mkdir(apiPath, { recursive: true });
			const data = {
				arg,
				api,
				apiName,
				PostSchema:`paths['${api}']['post']`,
				requestSchema: `Post['requestBody']['content']['application/json']`,
				responseSchema: `Post['responses']['default']['content']['application/json']`
			};
			ejs.renderFile(Config.tplFile, data,{}, (err, str) => {
				fs.writeFile(path.resolve(apiPath, apiFile), str);
			});
		}
	}
};
