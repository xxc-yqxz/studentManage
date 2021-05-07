const express = require('express');
const router = express();

const userinfo_handler = require('./route_methods/logining')

router.get('/index', userinfo_handler.index)

router.get('/stuinfo', userinfo_handler.stuinfo)

module.exports = router;