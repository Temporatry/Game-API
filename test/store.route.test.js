import { expect } from 'chai';
import request from 'supertest';

import app from '../src/index';

describe('# store(商店)', () => {
  describe('# Success Test', () => {
    /**
     * store 測試
     * */
    describe('when enter store api', () => {
      it('it should return 200', (done) => {
        request(app)
          .get('/store')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result[0].id).to.be.a('number');
            done(err);
          });
      });
    });

    describe('when enter region(商店地區) api', () => {
      it('it should return 200', (done) => {
        request(app)
          .get('/store/region')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });

    describe('when enter area(商店國家) api', () => {
      it('it should return 200', (done) => {
        request(app)
          .get('/store/area')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('array');
            done(err);
          });
      });
    });
  });
});
