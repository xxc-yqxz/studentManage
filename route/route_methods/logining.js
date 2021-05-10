const db = require('../../db/database')

exports.index = (req, res) => {
    res.render('index.html');
}

exports.stuinfo = (req, res) => {

    res.send({
        status: 0,
        message: "登录成功",
        roles: req.user.roles,
        username: req.user.username
    })
}

exports.score = (req, res) => {
    var userInfo = req.user;
    const sql1 = "select * from scores where stuid=? and date = ?"
    const sql2 = "select * from scores where stuid=?"
    if (req.query.date !== undefined) {
        db.query(sql1, [userInfo.userId, req.query.date], function (err, results) {
            if (err) {
                return res.cc(err);
            }
            res.send({
                status: 0,
                message: "获取成绩成功",
                data: results
            })
        })
    } else {
        db.query(sql2, userInfo.userId, function (err, results) {
            if (err) {
                return res.cc(err);
            }
            res.send({
                status: 0,
                message: "获取成绩成功",
                data: results
            })
        })

    }
}

exports.getdata = (req, res) => {
    var id = req.query.id;


    var userInfo = req.user;
    const sql = "select * from users where id=?"

    id = id || userInfo.id

    db.query(sql, [id], function (err, results) {
        if (err) {
            return res.cc(err);
        }
        if (results.length !== 1) {
            return res.cc("获取学生信息失败")
        }
        res.send({
            status: 0,
            message: "获取学生信息成功",
            data: results
        })
    })
}

exports.setdata = (req, res) => {
    var temp = { ...req.body }
    var data = { username: temp.username, birthday: temp.birthday, sex: temp.sex, native: temp.sheng + '|' + temp.shi + '|' + temp.qu, major: temp.major, class: temp.class, address: temp.address, phone: temp.phone }


    const sql = 'update users set ? where userId = ?';

    db.query(sql, [data, req.user.userId], (err, results) => {
        if (err) return res.cc(err)


        if (results.affectedRows !== 1) return res.cc("更改用户信息失败!")

        return res.cc("更改用户信息成功!", 0)
    })

}

exports.modifypwd = (req, res) => {
    const sql = 'update users set password = ? where userId = ? and password = ?';
    db.query(sql, [req.body.new1, req.user.userId, req.body.oldpwd], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc("原密码错误，请重新输入!")

        return res.cc("更改密码成功!", 0)
    })
}

exports.course_in = (req, res) => {
    // const sql1 = 'select * from subject where subject = ? and isDel = 1';
    // db.query(sql1, req.body.subject, (err, result) => { 
    //     if (err) return res.cc(err)
    //     if(results.affectedRows !== 1) return res.cc('新增科目失败')
    // })

    const sql2 = 'insert into subjects(subject) values(?)'
    db.query(sql2, req.body.subject, (err, results) => {
        if (err) return res.cc('科目名已存在!')
        if (results.affectedRows !== 1) return res.cc('新增科目失败!')

        res.cc('新增科目成功!', 0)
    })
}

exports.course_del = (req, res) => {
    console.log(req.body.subject);

    const sql = 'update subjects set isDel=1 where subject=? and isDel=0'
    db.query(sql, req.body.subject, (err, results) => {
        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('科目不存在!')
        res.cc('删除科目成功!', 0)
    })
}

exports.user_add = (req, res) => {
    var data = { ...req.body, password: '123456' }
    console.log(data);

    const sql = 'insert into users(userId,username,roles,password) values(?,?,?,?)'
    db.query(sql, [data.userId, data.username, data.roles, data.password], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('新增用户失败!')

        res.cc('新增用户成功!', 0)
    })
}

exports.get_subject = (req, res) => {
    const sql = 'select * from subjects where isDel=0 order by id asc'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取科目信息成功',
            data: results
        })
    })
}

exports.score_in = (req, res) => {
    var data = { ...req.body }
    console.log(data);

    const sql1 = "select * from users where userId=? and roles = 'student'"
    db.query(sql1, data.stuId, (err, results) => {
        if (err) return res.cc(err)
        var name = results[0].username
        console.log(name, results);
        if (results.length !== 1) return res.cc('学生不存在')
        else {
            const sql2 = "select * from scores where stuid=? and subject=? and date=?"
            db.query(sql2, [data.stuId, data.subject, data.date], (err, results) => {
                if (err) return res.cc(err)
                if (results.length !== 0) return res.cc('成绩已存在，添加失败')
                else {
                    const sql3 = 'insert into scores(subject,stuid,score,date,username) values(?,?,?,?,?)'
                    console.log(name);

                    db.query(sql3, [data.subject, data.stuId, data.score, data.date, name], (err, results) => {
                        if (err) return res.cc(err)
                        if (results.affectedRows !== 1) return res.cc('新增成绩失败!')

                        res.cc('新增成绩成功!', 0)
                    })
                }
            })
        }
    })
}

exports.course_find_del = (req, res) => {
    const sql = 'select * from subjects where isDel=1 order by id asc'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取已删除科目信息成功',
            data: results
        })
    })
}

exports.course_reduction = (req, res) => {

    const sql = 'update subjects set isDel=0 where id=?'
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '还原成功',
        })
    })
}

exports.get_score = (req, res) => {
    var limit = req.query;
    if (limit.hasOwnProperty('search') && limit.hasOwnProperty('content')) {
        let sql1;
        if (limit.search === 'stuid') {
            sql1 = 'select * from scores where isDel = 0 and stuid = ? order by id asc'
        } else if (limit.search === 'username') {
            sql1 = 'select * from scores where isDel = 0 and username = ? order by id asc'
        } else {
            sql1 = 'select * from scores where isDel = 0 and subject = ? order by id asc'
        }
        db.query(sql1, [limit.content], (err, results) => {

            solve(err, results)
        })
    } else {
        const sql2 = 'select * from scores where isDel = 0 order by id asc'
        db.query(sql2, (err, results) => {
            solve(err, results)
        })
    }
    function solve(err, results) {
        if (err) return res.cc(err)
        var data = [];
        // 1 2 [0]、[1]
        // 2 2 [2]、[3]
        // 2 3 [3]、[4]、[5]
        // 2 4 [4]、[5]、[6]、[7]
        // 3 4 [8]、[9]、[10]、[11]
        // 从(limit.pagenum-1)*pagesize开始,到limit.pagenum*pagesize结束，如果为undefined，则不加
        for (var i = (limit.pagenum - 1) * limit.pagesize; i < limit.pagenum * limit.pagesize; i++) {
            if (results[i] !== undefined) {
                data.push(results[i])
            }
        }
        // console.log(limit.pagenum, data);

        res.send({
            status: 0,
            message: '查询成功',
            data,
            total: results.length
        })
    }
}

exports.modify_score = (req, res) => {
    const sql = 'update scores set score = ? where id = ?'
    db.query(sql, [req.body.score, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '修改成功'
        })
    })

}

exports.score_del = (req, res) => {
    console.log(req.params);

    const sql = 'update scores set isDel = 1 where id = ?'
    // db.query(sql, [req.params.id])
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除成功'
        })
    })
}

exports.get_stu_mes = (req, res) => {
    // const sql = "select * from users where isDel=0 and roles = 'student' order by id asc"
    var limit = req.query;
    if (limit.hasOwnProperty('search') && limit.hasOwnProperty('content')) {
        let sql1;
        if (limit.search === 'stuid') {
            sql1 = "select * from users where isDel = 0 and userId = ? and roles='student' order by id asc"
        } else if (limit.search === 'username') {
            sql1 = "select * from users where isDel = 0 and username = ? and roles='student' order by id asc"
        } else {
            sql1 = "select * from users where isDel = 0 and major = ? and roles='student' order by id asc"
        }
        db.query(sql1, [limit.content], (err, results) => {

            solve(err, results)
        })
    } else {
        const sql2 = "select * from users where isDel = 0 and roles='student' order by id asc"
        db.query(sql2, (err, results) => {
            solve(err, results)
        })
    }
    function solve(err, results) {
        if (err) return res.cc(err)
        var data = [];
        for (var i = (limit.pagenum - 1) * limit.pagesize; i < limit.pagenum * limit.pagesize; i++) {
            if (results[i] !== undefined) {
                data.push(results[i])
            }
        }

        res.send({
            status: 0,
            message: '查询成功',
            data,
            total: results.length
        })
    }
}