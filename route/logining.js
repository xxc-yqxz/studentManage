const express = require('express');
const router = express();

const userinfo_handler = require('./route_methods/logining')

router.get('/index', userinfo_handler.index)

router.get('/stuinfo', userinfo_handler.stuinfo)

router.get('/score', userinfo_handler.score)

router.get('/getdata', userinfo_handler.getdata)

router.post('/setdata', userinfo_handler.setdata)

router.post('/modifypwd', userinfo_handler.modifypwd)

router.post('/course_in', userinfo_handler.course_in)

router.post('/course_del', userinfo_handler.course_del)

router.get('/course_find_del', userinfo_handler.course_find_del)

router.post('/user_add', userinfo_handler.user_add)

router.get('/get_subject', userinfo_handler.get_subject)

router.post('/score_in', userinfo_handler.score_in)

router.get('/course_reduction/:id', userinfo_handler.course_reduction)

router.get('/get_score', userinfo_handler.get_score)

router.post('/modify_score', userinfo_handler.modify_score)

router.get('/score_del/:id', userinfo_handler.score_del)

router.get('/get_stu_mes', userinfo_handler.get_stu_mes)

module.exports = router;