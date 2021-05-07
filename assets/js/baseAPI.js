$.ajaxPrefilter(function (options) {
    options.url = 'http://localhost' + options.url;

    // 统一为有权限的接口，设置 headers 请求头

    if (options.url.indexOf('/logining/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
})