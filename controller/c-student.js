//从数据库里面拿东西出来哦
const userModel = require('../lib/mysql.js');
const res_stand = require('./res_standard')
const dSuccess = "删除成功"
const upDateSuccess = "更新成功"
const iSuccess = "添加成功"

//获取所有学生的信息
exports.getAllStudent = async ctx=>{
    console.log(ctx)
    await userModel.getAllStudent().then(async (data)=>{
        res_stand(ctx,data)

    })
    //ctx.body=123;
}
//获取学生的信息
exports.getStudent = async ctx=>{
    console.log(ctx)
    let query = ctx.request.query;
    if(query.sname){
        await userModel.getBaseInfoByName(query.sname).then(async (data)=>{
            res_stand(ctx,data)
        })
    }else{
        await userModel.getBaseInfoBySid(query.sid).then(async (data)=>{
            res_stand(ctx,data)
        })
    }
}

//添加。
exports.insertStudent = async ctx=>{ 
    console.log(ctx.request.body);
    const {student_id,sname,gender,adm_age,adm_year,classroom } = ctx.request.body;
    await userModel.insertStudent([student_id,sname,gender,adm_age,adm_year,classroom]).then(async (data)=>{
        res_stand(ctx,data,iSuccess)
    })
}
//由学号实现删除
exports.deleteStudent = async ctx=>{
    let query = ctx.request.query
    await userModel.deleteStudent(query.sid).then(async (data)=>{
        res_stand(ctx,data,dSuccess)
    })
}
//更新学生信息
exports.updateStudent = async ctx=>{
    let body = ctx.request.body
    console.log(body);
    let setString = ""
    for(let i in body){
        if(body[i] === null){
            continue;
        }
        if(i !== "sid"){
            setString += (`${i}="${body[i]}",`) 
            console.log(i+body[i])
        }        
      }
    setString = setString.substring(0,setString.length-1);
    await userModel.updateStudent(body.sid,setString).then(async (data)=>{
        console.log("更新")
        res_stand(ctx,data,upDateSuccess)
    })
}