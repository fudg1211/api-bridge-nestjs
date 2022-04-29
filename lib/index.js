import fetch from 'node-fetch';
import fs from 'fs/promises';
import ejs from 'ejs';
import path from 'path';
import clc from 'cli-color';
import openapiTS from "openapi-typescript";
export const Config = {
    outputDir: process.cwd() + '/src/api',
    tplFile: (new URL('../tpl.ejs', import.meta.url)).pathname,
    remoteUrl: 'http://127.0.0.1:7001/api-json'
};
const arg = process.argv.splice(2)[0];
export const Build = {
    sourceData: '',
    async initDir() {
        try {
            await fs.rmdir(Config.outputDir, { recursive: true });
        }
        catch (err) { }
        await fs.mkdir(Config.outputDir);
    },
    async initSource() {
        const response = await fetch(Config.remoteUrl);
        const data = await response.text();
        this.sourceData = JSON.parse(data);
    },
    async init() {
        console.log(clc.blueBright('api bridge start...'));
        await this.initDir();
        await this.initSource();
        const output = await openapiTS(this.sourceData);
        await fs.writeFile(Config.outputDir + '/api.d.ts', output);
        await this.genApiFile(output);
    },
    async genApiFile(output) {
        import(process.cwd() + '/api.config.mjs').then(async (res) => {
            const apis = res.default;
            for (let i = 0; i < apis.length; i++) {
                const api = apis[i];
                console.log(clc.blue('gen ' + api));
                const apiName = path.basename(api);
                const apiFile = apiName + '.ts';
                const apiPath = path.resolve(Config.outputDir, '.' + api, '..');
                await fs.mkdir(apiPath, { recursive: true });
                const data = {
                    arg,
                    api,
                    apiName,
                    to: apiName + 'Params',
                    res: apiName + 'Res',
                    vo: /List$/.test(apiName) ? apiName + 'Vo' : '',
                    PostSchema: `paths['${api}']['post']`,
                    requestSchema: `Post['requestBody']['content']['application/json']`,
                    responseSchema: `Post['responses']['default']['content']['application/json']`,
                    responseSchemaVo: `Post['responses']['default']['content']['application/json']['list'][0]`,
                };
                ejs.renderFile(Config.tplFile, data, {}, (err, str) => {
                    fs.writeFile(path.resolve(apiPath, apiFile), str);
                });
            }
        });
    }
};
Build.init();
//# sourceMappingURL=index.js.map