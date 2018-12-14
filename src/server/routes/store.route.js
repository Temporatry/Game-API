import express from 'express';
import storeCtrl from '../controllers/store.controller';

const router = express.Router();

router.route('/')
  .get(storeCtrl.storeGet); /** 取得 Store 所有值組 */

router.route('/region')
  .get(storeCtrl.storeRegionGet); /** 取得 Store_Region 所有值組 */

router.route('/area')
  .get(storeCtrl.storeAreaGet); /** 取得 Store_Area 所有值組 */

export default router;
