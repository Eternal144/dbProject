var fs = require("fs");

exports.getJson = async ctx =>{
    var request = ctx.request;
    var url = __dirname+request.url+".json";
    var json = await doReadFile(url);
    ctx.response.type = 'application/json';
    //设置response的内容:
    ctx.response.body = json;
}

function doReadFile(url){
    return new Promise((resolve,reject)=>{
        fs.readFile(url,(err,data)=>{
            if(err){
                return reject(err);
            }else{
                console.log(JSON.parse(data.toString('utf-8')))
                resolve(JSON.parse(data.toString('utf-8')))
            }
        })
    })
}