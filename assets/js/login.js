$(function () {
    var form = layui.form;
    var layer = layui.layer;

    $("#form_login").submit(function (e) {

        e.preventDefault();

        $.ajax({
            url: '/unlogin/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                // 将token值存储到localStorage中。
                localStorage.setItem('token', res.token);
                location.href = '/assets/html/index.html';
            }
        })
    })
})