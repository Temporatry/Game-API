import productModule from '../modules/product.module';



const gameGet = (req, res, next) => {
  const gameId = req.params.game_id;
  productModule.selectGame(gameId).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
const test = (req, res, next) => {
    //res.json("{a:123}"); // 成功回傳result結果
    res.send('scfdsf');
};
/**
 * Product 資料表
 */
/*  Product GET 取得  */
const productGet = (req, res, next) => {
  productModule.selectProduct(req.query.category, req.query.series).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/* Product Item GET 取得 */
const productItemGet = (req, res, next) => {
  productModule.selectProductItem(req.params.model).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};

/*  Product POST 新增  */
const productPost = (req, res, next) => {
  // 取得新增參數
  const insertValues = {
    product_model: req.body.model,
    product_name: req.body.product,
    product_rrp: JSON.stringify(req.body.price),
    product_image: req.body.image,
    product_category: req.body.category,
    product_series: req.body.series,
    product_images: req.body.images
  };
  productModule.createProduct(insertValues).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/*  Product PUT 修改  */
const productPut = (req, res, next) => {
  // 取得修改參數
  const insertValues = {
    product_model: req.body.model,
    product_name: req.body.product,
    product_rrp: JSON.stringify(req.body.price),
    product_image: req.body.image,
    product_category: req.body.category,
    product_series: req.body.series,
    product_images: req.body.images
  };
  // 取得要被修改的產品型號
  const productModel = req.params.model;
  productModule.modifyProduct(insertValues, productModel).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/* Product DELETE 刪除 */
const productDelete = (req, res, next) => {
  // 取得刪除的產品型號
  const productModel = req.params.model;
  productModule.deleteProduct(productModel).then((result) => {
    res.json(result); // 回傳刪除成功訊息
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};

/**
 * Product_Category 資料表
 */
/*  Product_Category GET 取得  */
const productCategoryGet = (req, res, next) => {
  productModule.selectProductCategory().then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/*  Product_Category POST 新增  */
const productCategoryPost = (req, res, next) => {
  // 取得新增參數
  const insertValues = {
    product_category_img: req.body.img,
    product_category_name: req.body.name,
    product_category_description: req.body.description
  };
  productModule.createProductCategory(insertValues).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/*  Product_Category PUT 修改  */
const productCategoryPut = (req, res, next) => {
  // 取得修改參數
  const insertValues = {
    product_category_img: req.body.img,
    product_category_name: req.body.name,
    product_category_description: req.body.description
  };
  // 取得修改id
  const modifyId = req.query.id;
  productModule.modifyProductCategory(insertValues, modifyId).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/* Product_Category DELETE 刪除 */
const productCategoryDelete = (req, res, next) => {
  // 取得刪除id
  const deleteId = req.query.id;
  productModule.deleteProductCategory(deleteId).then((result) => {
    res.json(result); // 回傳刪除成功訊息
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};

/**
 * Product_Series 資料表
 */
/*  Product_Series GET 取得  */
const productSeriesGet = (req, res, next) => {
  const productCategoryId = req.query.id; // 取得 url 中的 product_series_id 參數
  productModule.selectProductSeries(productCategoryId).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/*  Product_Series POST 新增  */
const productSeriesPost = (req, res, next) => {
  // 取得新增參數
  const insertValues = {
    product_category_id: req.body.category_id,
    product_series_img: req.body.img,
    product_series_name: req.body.name,
    product_series_description: req.body.description
  };
  productModule.createProductSeries(insertValues).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/*  Product_Series PUT 修改  */
const productSeriesPut = (req, res, next) => {
  // 取得修改參數
  const insertValues = {
    product_category_id: req.body.category_id,
    product_series_img: req.body.img,
    product_series_name: req.body.name,
    product_series_description: req.body.description
  };
  // 取得修改id
  const modifyId = req.query.id;
  productModule.modifyProductSeries(insertValues, modifyId).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/* Product_Series DELETE 刪除 */
const productSeriesDelete = (req, res, next) => {
  // 取得刪除id
  const deleteId = req.query.id;
  productModule.deleteProductSeries(deleteId).then((result) => {
    res.json(result); // 回傳刪除成功訊息
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};

/**
 * Product_Card 資料表
 */
/*  Product_Card GET 取得  */
const productCardGet = (req, res, next) => {
  const productCardId = req.query.id; // 取得 url 中的 product_card_id 參數
  productModule.selectProductCard(productCardId).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/*  Product_Card POST 新增  */
const productCardPost = (req, res, next) => {
  // 取得新增參數
  const insertValues = {
    product_card_name: req.body.name,
    product_card_detail: JSON.stringify(req.body.detail),
    product_card_lightbox: JSON.stringify(req.body.lightbox),
    product_card_intro: JSON.stringify(req.body.intro),
    product_card_video: req.body.video
  };
  productModule.createProductCard(insertValues).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/*  Product_Card PUT 修改  */
const productCardPut = (req, res, next) => {
  // 取得修改參數
  const insertValues = {
    product_card_name: req.body.name,
    product_card_detail: JSON.stringify(req.body.detail),
    product_card_lightbox: JSON.stringify(req.body.lightbox),
    product_card_intro: JSON.stringify(req.body.intro),
    product_card_video: req.body.video
  };
  // 取得修改id
  const modifyId = req.query.id;
  productModule.modifyProductCard(insertValues, modifyId).then((result) => {
    res.json(result); // 成功回傳result結果
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};
/* Product_Card DELETE 刪除 */
const productCardDelete = (req, res, next) => {
  // 取得刪除id
  const deleteId = req.query.id;
  productModule.deleteProductCard(deleteId).then((result) => {
    res.json(result); // 回傳刪除成功訊息
  }).catch((error) => { next(error); }); // 失敗回傳錯誤訊息
};

// const test = (req, res) => {
//   res.send('測試');
// };

export default {
  gameGet,
  test,
  productGet,
  productItemGet,
  productPost,
  productPut,
  productDelete,
  productCategoryGet,
  productCategoryPost,
  productCategoryPut,
  productCategoryDelete,
  productSeriesGet,
  productSeriesPost,
  productSeriesPut,
  productSeriesDelete,
  productCardGet,
  productCardPost,
  productCardPut,
  productCardDelete
};

