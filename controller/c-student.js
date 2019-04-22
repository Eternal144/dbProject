//从数据库里面拿东西出来哦
const userModel = require('../lib/mysql.js');

//这是一个成功的接口
exports.getAllStudent = async ctx=>{
    console.log(ctx)
    await userModel.getAllStudent().then(async (data)=>{
        ctx.response.type = 'application/json';
        data = JSON.stringify(data)
        //data =JSON.parse(data[0]);
        //ctx.body = data;
        ctx.body = data;
        
    })
    //ctx.body=123;
}
exports.getStudent = async ctx=>{
    let query = ctx.request.query;
    if(query.name){
        await userModel.getSelectInfoByName(query.name).then(async (data)=>{
            console.log(data)
            ctx.response.type = 'application/json';
            data = JSON.stringify(data)
            ctx.body = data;
        })
    }else{
        await userModel.getSelectInfoBySid(query.sid).then(async (data)=>{
            console.log(data)
            ctx.response.type = 'application/json';
            data = JSON.stringify(data)
            ctx.body = data;
        })
    }
    let name = ctx.request.query.name
    
}
exports.addStudent = async ctx=>{ 
    console.log(ctx.request.body);
    //let { sname,gender,adm_age,adm_year,class} = ctx.request.body;
}