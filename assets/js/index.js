$(function () {
    getUserInfo()


    var layer = layui.layer

    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', {
            icon: 3, title: '提示', color: 'black'
        }, function (index) {
            localStorage.removeItem('token')

            location.href = '/assets/html/login.html'
            layer.close(index)
        }, function (index, layero) {
            $('.layui-nav-item').removeClass('layui-this')
        })
    })

    $('.layui-nav-item').on('mouseover', function () {
        $(this).removeClass('layui-this')
    })
})

function getUserInfo() {

    $.ajax({
        url: '/logining/stuinfo',
        method: 'GET',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            layui.layer.msg('获取用户信息成功!')
            $(".layui-nav-tree").children().hide();

            if (res.roles === 'student') {
                $('.cjcx').show();
                $('.xjcx').show();
                $('.xxmm').show();
            }
            if (res.roles === 'admin') {
                $('.xxmm').show();
                $('.cxxsxx').show();
                $('.cxxscj').show();
                $('.xzkm').show();
                $('.rlcj').show();
                $('.xzyh').show();
            }
            if (res.roles === 'teacher') {
                $('.xxmm').show();
                $('.cxxsxx').show();
                $('.cxxscj').show();
                $('.rlcj').show();
            }
            $('.username').html('你好，' + res.username)
            $('#role').attr('data-role', res.roles)

        }
    })
}