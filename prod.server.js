var express = require('express')
var config = require('./config/index')
// 当前环境变量的PORT
var port = process.env.PORT || config.build.port

var app = express()
var router = express.Router()

router.get('/', function (req, res, next) {
  req.url = '/index.html'
  next()
})
app.use(router)

// 定义异步接口
var apiRoutes = express.Router()
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

apiRoutes.get('/seller', function(req, res){
  res.json({
    errno: 0,
    data: seller
  })
})
apiRoutes.get('/goods', function(req, res){
  res.json({
    errno: 0,
    data: goods
  })
})
apiRoutes.get('/ratings', function(req, res){
  res.json({
    errno: 0,
    data: ratings
  })
})
app.use('/api', apiRoutes);

// 定义static目录
app.use(express.static('./dist'))

// express启动服务
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening in at http://localhost:' + port + '\n')
})
