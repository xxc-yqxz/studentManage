const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
});

const unloginRouter = require("./route/unlogin");
app.use('/unlogin', unloginRouter);

const loginingRouter = require("./route/logining");
app.use('/logining', loginingRouter);

app.listen(80, function () {
    console.log("服务器连接成功，请访问http://localhost/");
})