$(function () {
    var form = layui.form;
    var layer = layui.layer;
    $.ajax({
        url: '/logining/course_find_del',
        method: 'GET',
        success: function (res) {
            var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
            form.render()
        }
    })
    $('tbody').on('click', '.btn-del', function (e) {

        var id = $(this).attr('data-id');
        layer.confirm('确认还原科目?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/logining/course_reduction/' + id,
                method: 'GET',
                success: function (res) {
                    layer.msg(res.message)
                }
            })
            layer.close(index);
            var timer = setTimeout(function () {
                location.href = '/assets/html/content/del_sub.html'
            }, 500)
        })
        return false;
    })
})