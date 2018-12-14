import express from 'express';
import websiteCtrl from '../controllers/website.controller';

const router = express.Router();

router.route('/shelve')
  .get(websiteCtrl.websiteShelveGet) /** 取得 Website_Shelve 所有值組 */
  .post(websiteCtrl.websiteShelvePost) /** 新增 Website_Shelve 所有值組 */
  .put(websiteCtrl.websiteShelvePut) /** 修改 Website_Shelve 所有值組 */
  .delete(websiteCtrl.websiteShelveDelete); /** 刪除 Website_Shelve 所有值組 */

export default router;
