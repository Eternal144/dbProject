const res_stand =  (ctx,data,message)=>{

    if(data.length === 0){
        message =  "请求数据为空";
    }
    ctx.response.type = 'application/json'
        ctx.body = {
            code:200,
            data,
            message,
        };
}
module.exports = res_stand;