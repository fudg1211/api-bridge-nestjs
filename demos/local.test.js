/*
 * @Author: huajian
 * @Date: 2022-04-08 15:48:36
 * @LastEditors: huajian
 * @LastEditTime: 2022-04-16 13:18:55
 * @Description: 
 */
import { Build,Config } from '../dist/index.js';
import * as path from 'path';
Config.remoteUrl='http://127.0.0.1:7001/api-json';
Config.outputDir=process.cwd()+'/demos/output';
Config
Build.init();