


/**
 * 重置到文章页
 */
exports.getRedirectPosts = async ctx => {
    ctx.redirect('/posts')
}
exports.getHello = async ctx => {
    // console.log(ctx.request);
    // fs.readFile()
    await ctx.render('hello', {
    })
}

