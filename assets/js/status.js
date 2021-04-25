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

    form.on('select(selectfilter1)', function () {
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
            shi.html(pOption);

            form.render();
        });
    })

    form.on('select(selectfilter2)', function () {
        qu.html('<option value="">请选择</option>')
        pOption = '';
        // 区
        addressData.forEach(function (item) {
            // 获取省的选中值
            var pId = sheng.val();
            // 获取市的选中值
            var pId2 = shi.val();
            if (item.name === pId) {
                console.log(1);

                item.city.forEach(function (item) {
                    if (item.name == pId2) {
                        item.area.forEach(function (item) {
                            var sOption = "<option value='" + item + "'>" + item + "</option>";
                            pOption += sOption;
                        })
                    }
                })
            }
            qu.html(pOption);
        })
        form.render();

    })

})