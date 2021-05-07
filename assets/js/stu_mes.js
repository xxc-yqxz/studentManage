$(function (content, elem) {
    function ad(content, elem) {
        var name = content
        layui.use('dropdown', function () {
            var dropdown = layui.dropdown;
            dropdown.render({
                elem: elem,
                data: add(),
                click: function (data, othis) {
                    $(elem).html(` ${data.title}
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
    }
    ad(["2018", "2019", "2020", "2021"], "#demo1");
    ad(["软件工程", "物联网", "网络工程", "大数据", "计算机科学与技术"], "#demo2")
    ad(["1班", "2班"], "#demo3")
}
)

