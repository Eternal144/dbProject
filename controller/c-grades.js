const userModel = require('../lib/mysql.js')
const res_stad = require('./res_standard')

const success = "获取成功"


exports.getScore = async ctx=>{
    let query = ctx.request.query;
    if(query.sname && query.cname){
        await userModel.getGradeByNameAndCname(query.sname,query.cname).then(async (data)=>{
            res_stad(ctx,data,success)
        })
    }else if(query.sname && query.cid){
        await userModel.getGradeByNameAndCid(query.sname,query.cid).then(async (data)=>{
            res_stad(ctx,data,success)
        })
    }else if(query.sid && query.cname){
        await userModel.getGradeBySidAndCname(query.sid,query.cname).then(async (data)=>{
            res_stad(ctx,data,success)
        })
    }else if(query.sid && query.cid){
        await userModel.getGradeBySidAndCid(query.sid,query.cid).then(async (data)=>{
            res_stad(ctx,data,success)
        })
    }
}
//获取某个学生的所有成绩
exports.getAllStudentScores = async ctx =>{
    let query = ctx.request.query;
    if(query.sid){
        await userModel.getAllStudentScoresBySid(query.sid).then(async (data)=>{
            res_stad(ctx,data,success)
        })
    }else if(query.sname){
        await userModel.getAllStudentScoresBySname(query.sname).then(async (data)=>{
            res_stad(ctx,data,success)
        })
    }
}

//获取某个课程的所有成绩
exports.getAllCourseScores = async ctx=>{
    let query = ctx.request.query
    if(query.cid){
        await userModel.getAllCourseScoresByCid(query.cid).then(async (data)=>{
            res_stad(ctx,data,success)
            
        })
    }else if(query.cname){
        await userModel.getAllCourseScoresByCname(query.cname).then(async (data)=>{
            res_stad(ctx,data,success)
        })
    }
}


exports.getAllCourseAverage = async ctx=>{
    await userModel.getCourseAverageScores().then(async (data)=>{
        res_stad(ctx,data,success)
    })
}

exports.getStudentAverage = async ctx =>{
    let query = ctx.request.query;
    await userModel.getStudentAverage(query.sid).then(async (data)=>{
        res_stad(ctx,data,success)
    })
}
exports.getCourseAverage = async ctx=>{
    let query = ctx.request.query
    await userModel.getCourseAverage(query.cid).then(async (data)=>{
        res_stad(ctx,data,success)
    })
}

exports.getClassAverage = async ctx=>{
    let query = ctx.request.query
    console.log(query)
    await userModel.getClassAverage(query.grade).then(async (data)=>{
        res_stad(ctx,data,success)
    })
}
