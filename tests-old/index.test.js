import request from 'supertest';

import app from '../src/index';

describe('# API server', () => {
  describe('when enter root api', () => {
    it('it should return 200', (done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200, done);
    });
  });
});
