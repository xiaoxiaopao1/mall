const Koa = require('koa'),
      app = new Koa(),
      KoaRouter = require('koa-router'),
      router = new KoaRouter(),
      koaBody = require('koa-body'),
      mongoose = require('mongoose'),
      user = require('./control/user'),
      poster = require('./control/poster'),
      product = require('./control/product');

const adminProduct = require('./admin/control/product');
const adminInfo = require('./admin/control/admin');

let search = require('./search/search');


mongoose.connect('mongodb://localhost:27017/mall',{useMongoClient:true});

app.use(koaBody({multipart: true}));  

//用户信息
router.get('/api/login', user.getUser);

// 注册信息
router.post('/api/sign', user.postUser);

// 海报图信息
router.get('/api/poster', poster.getPoster)

// 所有产品信息
router.get('/api/product', product.getAllProduct)

// 多关键字产品搜索
router.post('/api/searchPost', product.findSearchProduct)


// 接收购物消息，并存储到用户信息中的storeList
router.post('/api/store', user.addStore)


// 后台管理员信息
router.post('/api/backStage/adminInfo',adminInfo.adminCheck);
// 后台录入页
router.post('/api/backStage/addProduct',adminProduct.addProduct);

// 开始服务并生成路由
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);

