import { expect } from 'chai';
import request from 'supertest';

import app from '../src/index';

describe('# website(官網)', () => {
  describe('## Success Test', () => {
    /**
     * shelve CRUD測試
     * */
    let websiteShelveId;
    describe('when enter shelve(上架) api [POST]', () => {
      it('it should return 200', (done) => {
        request(app)
          .post('/website/shelve')
          .send({
            id: 4,
            series_id: 2,
            page: '[https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2Fed73b97f-c890-49c6-8c87-3adcb2744f6e?alt=media&token=a64907c8-a7d7-4f0d-8c99-86b5cfb856ef, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2Fdfad26b2-84cc-4ee0-9dc7-5456cf597c5c?alt=media&token=f23a561e-9997-43a1-94f9-b6617f92b9ae, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2F4cf6a864-bd06-442f-8502-0aa0325c2ddd?alt=media&token=7ebb9de7-8f3d-4f8c-aa7d-86931dcc36c6, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2F601ed14f-1744-48a7-9c79-b057efaa57b5?alt=media&token=24dba361-3396-4daa-aa48-e32351999a58, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2F49f708c3-5de0-454a-b228-300cb4680cec?alt=media&token=e1a9df28-0e0d-4538-bb37-92536bc0a1e5, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2Fdb9eed98-f171-4998-9f53-2c8d6e70ae96?alt=media&token=39d30126-72e3-482c-9f7b-638c74c4e652]',
            cards: '[2,4,6,8]'
          })
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            websiteShelveId = result.insertId;
            done(err);
          });
      });
    });
    describe('when enter shelve(上架) api [GET]', () => {
      it('it should return 200', (done) => {
        request(app)
          .get('/website/shelve')
          .set('Accept', 'application/json')
          .expect(200)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter shelve(上架) api [PUT]', () => {
      it('it should return 200', (done) => {
        request(app)
          .put(`/website/shelve?id=${websiteShelveId}`)
          .send({
            id: 4,
            series_id: 2,
            page: '[https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2Fed73b97f-c890-49c6-8c87-3adcb2744f6e?alt=media&token=a64907c8-a7d7-4f0d-8c99-86b5cfb856ef, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2Fdfad26b2-84cc-4ee0-9dc7-5456cf597c5c?alt=media&token=f23a561e-9997-43a1-94f9-b6617f92b9ae, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2F4cf6a864-bd06-442f-8502-0aa0325c2ddd?alt=media&token=7ebb9de7-8f3d-4f8c-aa7d-86931dcc36c6, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2F601ed14f-1744-48a7-9c79-b057efaa57b5?alt=media&token=24dba361-3396-4daa-aa48-e32351999a58, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2F49f708c3-5de0-454a-b228-300cb4680cec?alt=media&token=e1a9df28-0e0d-4538-bb37-92536bc0a1e5, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2Fdb9eed98-f171-4998-9f53-2c8d6e70ae96?alt=media&token=39d30126-72e3-482c-9f7b-638c74c4e652]',
            cards: '[2]'
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
    describe('when enter shelve(上架) api [DELETE]', () => {
      it('it should return 200', (done) => {
        request(app)
          .delete(`/website/shelve?id=${websiteShelveId}`)
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
     * shelve CRUD測試
     * */
    let websiteShelveId;
    describe('when enter shelve(上架) api [POST]', () => {
      it('it should return 400', (done) => {
        request(app)
          .post('/website/shelve')
          .send({
            series_ids: 2, // 欄位故意命名錯誤
            page: '[https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2Fed73b97f-c890-49c6-8c87-3adcb2744f6e?alt=media&token=a64907c8-a7d7-4f0d-8c99-86b5cfb856ef, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2Fdfad26b2-84cc-4ee0-9dc7-5456cf597c5c?alt=media&token=f23a561e-9997-43a1-94f9-b6617f92b9ae, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2F4cf6a864-bd06-442f-8502-0aa0325c2ddd?alt=media&token=7ebb9de7-8f3d-4f8c-aa7d-86931dcc36c6, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2F601ed14f-1744-48a7-9c79-b057efaa57b5?alt=media&token=24dba361-3396-4daa-aa48-e32351999a58, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2F49f708c3-5de0-454a-b228-300cb4680cec?alt=media&token=e1a9df28-0e0d-4538-bb37-92536bc0a1e5, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2Fdb9eed98-f171-4998-9f53-2c8d6e70ae96?alt=media&token=39d30126-72e3-482c-9f7b-638c74c4e652]',
            cards: '[2,4,6,8]'
          })
          .set('Accept', 'application/json')
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            websiteShelveId = 'ERROR_ID';
            done(err);
          });
      });
    });
    describe('when enter shelve(上架) api [GET]', () => {
      it('it should return 400', (done) => {
        request(app)
          .get(`/website/shelve?id=${websiteShelveId}`)
          .set('Accept', 'application/json')
          .expect(400)
          .end((err, res) => {
            const result = JSON.parse(res.text);
            expect(result).to.be.a('object');
            done(err);
          });
      });
    });
    describe('when enter shelve(上架) api [PUT]', () => {
      it('it should return 400', (done) => {
        request(app)
          .put(`/website/shelve?id=${websiteShelveId}`)
          .send({
            id: 4,
            series_id: 2,
            page: '[https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2Fed73b97f-c890-49c6-8c87-3adcb2744f6e?alt=media&token=a64907c8-a7d7-4f0d-8c99-86b5cfb856ef, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2Fdfad26b2-84cc-4ee0-9dc7-5456cf597c5c?alt=media&token=f23a561e-9997-43a1-94f9-b6617f92b9ae, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2F4cf6a864-bd06-442f-8502-0aa0325c2ddd?alt=media&token=7ebb9de7-8f3d-4f8c-aa7d-86931dcc36c6, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2F601ed14f-1744-48a7-9c79-b057efaa57b5?alt=media&token=24dba361-3396-4daa-aa48-e32351999a58, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2F49f708c3-5de0-454a-b228-300cb4680cec?alt=media&token=e1a9df28-0e0d-4538-bb37-92536bc0a1e5, https://firebasestorage.googleapis.com/v0/b/quapni-quapni.appspot.com/o/images%2Feidtor%2Fintro%2Fdb9eed98-f171-4998-9f53-2c8d6e70ae96?alt=media&token=39d30126-72e3-482c-9f7b-638c74c4e652]',
            cards: '[2]'
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
    describe('when enter shelve(上架) api [DELETE]', () => {
      it('it should return 400', (done) => {
        request(app)
          .delete(`/website/shelve?id=${websiteShelveId}`)
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
