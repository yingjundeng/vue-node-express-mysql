var path = require('path')
const express = require('express');
const app = express();
const router = require('./router.js');


//app.use(bodyParser.json());

// 后端api路由
app.use('/', router);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');
