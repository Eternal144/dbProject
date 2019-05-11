const userModel = require('../lib/mysql.js')
const res_stad = require('./res_standard')

const dSuccess = "删除成功"
const upDateSuccess = "更新成功"
const iSuccess = "添加成功"

exports.getAllCourse = async ctx=>{
    await userModel.getAllCourse().then(async (data)=>{
        res_stad(ctx,data);
    })
}

exports.getCourse = async ctx=>{
    //console.log(ctx)
    let query = ctx.request.query
    console.log(query);
    if(query.cname){
        await userModel.getCourseInfoByCname(query.cname).then(async (data)=>{
            res_stad(ctx,data)
        })
    }else if(query.cid){
        await userModel.getCourseInfoByCid(query.cid).then(async (data)=>{
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

//选出适合
exports.getFitCourse = async ctx =>{
    console.log(ctx)
    let query = ctx.request.query
    if(query.sname){
        await userModel.getFitCourseBySname(query.sname).then(async (data)=>{
            res_stad(ctx,data)
        })
    }else if(query.sid){
        await userModel.getFitCourseBySid(query.sid).then(async (data)=>{
            res_stad(ctx,data)
        })
    }
}

exports.insertCourse = async ctx=>{ 
    const {course_id,cname,tname,credit,grade,cancle_year } = ctx.request.body;
    // console.log(typeof course_id);
    await userModel.insertCourse([course_id,cname,tname,credit,grade,cancle_year]).then(async (data)=>{
        res_stad(ctx,data,iSuccess)
        
    })
}
//由学号实现删除
exports.deleteCourse = async ctx=>{
    console.log(ctx.request.query);
    let query = ctx.request.query
    await userModel.deleteCourse(query.cid).then(async (data)=>{
        res_stad(ctx,data,dSuccess)
    })
}
//更新学生信息
exports.updateCourse = async ctx=>{
    let body = ctx.request.body
    let setString = ""
    for(let i in body){
        if(body[i] === null){
            continue;
        }
        if(i !== "cid")
        setString += (`${i}="${body[i]}",`) 
      }
    setString = setString.substring(0,setString.length-1);
    console.log(setString)
    await userModel.updateCourse(body.cid,setString).then(async (data)=>{
        res_stad(ctx,data,upDateSuccess)
    })
}