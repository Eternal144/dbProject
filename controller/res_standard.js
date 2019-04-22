const res_stand =  (ctx,data)=>{
    ctx.response.type = 'application/json'
        data = JSON.stringify(data)
        ctx.body = data;
}
module.exports = res_stand;