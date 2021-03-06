var mysql = require('mysql');
var config = require('../config/default.js')


var now_year = 2019;
var pool  = mysql.createPool({
  host     : config.database.HOST,
  user     : config.database.USERNAME,
  password : config.database.PASSWORD,
  database : config.database.DATABASE,
  port     : config.database.PORT
});

//第一个参数是执行参数
//第二个参数是需要post到数据库的值
let query = ( sql, values ) => {
//连接到数据库进行查询
  return new Promise(( resolve, reject ) => {
    pool.getConnection( (err, connection) => {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })

}


// let query = function( sql, values ) {
// pool.getConnection(function(err, connection) {
//   // 使用连接
//   connection.query( sql,values, function(err, rows) {
//     // 使用连接执行查询
//     console.log(rows)
//     connection.release();
//     //连接不再使用，返回到连接池
//   });
// });
// }

let users =
    `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     pass VARCHAR(100) NOT NULL COMMENT '密码',
     PRIMARY KEY ( id )
    );`


let todos = 
      `create table if not exists todos(
        tid INT NOT NULL AUTO_INCREMENT,
        fromUid VARCHAR(100) NOT NULL COMMENT '发送者',
        toUid VARCHAR(100) NOT NULL COMMENT '接收者',
        moment VARCHAR(100) NOT NULL COMMENT '发送时间',
        PRIMARY KEY ( tid )
      );`



// 注册用户

// 通过名字查找用户
exports.findDataByName =  ( name ) => {
  let _sql = `select * from users where name="${name}";`
  return query( _sql)
}
// 通过名字查找用户数量判断是否已经存在
exports.findDataCountByName =  ( name ) => {
  let _sql = `select count(*) as count from users where name="${name}";`
  console.log(_sql)
  return query( _sql)
}
// 通过文章的名字查找用户
exports.findDataByUser =  ( name ) => {
  let _sql = `select * from posts where name="${name}";`
  return query( _sql)
}
//测试语句 所有选了课的学生？学生基本信息。是学生+学生的所有课程的信息,点击学生获取平均信息。
exports.getAllStudent = ()=>{
  let _sql = `select S.*
  from Students S
  ;`
  return query(_sql)
}
//right 名字-》基本信息
exports.getBaseInfoByName = (name)=>{
  let _sql = `select * from Students where sname = "${name}";`
  return query(_sql)
}
//right 名字-》基本信息
exports.getBaseInfoBySid = (sid)=>{
  let _sql = `select * from Students where student_id = "${sid}";`
  return query(_sql)
}

//right 名字-》选的所有课
exports.getRecordsInfoByName = (name)=>{
  let _sql = `select R.*,S.sname,S.student_id,C.cname,C.course_id
  from Records R, Students S, Courses C
  where S.sname="${name}" and R.sid = S.sid and R.cid = C.cid;`
  return query(_sql)
}
//right
exports.getRecordsInfoBySid = (sid) =>{
  let _sql = `select R.*,S.sname,S.student_id,C.cname,C.course_id
  from Records R, Courses C,Students S
  where S.student_id = "${sid}" and C.cid = R.cid and R.sid = S.sid;`
  return query(_sql)
}

exports.getAllReocrd = ()=>{
  let _sql = `select R.*,S.sname,S.student_id,C.cname,C.course_id
  from Records R,Students S,Courses C
  where R.sid = S.sid and R.cid = C.cid
  ;`
  return query(_sql)
}


exports.getGradeByNameAndCid = (sname,cid)=>{
  let _sql = `select R.rid,S.sid,S.sname,S.student_id,C.cid,C.cname,C.course_id, R.scores
  from Students S, Records R,Courses C
  where S.sname = "${sname}" and C.course_id = "${cid}" and R.sid = S.sid and R.cid = C.cid and R.scores is not null;`
  return query(_sql)
}
exports.getGradeByNameAndCname = (sname,cname)=>{
  let _sql = `select R.rid,S.sid,S.sname,S.student_id,C.cid,C.cname,C.course_id, R.scores
  from Students S, Records R,Courses C
  where S.sname = "${sname}" and C.cname = "${cname}" and R.sid = S.sid and R.cid = C.cid and R.scores is not null;`
  return query(_sql)
}
exports.getGradeBySidAndCid = (sid,cid)=>{
  let _sql = `select R.rid,S.sid,S.sname,S.student_id,C.cid,C.cname,C.course_id, R.scores
  from Students S, Records R,Courses C
  where S.student_id = "${sid}" and C.course_id = "${cid}" and R.sid = S.sid and R.cid = C.cid and R.scores is not null;`
  return query(_sql)
}
exports.getGradeBySidAndCname = (sid,cname)=>{
  let _sql = `select R.rid,S.sid,S.sname,S.student_id,C.cid,C.cname,C.course_id, R.scores
  from Students S, Records R,Courses C
  where S.student_id = "${sid}" and C.cname = "${cname}" and R.sid = S.sid and R.cid = C.cid and R.scores is not null;`
  return query(_sql)
}

exports.getAllStudentScoresBySname = (sname)=>{
  let _sql = `select R.rid,S.sid, S.sname,S.student_id,C.cname,C.course_id, R.scores
  from Students S, Records R,Courses C
  where S.sname = "${sname}" and R.sid = S.sid and R.cid = C.cid and R.scores is not null
  `
  return query(_sql)

}
exports.getAllStudentScoresBySid = (sid)=>{
  console.log("进来了")
  let _sql = `select R.rid,S.sid,S.sname,S.student_id,C.cid,C.cname,C.course_id, R.scores
  from Students S, Records R,Courses C
  where S.student_id = ${sid} and R.sid = S.sid and R.cid = C.cid and R.scores is not null
  `
  return query(_sql)
}
exports.getAllCourseScoresByCid = (cid)=>{
  let _sql = `select R.rid,S.sid,S.sname,S.student_id,C.cid,C.cname,C.course_id, R.scores
  from Students S, Records R,Courses C
  where C.course_id = ${cid} and R.sid = S.sid and R.cid = C.cid and R.scores is not null
  `
  return query(_sql)
}
exports.getAllCourseScoresByCname= (cname)=>{
  let _sql = `select R.rid,S.sid, S.sname,S.student_id,C.cid,C.cname,C.course_id, R.scores
  from Students S, Records R,Courses C
  where c.cname = "${cname}" and R.sid = S.sid and R.cid = C.cid and R.scores is not null
  `
  return query(_sql)
}



//查询课程基本信息
exports.getCourseInfoByCname = (name)=>{
  let _sql = `select *
  from Courses C
  where C.cname = "${name}";`
  return query(_sql)
}

exports.getCourseInfoByCid = (cid)=>{
  let _sql = `select *
  from Courses C
  where C.course_id = "${cid}";`
  return query(_sql)
}
//返回人名，和时间
exports.getCourseSituByCname = (name)=>{
  let _sql = `select S.sname,R.select_year
  from Courses C,Records R,Students S
  where C.cname = "${name}" and R.sid = S.sid and R.cid = C.cid;`
  return query(_sql)
}

exports.getCourseSituByCid = (cid)=>{
  let _sql = `select S.sname,R.select_year
  from Courses C,Records R,Students S
  where C.cid = "${cid}" and R.sid = S.sid and R.cid = C.cid;`
  return query(_sql)
}

//增加学生
exports.insertStudent = (value)=>{
  //console.log(value)
  let _sql = `insert into Students set student_id=?,sname=?,gender=?,adm_age=?,adm_year=?,classroom=?;`
  return query(_sql,value)
}

//删除学生
exports.deleteStudent = (sid)=>{
  let _sql = `delete from Students where sid = ${sid};`
  return query(_sql)
}


//修改学生信息
exports.updateStudent = (sid,string)=>{
  //在这里拼接字符串
  let _sql = `update Students set ${string} where sid = "${sid}";`
  return query(_sql)
}
//增加课程
exports.insertCourse = (value)=>{
  let _sql = `insert into Courses set course_id=?,cname=?,tname=?,credit=?,grade=?,cancle_year=?;`
  return query(_sql,value)
}
exports.deleteCourse = (cid)=>{
  console.log(cid);
  let _sql = `delete from Courses where cid = "${cid}";`
  return query(_sql)
}
//修改学生信息
exports.updateCourse= (cid,string)=>{
  //在这里拼接字符串
  console.log(cid);
  console.log(string);
  let _sql = `update Courses set ${string} where cid = "${cid}";`
  return query(_sql)
}

exports.insertRecord = (value)=>{
  let _sql = `insert into Records set sid=?,cid=?,select_year=?,scores=?;`
  return query(_sql,value)
}
exports.deleteRecord = (rid)=>{
  let _sql = `delete from Records where rid = "${rid}";`
  return query(_sql)
}


 //这是一些符合改学生的课程，这些课程不在
exports.getFitCourseBySname = (sname)=>{
  let _sql = `select C.*
  from Students S, Courses C
  where S.sname = "${sname}" and S.adm_year + C.grade = ${now_year} and C.cid not in(
  select C1.cid
    from Students S1,Courses C1,Records R1
    where S1.sname = "${sname}" and S1.sid = R1.sid and C1.cid = R1.cid
  );`
  return query(_sql);
}

exports.getFitCourseBySid = (student_id)=>{
  let _sql = `select C.*
  from Students S, Courses C
  where S.student_id = "${student_id}" and S.adm_year + C.grade = ${now_year} and C.cid not in(
  select C1.cid
    from Students S1,Courses C1,Records R1
    where S1.student_id = "${student_id}" and S1.sid = R1.sid and C1.cid = R1.cid
  );
  `
  return query(_sql);
}

//修改学生信息,修改选课信息？？不就是增加吗
exports.updateRecord = (body)=>{
  //在这里拼接字符串
  console.log(body.scores);
  let _sql = `update Records set scores = ${body.scores} where rid="${body.rid}";`
  return query(_sql)
}

exports.getSidBySname = (sname)=>{
  let _sql = `select S.sid
  from Students S
  where S.sname = "${sname}";`
  return query(_sql);
}

exports.getSidByStudentId = (student_id)=>{
  let _sql = `select S.sid
  from Students S
  where S.student_id = "${student_id}";`
  return query(_sql)
}

exports.getAllCourse = ()=>{
  let _sql = `select * from Courses;`
  return query(_sql);
}

//获取所有班级的平均成绩 //获得所有课程的
exports.getCourseAverageScores = ()=>{
  let _sql = `select C.cname,AVG(Re.Scores) as average
  from Records Re,Courses C
  where Re.cid = C.cid
  group BY Re.cid;`
return query(_sql);
}

exports.getStudentAverage = (sid)=>{
  let _sql = `select R.sid,AVG(R.scores) AS average
  from Records R
  where  R.sid = "${sid}" 
  Group By R.sid;
  `
  return query(_sql)
}
//获得某个课程的平均成绩
exports.getCourseAverage = (cid) =>{
  let _sql = `select R.cid,AVG(R.scores) AS average
  from Records R
  where  R.cid = ${cid}
  Group By R.cid;
  `
  return query(_sql)
}

//获取某个年纪的全部班级平均成绩
exports.getClassAverage = (grade)=>{
  let _sql = `select S.classroom,AVG(R.scores) AS average
  from Records R,Courses C,Students S
  where R.sid = S.sid and S.adm_year + ${grade} = ${now_year} 
  GROUP BY S.classroom
  ORDER BY S.classroom;`
  return query(_sql)
}












