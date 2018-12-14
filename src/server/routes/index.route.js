import express from 'express';
// Router
import store from './store.route';
import product from './product.route';
import website from './website.route';
import ecpay from './ecpay.route';

import config from './../../config/config';

const router = express.Router();


/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`server started on PORT ${config.port} (${config.env})`);
});

/** Store Router */
router.use('/store', store);
/** Product Router */
router.use('/product', product);
/** Product Router */
router.use('/website', website);
/** ECPay Router */
router.use('/ecpay', ecpay);

export default router;
