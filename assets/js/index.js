$(function () {
    getUserInfo()

    var layer = layui.layer
})

function getUserInfo() {
    console.log(1);

    $.ajax({
        url: '/logining/stuinfo',
        method: 'GET',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            layui.layer.msg('获取用户信息成功!')
            $(".layui-nav-tree").children().hide();
            console.log(res.roles);

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
        }
    })
}