const userModel = require('../lib/mysql.js')
const res_stad = require('./res_standard')

exports.getGrade = async ctx=>{
    let query = ctx.request.query;
    if(query.sname && query.cname){
        await userModel.getGradeByNameAndCname(query.sname,query.cname).then(async (data)=>{
            res_stad(ctx,data)
        })
    }else if(query.sname && query.cid){
        await userModel.getGradeByNameAndCid(query.sname,query.cid).then(async (data)=>{
            res_stad(ctx,data)
        })
    }else if(query.id && query.cname){
        await userModel.getGradeBySidAndCname(query.id,query.cname).then(async (data)=>{
            res_stad(ctx,data)
        })
    }else if(query.id && query.cid){
        await userModel.getGradeBySidAndCid(query.id,query.cid).then(async (data)=>{
            res_stad(ctx,data)
        })
    }else{

    }
}
