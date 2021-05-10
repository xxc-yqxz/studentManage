$(function () {
    const layer = layui.layer;
    const form = layui.form;

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        layer.confirm('确认添加用户?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/logining/user_add',
                method: 'POST',
                data,
                success: function (res) {
                    layer.msg(res.message)
                    $('.reset').click()
                }
            })
            layer.close(index);
        })
    })

})