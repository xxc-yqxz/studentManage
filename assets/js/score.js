$(function () {
    var name = ["2018 - 1", "2018 - 2", "2019 - 1", "2019 - 2", "2020 - 1", "2020 - 2"]
    layui.use('dropdown', function () {
        var dropdown = layui.dropdown;
        dropdown.render({
            elem: '#demo1',
            data: add(),
            click: function (data, othis) {
                $('#demo1').html(` ${data.title}
                <i class="layui-icon layui-icon-down layui-font-12"></i>`);
            }
        })
    })
    function add() {
        var arr = [];
        for (var i in name) {
            arr.push({ title: name[i], id: i })
        };
        return arr;
    }
})