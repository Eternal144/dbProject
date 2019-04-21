//从数据库里面拿东西出来哦
const userModel = require('../lib/mysql.js');

exports.getPeople = async ctx=>{
    console.log(ctx)
    await userModel.getPeople().then(async (data)=>{
        ctx.response.type = 'application/json';
        data = JSON.stringify(data)
        //data =JSON.parse(data[0]);
        //ctx.body = data;
        ctx.body = data;
        
    })
    //ctx.body=123;
}