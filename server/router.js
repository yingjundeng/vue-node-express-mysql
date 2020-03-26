const express = require('express');
var router = express.Router();

//const api = require("./api")
const api = require("./api/index")
//const Mock = require('mockjs');        //引入mock模块

router.get('/getUserList', function(req, res, next) {
       api.userInfo.getUserList(req, res, next);
});

// 新增用户
router.get('/addUserList', function(req, res, next) {
       api.userInfo.addUser(req, res, next);
});

// 删除用户
router.get('/deleUser', function(req, res, next) {
       api.userInfo.deleUser(req, res, next);
});

// 修改用户
router.get('/changeUserList', function(req, res, next) {
       api.userInfo.changeUserList(req, res, next);
});




module.exports = router;
