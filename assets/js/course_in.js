$(function () {
    const layer = layui.layer;
    const form = layui.form;
    var table = layui.table;

    form.on('submit(*)', function (e) {
        var data = $('.layui-form').serialize()

        layer.confirm('确认添加科目?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/logining/course_in',
                method: 'POST',
                data,
                success: function (res) {
                    layer.msg(res.message)
                }
            })
            layer.close(index);
            var timer = setTimeout(function () {
                location.href = '/assets/html/back_stage/course_in.html'
            }, 1000)
        })
        return false;
    })
    form.on('submit(**)', function (e) {
        var data = $('.layui-form').serialize()
        console.log(data);

        layer.confirm('确认删除科目?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/logining/course_del',
                method: 'POST',
                data,
                success: function (res) {
                    layer.msg(res.message)
                }
            })
            layer.close(index);
            var timer = setTimeout(function () {
                location.href = '/assets/html/back_stage/course_in.html'
            }, 500)
        })
        return false;
    })
    $('#deled').on('click', function (e) {
        layer.open({
            type: 2,
            title: '已删除的科目',
            area: ['500px', '300px'],
            content: '/assets/html/content/del_sub.html'
        });
    })
})