$(async function () {
    var form = layui.form;
    var addressData = await $.getJSON("../../../db/address.json");

    let sheng = $('#sheng');
    let shi = $('#shi');
    let qu = $('#qu');

    var pOption = '<option value="">请选择</option>';

    //省
    addressData.forEach(function (items) {
        pOption += "<option value='" + items.name + "'>" + items.name + "</option>";
        // console.log(sheng.html());
    });
    sheng.html(pOption);
    form.render();

    shi.html('<option value="">请选择</option>')
    qu.html('<option value="">请选择</option>')

    form.on('select(selectfilter1)', getShi)

    form.on('select(selectfilter2)', getQu)

    $.ajax({
        url: '/logining/getdata',
        method: 'GET',
        success: function (res) {
            var native = res.data[0].native.split('|');
            console.log(native);

            form.val('stuInfo', { ...res.data[0], sheng: native[0], shi: native[1], qu: native[2] })
            getShi()
            form.val('stuInfo', { shi: native[1], qu: native[2] })
            form.render()
            getQu()
            form.val('stuInfo', { qu: native[2] })
            form.render()
        }
    })

    function getShi() {
        shi.html('<option value="">请选择</option>')
        qu.html('<option value="">请选择</option>')
        var pId = sheng.val();
        pOption = '';
        addressData.forEach(function (item) {
            if (item.name === pId) {

                item.city.forEach(function (item) {
                    if (item.name === pId) {
                        item.area.forEach(function (item) {
                            var sOption = "<option value='" + item + "'>" + item + "</option>";
                            pOption += sOption;
                        })
                    }
                    else {
                        var sOption = "<option value='" + item.name + "'>" + item.name + "</option>";
                        pOption += sOption;
                    }
                })
            }
            shi.html('<option value="">请选择</option>' + pOption);

            form.render();
        });
    }

    function getQu() {
        qu.html('<option value="">请选择</option>')
        pOption = '';
        // 区
        addressData.forEach(function (item) {
            // 获取省的选中值
            var pId = sheng.val();
            // 获取市的选中值
            var pId2 = shi.val();
            if (item.name === pId) {

                item.city.forEach(function (item) {
                    if (item.name == pId2) {
                        item.area.forEach(function (item) {
                            var sOption = "<option value='" + item + "'>" + item + "</option>";
                            pOption += sOption;
                        })
                    }
                })
            }
            qu.html('<option value="">请选择</option>' + pOption);
        })
        form.render();

    }

    $('#form').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()

        layer.confirm('确认提交修改信息?', { icon: 3, title: '提示' },
            function (index) {
                $.ajax({
                    url: '/logining/setdata',
                    method: 'POST',
                    data,
                    success: function (res) {
                        layer.msg(res.message)
                        form.render()
                    }
                })
                layer.close(index);
            });
    })
})