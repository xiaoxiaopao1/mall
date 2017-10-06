const Koa = require('koa'),
      app = new Koa(),
      KoaRouter = require('koa-router'),
      router = new KoaRouter(),
      koaBody = require('koa-body'),
      mongoose = require('mongoose'),
      user = require('./control/user'),
      poster = require('./control/poster'),
      product = require('./control/product'),
      adminInfo = require('./control/admin'),
      store = require('./control/store'),
      comment = require('./control/comment');

mongoose.connect('mongodb://localhost:27017/mall',{useMongoClient:true});

app.use(koaBody({multipart: true}));  

// 分页产品信息
router.post('/api/productList', product.getProductList)

// 产品数量
router.get('/api/productCount',product.getProductCount)

//前台用户登录信息
router.post('/api/login', user.userCheck);

// 注册信息
router.post('/api/sign', user.addUser);

// 海报图信息
router.get('/api/poster', poster.getPoster)



// 多关键字产品搜索
router.post('/api/getSearchResult', product.getSearchResult)

// 多关键字产品搜索结果数量
router.post('/api/getSearchResultCount', product.getSearchResultCount)


// 接收购物消息，并存储购物信息
router.post('/api/addToStore', store.addToStore)

// 删除购物信息
router.post('/api/delToStore',store.delToStore)

// 接收post过来的用户，获取该用户的购物信息
router.post('/api/getStoreList',store.getStoreList)

// 购物车产品结算
router.post('/api/countToStore',store.countToStore);


// 获取产品评论信息
router.post('/api/getCommentList',comment.getCommentList);



// 添加产品评论
router.post('/api/addToComment',comment.addToComment);


// 后台管理员信息
router.post('/api/backStage/adminInfo',adminInfo.adminCheck);

// 后台产品录入功能
router.post('/api/backStage/addProduct',product.addProduct);

// 后台产品删除功能
router.post('/api/backStage/delProduct',product.delProduct);

// 后台产品更新功能
router.post('/api/backStage/updateProduct',product.updateProduct);

// 后台单个产品信息获取
router.post('/api/backStage/getSingleProduct',product.getSingleProduct);

// 开始服务并生成路由
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3000);


