$(function () {
    var form = layui.form
    var layer = layui.layer
    var laypage = layui.laypage
    var q = {
        pagenum: 1, // 当前页
        pagesize: 4,    // 每页数据条数
    }
    var formdata;
    var flag = false;
    var data;
    var role = window.parent.$('#role').attr('data-role');

    initTable(flag);
    function initTable(is_search) {
        if (!is_search) {
            $.ajax({
                url: '/logining/get_score',
                method: 'GET',
                data: q,
                success: function (res) {
                    var htmlStr
                    if (role === 'admin') {
                        htmlStr = template('tpl-table', res)
                    } else {
                        htmlStr = template('tpl-table2', res)
                    }
                    $('tbody').html(htmlStr)
                    renderPage(res.total)
                    form.render()
                }
            })
        } else {
            $.ajax({
                url: '/logining/get_score',
                method: 'GET',
                data,
                success: function (res) {
                    layer.msg(res.message)
                    var htmlStr
                    if (role === 'admin') {
                        htmlStr = template('tpl-table', res)
                    } else {
                        htmlStr = template('tpl-table2', res)
                    }
                    $('tbody').html(htmlStr)
                    renderPage(res.total)
                    form.render()
                }
            })
        }
    }

    function renderPage(total) {
        data = ''
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum, // 当前页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [4, 7, 10],
            jump: function (obj, first) {
                // 可以通过first的值来判断是通过那种方式触发的jump函数
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                updateData()
                if (!first) {
                    initTable(flag)
                }
            }
        })
    }

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        flag = true;
        formdata = $(this).serialize()
        updateData()
        initTable(flag)
    })
    function updateData() {
        // console.log(q);
        data = formdata;
        for (var i in q) {
            data += '&' + i + '=' + q[i]
        }
    }

    $('tbody').on('click', '#modify', function (e) {
        e.preventDefault()
        var id = $(this).attr('data-id')
        layer.open({
            type: 1,
            title: '修改成绩信息',
            area: ['500px', '200px'],
            content: $('#mod-tpl').html(),
            success: function () {
                $('#mod-form').on('submit', function (e) {
                    e.preventDefault()
                    $.ajax({
                        url: '/logining/modify_score',
                        method: 'POST',
                        data: $(this).serialize() + '&' + 'id=' + id,
                        success: function (res) {
                            layer.msg(res.message)
                            var timer = setTimeout(function () {
                                location.href = '/assets/html/back_stage/stu_score.html'
                            }, 500)
                        }
                    })
                    layer.close()
                })

            }
        })
    })

    $('tbody').on('click', '#del', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-id')
        layer.confirm('确认删除此条成绩?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/logining/score_del/' + id,
                method: 'GET',
                success: function (res) {
                    layer.msg(res.message)
                    var timer = setTimeout(function () {
                        location.href = '/assets/html/back_stage/stu_score.html'
                    }, 500)
                }
            })
            layer.close()
        })
    })
})