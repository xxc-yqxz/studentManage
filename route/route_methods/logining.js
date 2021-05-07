exports.index = (req, res) => {
    res.render('index.html');
}

exports.stuinfo = (req, res) => {
    res.send({
        status: 0,
        message: "登录成功",
        roles: req.user.roles
    })
}