$(function () {
    var form = layui.form;
    var layer = layui.layer;

    $.ajax({
        url: '/logining/get_subject',
        method: 'GET',
        success: function (res) {
            var data = { ...res.data };
            for (var i in data) {
                $('#subject').append(`<option value="${data[i].subject}">${data[i].subject}</option>`)
            }
            form.render()
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize();

        layer.confirm('确认添加成绩?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                url: '/logining/score_in',
                method: 'POST',
                data,
                success: function (res) {
                    layer.msg(res.message)
                    $('.reset').click()
                }
            })
            layer.close(index);
            var timer = setTimeout(function () {
                location.href = '/assets/html/back_stage/score_in.html'
            }, 500)
        })
    })
})