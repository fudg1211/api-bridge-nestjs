/*
 * @Author: huajian
 * @Date: 2022-04-07 23:17:12
 * @LastEditors: huajian
 * @LastEditTime: 2022-04-08 00:12:12
 * @Description: 
 */

const schema = {
	"paths":{
		"MallCategory":[
			{
				name:"getById",
				request:{
					type:'IdDto'
				},
				response: {
					type:'ItemEntity'
				}
			}
		]
	},
	"components":{
		"ItemEntity":{
			name:"id",
			type:"number",
			required:true
		},
		"IdDto":{
			name:"id",
			type:"array",
			required:true,
			enum:[1,2,3,4]
		}
	}
}