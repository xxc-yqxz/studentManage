const db = require('../../db/database');
const jwt = require('jsonwebtoken')
const config = require('../../config')

exports.login = (req, res) => {

    var userInfo = req.body;
    const sql = "select * from users where userId=?"

    db.query(sql, userInfo.userId, function (err, results) {
        if (err) {
            return res.cc(err);
        }
        if (results.length !== 1) {
            return res.cc("用户名错误，请重新输入")
        }

        if (results[0].password !== userInfo.password) {
            return res.cc("密码输入错误，请重新输入")
        }
        const user = { ...results[0], password: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        res.send({
            status: 0,
            message: "登录成功",
            token: "Bearer " + tokenStr,
        })
    })
}