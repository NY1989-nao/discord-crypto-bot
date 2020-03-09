const BitfinexApiWrapper = require('../lib/bitfinex-api-wrapper');

describe('BitfinexApiWrapper', () => {
  let bfx;
  beforeEach(() => {
    bfx = new BitfinexApiWrapper();
    jest.spyOn(bfx, '_getCandles').mockImplementation(async (limit) => {
      if (!limit) {
        return [];
      }
      return Array(limit).fill().map(() => {
        return [new Date().getTime(), (Math.random() * 5001)];
      });
    });
  });

  describe('getBtcUsdShorts', () => {
    it('candle stick is found', async () => {
      const candle = await bfx.getBtcUsdShorts(15);
      expect(candle).toHaveProperty('day');
      expect(candle).toHaveProperty('openPrice');
      expect(candle).toHaveProperty('closePrice');
      expect(candle).toHaveProperty('ratio');
    });

    it('candle stick is not found', async () => {
      const candle = await bfx.getBtcUsdShorts();
      expect(candle).toBeUndefined();
    });
  });
});