const util = require('../index.js');
const assert = require('chai').assert;

describe('check all exports', () => {
  it('should have all exports available', () => {
    const expected = ['arrayContainsArray',
    'toBuffer',
    'intToBuffer',
    'getBinarySize',
    'stripHexPrefix',
    'isHexPrefixed',
    'padToEven',
    'intToHex',
    'fromAscii',
    'fromUtf8',
    'toAscii',
    'toUtf8'];

    Object.keys(util).forEach((utilKey) => {
      assert.equal(expected.includes(utilKey), true, utilKey);
    });
  });
});
