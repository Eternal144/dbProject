const userModel = require('../lib/mysql.js');
const res_stand = require('./res_standard')
exports.getAllRecord = async ctx=>{
    console.log(ctx);
    await userModel.getAllReocrd().then(async (data)=>{
        res_stand(ctx,data)
    })
}
exports.getRecord = async ctx=>{
    console.log(ctx);
    let query = ctx.request.query
    if(query.sname){
        await userModel.getRecordsInfoByName(query.sname).then(async (data)=>{
            //console.log(`get name ${query.name}`)
            res_stand(ctx,data)
        })
    }else if(query.id){
        //console.log(`get sid ${query.id}`)
        await userModel.getRecordsInfoBySid(query.sid).then(async (data)=>{
            res_stand(ctx,data)
        })
    }  
};
//添加。
exports.insertRecord = async ctx=>{ 
    const {sid,cid,select_year,grade} = ctx.request.body;
    await userModel.insertRecord([sid,cid,select_year,grade]).then(async (data)=>{
        console.log("发送过去了")
        console.log(data);
    })
}
//由学号实现删除
exports.deleteRecord = async ctx=>{
    let query = ctx.request.query
    await userModel.deleteRecord(query.id).then(async (data)=>{
        console.log(data)
    })
}
//更新学生信息
exports.updateRecord = async ctx=>{
    let body = ctx.request.body
    await userModel.updateRecord(body).then(async (data)=>{
        console.log(data)
    })
}
