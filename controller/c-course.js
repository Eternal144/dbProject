const userModel = require('../lib/mysql.js')
const res_stad = require('./res_standard')

exports.getCourse = async ctx=>{
    console.log(ctx)
    let query = ctx.request.query
    if(query.cname){
        await userModel.getCourseInfoByCname(query.cname).then(async (data)=>{
            res_stad(ctx,data)
        })
    }else if(query.cid){
        await userModel.getCourseInfoByCid(query.cid).then(async (ctx)=>{
            res_stad(ctx,data)
        })
    }
}

exports.getCourseSat = async ctx=>{
    console.log(ctx)
    let query = ctx.request.query
    if(query.cname){
        await userModel.getCourseSituByCname(query.cname).then(async (data)=>{
            res_stad(ctx,data)
        })
    }else if(query.cid){
        await userModel.getCourseSituByCid(query.cid).then(async (data)=>{
            res_stad(ctx,data)
        })
    }
}

exports.insertCourse = async ctx=>{ 
    const {course_id,canme,tname,redits,grade,cancle_year } = ctx.request.body;
    await userModel.insertCourse([course_id,canme,tname,redits,grade,cancle_year]).then(async (data)=>{
        console.log("发送过去了")
        console.log(data);
    })
}
//由学号实现删除
exports.deleteCourse = async ctx=>{
    let query = ctx.request.query
    await userModel.deleteCourse(query.id).then(async (data)=>{
        console.log(data)
    })
}
//更新学生信息
exports.updateCourse = async ctx=>{
    let body = ctx.request.body
    let setString = ""
    for(let i in body){
        if(i !== "cid")
        setString += (`${i}="${body[i]}",`) 
      }
    setString = setString.substring(0,setString.length-1);
    console.log(setString)
    await userModel.updateCourse(body.sid,setString).then(async (data)=>{
        console.log(data)
    })
}