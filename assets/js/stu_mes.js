$(function () {
    const form = layui.form;
    const layer = layui.layer;
    var laypage = layui.laypage
    var role = window.parent.$('#role').attr('data-role');
    var q = {
        pagenum: 1, // 当前页
        pagesize: 4,    // 每页数据条数
    }
    var formdata;
    var flag = false;
    var data;
    initTable(flag);
    function initTable(is_search) {
        if (!is_search) {
            $.ajax({
                url: '/logining/get_stu_mes',
                method: 'GET',
                data: q,
                success: function (res) {
                    console.log(res);
                    var htmlStr
                    if (role === 'admin') {
                        htmlStr = template('tpl-table', res.data)
                    } else {
                        htmlStr = template('tpl-table2', res.data)
                    }
                    $('tbody').html(htmlStr)
                    renderPage(res.total)
                    form.render()
                }
            })
        } else {
            $.ajax({
                url: '/logining/get_stu_mes',
                method: 'GET',
                data,
                success: function (res) {
                    console.log(res);

                    layer.msg(res.message)
                    var htmlStr
                    if (role === 'admin') {
                        htmlStr = template('tpl-table', res.data)
                    } else {
                        htmlStr = template('tpl-table2', res.data)
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
        console.log(data);
        initTable(flag)
    })
    function updateData() {
        // console.log(q);
        data = formdata;
        for (var i in q) {
            data += '&' + i + '=' + q[i]
        }
    }

    $('tbody').on('click', '#btn1', function (e) {
        e.preventDefault()
        var id = $(this).attr('data-id')
        layer.open({
            type: 2,
            title: '学生详细信息',
            area: ['900px', '800px'],
            content: ['/assets/html/content/stu_info.html', 'no'],
        })
        $('#get_id').attr('data-id', id)
    })
})

