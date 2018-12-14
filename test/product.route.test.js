import { expect } from 'chai';
import request from 'supertest';

import app from '../src/index';

describe('# product(商品)', () => {
  describe('## Success Test', () => {
    /**
     * product CRUD測試
     * */
    const productModule = 'NAC-85T-TG-test';
    describe('when enter product(商品) api [POST]', () => {
      it('it should return 200', (done) => {
        request(app)
          .post('/product')
          .send({
            model: productModule,
            product: 'NAZCA 85T納茲卡(單把) 紅綠黃',
            price: 3310,
            image: 'google.com',
            category: '前打輪',
            series: '山茶系列',
            images: '["https://goo.gl/gh4pMo"]'
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    // 查詢全部商品
    describe('when enter product(商品) api [GET]', () => {
      it('it should return 200', (done) => {
        request(app)
          .get('/product')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('array');
            done(err);
          });
      });
    });
    // 使用型號查詢商品
    describe('when enter product(商品) 型號查詢 api [GET]', () => {
      it('it should return 200', (done) => {
        request(app)
          .get(`/product/${productModule}`)
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    // 使用類別查詢商品
    describe('when enter product(商品) 類別查詢 api [GET]', () => {
      it('it should return 200', (done) => {
        request(app)
          .get('/product?category=%E5%89%8D%E6%89%93%E8%BC%AA')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('array');
            done(err);
          });
      });
    });
    // 使用系列查詢商品
    describe('when enter product(商品) 系列查詢 api [GET]', () => {
      it('it should return 200', (done) => {
        request(app)
          .get('/product?series=Nazca')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('array');
            done(err);
          });
      });
    });
    describe('when enter product(商品) api [PUT]', () => {
      it('it should return 200', (done) => {
        request(app)
          .put(`/product/${productModule}`)
          .send({
            model: productModule,
            product: 'NAZCA 85T納茲卡(單把) 紅綠黃',
            price: 3310,
            image: 'google.com',
            category: '前打輪',
            series: '山茶系列',
            images: '["https://goo.gl/gh4pMo"]'
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter product(商品) api [DELETE]', () => {
      it('it should return 200', (done) => {
        request(app)
          .delete(`/product/${productModule}`)
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });

    /**
     * product category CRUD測試
     * */
    let productCategoryId;
    describe('when enter category(商品類別) api [POST]', () => {
      it('it should return 200', (done) => {
        request(app)
          .post('/product/category')
          .send({
            img: 'https://i.imgur.com/',
            name: '保養(測試新增)',
            description: '商品描述'
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            productCategoryId = result.insertId;
            done(err);
          });
      });
    });
    describe('when enter category(商品類別) api [GET]', () => {
      it('it should return 200', (done) => {
        request(app)
          .get('/product/category')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter category(商品類別) api [PUT]', () => {
      it('it should return 200', (done) => {
        request(app)
          .put(`/product/category?id=${productCategoryId}`)
          .send({
            img: 'https://i.imgur.com/',
            name: '保養(測試修改)',
            description: '商品描述'
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter category(商品類別) api [DELETE]', () => {
      it('it should return 200', (done) => {
        request(app)
          .delete(`/product/category?id=${productCategoryId}`)
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });

    /**
     * product series CRUD測試
     * */
    let productSeriesId;
    describe('when enter series(商品系列) api [POST]', () => {
      it('it should return 200', (done) => {
        request(app)
          .post('/product/series')
          .send({
            category_id: 1,
            img: 'https://imgur.com/',
            name: '牛車輪(測試新增)',
            description: '系列描述'
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            productSeriesId = result.insertId;
            done(err);
          });
      });
    });
    describe('when enter series(商品系列) api [GET]', () => {
      it('it should return 200', (done) => {
        request(app)
          .get('/product/series')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter series(商品系列) api [PUT]', () => {
      it('it should return 200', (done) => {
        request(app)
          .put(`/product/series?id=${productSeriesId}`)
          .send({
            category_id: 1,
            img: 'https://imgur.com/',
            name: '牛車輪(測試修改)',
            description: '系列描述'
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter series(商品系列) api [DELETE]', () => {
      it('it should return 200', (done) => {
        request(app)
          .delete(`/product/series?id=${productSeriesId}`)
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });

    /**
     * product card CRUD測試
     * */
    let productCardId;
    describe('when enter card(商品卡片) api [POST]', () => {
      it('it should return 200', (done) => {
        request(app)
          .post('/product/card')
          .send({
            name: 'NAZCA 85T納茲卡(測試新增)',
            detail: '{"id": 1, "ean": "4712865360606", "name": "NAZCA 85T納茲卡(單把) 鈦灰", "unit": "EA", "model": "NAC-85T-TG", "price": {"rrp": "3280", "wsp": "1640", "eomp": "1970", "chainp": "1805"}, "stock": "21", "created": "2017/05/08", "creator": "JDA", "updated": "2017/05/38"}',
            lightbox: '[\n        "https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Fcard%2Flightbox%2F97668e90-8098-4bea-afd2-28027ea5344c?alt=media&token=2df0208c-7928-4779-a474-178e76e065cb"]',
            intro: '[\n        "https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Fcard%2Fintro%2Fc0e5a120-f7a9-42bf-9a90-e8d3fd97042a?alt=media&token=cc61579d-3f74-41c5-a0db-f3c77ea6d4ab"]',
            video: null
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            productCardId = result.insertId;
            done(err);
          });
      });
    });
    describe('when enter card(商品卡片) api [GET]', () => {
      it('it should return 200', (done) => {
        request(app)
          .get('/product/card')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter card(商品卡片) api [PUT]', () => {
      it('it should return 200', (done) => {
        request(app)
          .put(`/product/card?id=${productCardId}`)
          .send({
            name: 'NAZCA 85T納茲卡(測試修改)',
            detail: '{"id": 1, "ean": "4712865360606", "name": "NAZCA 85T納茲卡(單把) 鈦灰", "unit": "EA", "model": "NAC-85T-TG", "price": {"rrp": "3280", "wsp": "1640", "eomp": "1970", "chainp": "1805"}, "stock": "21", "created": "2017/05/08", "creator": "JDA", "updated": "2017/05/38"}',
            lightbox: '[\n        "https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Fcard%2Flightbox%2F97668e90-8098-4bea-afd2-28027ea5344c?alt=media&token=2df0208c-7928-4779-a474-178e76e065cb"]',
            intro: '[\n        "https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Fcard%2Fintro%2Fc0e5a120-f7a9-42bf-9a90-e8d3fd97042a?alt=media&token=cc61579d-3f74-41c5-a0db-f3c77ea6d4ab"]',
            video: null
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter card(商品卡片) api [DELETE]', () => {
      it('it should return 200', (done) => {
        request(app)
          .delete(`/product/card?id=${productCardId}`)
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
  });
  describe('## Error Test', () => {
    /**
     * product CRUD測試
     * */
    let productModule;
    describe('when enter product(商品) api [POST]', () => {
      it('it should return 400', (done) => {
        request(app)
          .post('/product')
          .send({
            names: 'NAZCA 85T納茲卡(測試新增)', // 欄位故意命名錯誤
            model: 'NAC-85T-TG',
            unit: 'EA',
            stock: 21,
            ean: '4712865360606',
            price: {
              rrp: '3280', wsp: '1640', eomp: '1970', chainp: '1805'
            }
          })
          .set('Accept', 'application/json')
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            productModule = 'ERROR_ID';
            done(err);
          });
      });
    });
    describe('when enter product(商品) api [PUT]', () => {
      it('it should return 400', (done) => {
        request(app)
          .put(`/product/${productModule}`)
          .send({
            name: 'NAZCA 85T納茲卡(測試修改)',
            model: 'NAC-85T-TG',
            unit: 'EA',
            stock: 21,
            ean: '4712865360606',
            price: {
              rrp: '3280', wsp: '1640', eomp: '1970', chainp: '1805'
            }
          })
          .set('Accept', 'application/json')
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter product(商品) api [DELETE]', () => {
      it('it should return 400', (done) => {
        request(app)
          .delete(`/product/${productModule}`)
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });

    /**
     * product category CRUD測試
     * */
    let productCategoryId;
    describe('when enter category(商品類別) api [POST]', () => {
      it('it should return 400', (done) => {
        request(app)
          .post('/product/category')
          .send({
            imgs: 'https://i.imgur.com/', // 欄位故意命名錯誤
            name: '保養(測試新增)',
            description: '商品描述'
          })
          .set('Accept', 'application/json')
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            productCategoryId = 'ERROR_ID';
            done(err);
          });
      });
    });
    describe('when enter category(商品類別) api [PUT]', () => {
      it('it should return 400', (done) => {
        request(app)
          .put(`/product/category?id=${productCategoryId}`)
          .send({
            img: 'https://i.imgur.com/',
            name: '保養(測試修改)',
            description: '商品描述'
          })
          .set('Accept', 'application/json')
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter category(商品類別) api [DELETE]', () => {
      it('it should return 400', (done) => {
        request(app)
          .delete(`/product/category?id=${productCategoryId}`)
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });

    /**
     * product series CRUD測試
     * */
    let productSeriesId;
    describe('when enter series(商品系列) api [POST]', () => {
      it('it should return 400', (done) => {
        request(app)
          .post('/product/series')
          .send({
            category_ids: 1, // 欄位故意命名錯誤
            img: 'https://imgur.com/',
            name: '牛車輪(測試新增)',
            description: '系列描述'
          })
          .set('Accept', 'application/json')
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            productSeriesId = 'ERROR_ID';
            done(err);
          });
      });
    });
    describe('when enter series(商品系列) api [PUT]', () => {
      it('it should return 400', (done) => {
        request(app)
          .put(`/product/series?id=${productSeriesId}`)
          .send({
            category_id: 1,
            img: 'https://imgur.com/',
            name: '牛車輪(測試修改)',
            description: '系列描述'
          })
          .set('Accept', 'application/json')
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter series(商品系列) api [DELETE]', () => {
      it('it should return 400', (done) => {
        request(app)
          .delete(`/product/series?id=${productSeriesId}`)
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });

    /**
     * product card CRUD測試
     * */
    let productCardId;
    describe('when enter card(商品卡片) api [POST]', () => {
      it('it should return 400', (done) => {
        request(app)
          .post('/product/card')
          .send({
            names: 'NAZCA 85T納茲卡(測試新增)', // 欄位故意命名錯誤
            detail: '{"id": 1, "ean": "4712865360606", "name": "NAZCA 85T納茲卡(單把) 鈦灰", "unit": "EA", "model": "NAC-85T-TG", "price": {"rrp": "3280", "wsp": "1640", "eomp": "1970", "chainp": "1805"}, "stock": "21", "created": "2017/05/08", "creator": "JDA", "updated": "2017/05/38"}',
            lightbox: '[\n        "https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Fcard%2Flightbox%2F97668e90-8098-4bea-afd2-28027ea5344c?alt=media&token=2df0208c-7928-4779-a474-178e76e065cb"]',
            intro: '[\n        "https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Fcard%2Fintro%2Fc0e5a120-f7a9-42bf-9a90-e8d3fd97042a?alt=media&token=cc61579d-3f74-41c5-a0db-f3c77ea6d4ab"]',
            video: null
          })
          .set('Accept', 'application/json')
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            productCardId = 'ERROR_ID';
            done(err);
          });
      });
    });
    describe('when enter card(商品卡片) api [PUT]', () => {
      it('it should return 400', (done) => {
        request(app)
          .put(`/product/card?id=${productCardId}`)
          .send({
            name: 'NAZCA 85T納茲卡(測試修改)',
            detail: '{"id": 1, "ean": "4712865360606", "name": "NAZCA 85T納茲卡(單把) 鈦灰", "unit": "EA", "model": "NAC-85T-TG", "price": {"rrp": "3280", "wsp": "1640", "eomp": "1970", "chainp": "1805"}, "stock": "21", "created": "2017/05/08", "creator": "JDA", "updated": "2017/05/38"}',
            lightbox: '[\n        "https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Fcard%2Flightbox%2F97668e90-8098-4bea-afd2-28027ea5344c?alt=media&token=2df0208c-7928-4779-a474-178e76e065cb"]',
            intro: '[\n        "https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Fcard%2Fintro%2Fc0e5a120-f7a9-42bf-9a90-e8d3fd97042a?alt=media&token=cc61579d-3f74-41c5-a0db-f3c77ea6d4ab"]',
            video: null
          })
          .set('Accept', 'application/json')
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter card(商品卡片) api [DELETE]', () => {
      it('it should return 400', (done) => {
        request(app)
          .delete(`/product/card?id=${productCardId}`)
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
  });
});
