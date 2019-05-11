const userModel = require('../lib/mysql.js');
const res_stand = require('./res_standard')


const dSuccess = "删除成功"
const upDateSuccess = "更新成功"
const iSuccess = "选课成功"


exports.getAllRecord = async ctx=>{
    // console.log(ctx);
    await userModel.getAllReocrd().then(async (data)=>{
        res_stand(ctx,data)
    })
}
exports.getRecord = async ctx=>{
    console.log(ctx);
    let query = ctx.request.query
    if(query.sname){
        await userModel.getRecordsInfoByName(query.sname).then(async (data)=>{
            //mysql的返回
            res_stand(ctx,data)
        })
    }else if(query.sid){

        await userModel.getRecordsInfoBySid(query.sid).then(async (data)=>{
            res_stand(ctx,data)
        })
    }  
};
//添加。  少一个sid和 传过来了学号或者姓名
exports.insertRecord = async ctx=>{ 
    console.log(ctx.request.body)
    let body = ctx.request.body;
     if(body.sname){//传过来名字
        await userModel.getSidBySname(body.sname).then(async (data)=>{
            body.sid = data[0].sid;
            const {sid,cid,select_year,grade} = body;
            await userModel.insertRecord([sid,cid,select_year,grade]).then(async (data)=>{
                res_stand(ctx,data,iSuccess);
                // ctx.body = {
                //     code: 200,
                //     message: '选课成功'
                // }
                
            })
        }
        )
     }else if(body.sid){//传过来学号
        await userModel.getSidByStudentId(body.sid).then(async (data)=>{
            body.sid = data[0].sid;
            const {sid,cid,select_year,grade} = body
            await userModel.insertRecord([sid,cid,select_year,grade]).then(async (data)=>{
                res_stand(ctx,data,iSuccess);
            })
        })
     }
}
//由学号实现删除
exports.deleteRecord = async ctx=>{
    let query = ctx.request.query
    await userModel.deleteRecord(query.rid).then(async (data)=>{
        //这里只有成功的嘛
        res_stand(ctx,data,dSuccess);
        

    })
}
//更新学生信息
exports.updateRecord = async ctx=>{
    let body = ctx.request.body
    await userModel.updateRecord(body).then(async (data)=>{
        res_stand(ctx,data,upDateSuccess)
    })
}
