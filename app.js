const joi = require('@hapi/joi')
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }))

const cors = require("cors");
app.use(cors())

app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
});

const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({ secret: config.jwtSecretKey }).unless({
    path: [/^\/unlogin/]
}))

const unloginRouter = require("./route/unlogin");
app.use('/unlogin', unloginRouter);

const loginingRouter = require("./route/logining");
app.use('/logining', loginingRouter);

//定义错误级别的中间件，需要在导入路由之后再定义
app.use((err, req, res, next) => {
    //验证失败导致的错误，此处必须加return,否则会调用两次res.send()
    // 身份认证失败后的错误，对应34行
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败!')
    //未知的错误
    res.cc(err)
})

app.listen(80, function () {
    console.log("服务器连接成功，请访问http://localhost/");
})