/*
 * @Author: huajian
 * @Date: 2022-04-08 15:32:33
 * @LastEditors: huajian
 * @LastEditTime: 2022-04-08 17:47:48
 * @Description: 
 */
 const schema = {
    "paths":{
      "mall/category":[ // 这是tag
        {
          name:"getById",
          request:{
            ref:'IdDto'
          },
          response: {
            ref:'ItemEntity'
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