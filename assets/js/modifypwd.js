$(function () {
    var layer = layui.layer;
    var form = layui.form;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.layui-input[name=new1]').val()
            if (pwd !== value) {
                return '两次输入密码不一致!'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        layer.confirm('确认修改密码?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/logining/modifypwd',
                method: 'POST',
                data,
                success: function (res) {
                    layer.msg(res.message)
                }
            })
            localStorage.removeItem('token')

            window.parent.location.href = '/assets/html/login.html'
            layer.close(index);
        })
    })
})