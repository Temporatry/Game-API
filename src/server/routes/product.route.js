import express from 'express';
import productCtrl from '../controllers/product.controller';

const router = express.Router();

router.route('/gogame/:game_id')
  .get(productCtrl.gameGet) /** 取得 Product_Category 所有值組 */

router.route('/category')
  .get(productCtrl.productCategoryGet) /** 取得 Product_Category 所有值組 */
  .post(productCtrl.productCategoryPost) /** 新增 Product_Category 所有值組 */
  .put(productCtrl.productCategoryPut) /** 修改 Product_Category 所有值組 */
  .delete(productCtrl.productCategoryDelete); /** 修改 Product 所有值組 */

router.route('/series')
  .get(productCtrl.productSeriesGet) /** 取得 Product_Series 所有值組 */
  .post(productCtrl.productSeriesPost) /** 新增 Product_Series 所有值組 */
  .put(productCtrl.productSeriesPut) /** 修改 Product_Series 所有值組 */
  .delete(productCtrl.productSeriesDelete); /** 修改 Product_Series 所有值組 */

router.route('/card')
  .get(productCtrl.productCardGet) /** 取得 Product_Card 所有值組 */
  .post(productCtrl.productCardPost) /** 新增 Product_Card 所有值組 */
  .put(productCtrl.productCardPut) /** 修改 Product_Card 所有值組 */
  .delete(productCtrl.productCardDelete); /** 修改 Product_Series 所有值組 */

router.route('/')
  .get(productCtrl.productGet) /** 取得 Product 所有值組 */
  .post(productCtrl.productPost); /** 新增 Product 所有值組 */

router.route('/:model')
  .get(productCtrl.productItemGet) /** 取得 Product 所有值組 */
  .put(productCtrl.productPut) /** 修改 Product 所有值組 */
  .delete(productCtrl.productDelete); /** 修改 Product 所有值組 */

export default router;
