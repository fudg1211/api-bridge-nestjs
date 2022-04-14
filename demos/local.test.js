/*
 * @Author: huajian
 * @Date: 2022-04-08 15:48:36
 * @LastEditors: huajian
 * @LastEditTime: 2022-04-08 17:20:41
 * @Description: 
 */
const {Build,Config} = require('../dist/index');
Config.sourceFile=__dirname+'/json/simple.json';
Config.outputDir=__dirname+'/output';
Build.init();