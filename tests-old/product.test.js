import { expect } from 'chai';
import productModule from '../src/server/modules/product.module';

describe('# product(商品)', () => {
  describe('when enter product(商品) api', () => {
    it('it should return 200', async () => {
      const result = await productModule.selectProduct();
      expect(result).to.be.a('object');
    });
  });
  describe('when enter ProductCategory(商品類別) api', () => {
    it('it should return 200', async () => {
      const result = await productModule.selectProductCategory();
      expect(result).to.be.a('object');
    });
  });
  describe('when enter ProductCard(商品卡片) api', () => {
    it('it should return 200', async () => {
      const result = await productModule.selectProductCard();
      expect(result).to.be.a('object');
    });
  });
  describe('when enter ProductSeries(商品系列) api', () => {
    it('it should return 200', async () => {
      const result = await productModule.selectProductSeries();
      expect(result).to.be.a('object');
    });
  });
});
