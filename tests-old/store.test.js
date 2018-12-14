import { expect } from 'chai';
import storeModule from '../src/server/modules/store.module';


describe('# store(商店)', () => {
  describe('when enter store api', () => {
    it('it should return 200', async () => {
      const result = await storeModule.selectStore();
      expect(result).to.be.a('object');
    });
  });

  describe('when enter region(商店地區) api', () => {
    it('it should return 200', async () => {
      const result = await storeModule.selectStoreRegion();
      expect(result).to.be.a('object');
    });
  });

  describe('when enter area(商店國家) api', () => {
    it('it should return 200', async () => {
      const result = await storeModule.selectStoreArea();
      expect(result).to.be.a('array');
    });
  });
});
