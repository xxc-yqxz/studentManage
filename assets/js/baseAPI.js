$.ajaxPrefilter(function (options) {
    if (options.url.indexOf('/db/') === -1) {
        options.url = 'http://localhost' + options.url;
    }

    // 统一为有权限的接口，设置 headers 请求头

    if (options.url.indexOf('/logining/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
            localStorage.removeItem('token')
            location.href = '/assets/html/login.html'
        }
    }
})