const isHexPrefixed = require('is-hex-prefixed');
const stripHexPrefix = require('strip-hex-prefix');

/**
 * Pads a `String` to have an even length
 * @param {String} value
 * @return {String} output
 */
function padToEven(value) {
  var a = value; // eslint-disable-line

  if (typeof a !== 'string') {
    throw new Error(`value must be string, is currently ${typeof a}, while padToEven.`);
  }

  if (a.length % 2) {
    a = `0${a}`;
  }

  return a;
}

/**
 * Converts a `Number` into a hex `String`
 * @param {Number} i
 * @return {String}
 */
function intToHex(i) {
  var hex = i.toString(16); // eslint-disable-line
  if (hex.length % 2) {
    hex = `0${hex}`;
  }

  return `0x${hex}`;
}

/**
 * Converts an `Number` to a `Buffer`
 * @param {Number} i
 * @return {Buffer}
 */
function intToBuffer(i) {
  const hex = intToHex(i);

  return Buffer.from(hex.slice(2), 'hex');
}

/**
 * Get the binary size of a string
 * @param {String} str
 * @return {Number}
 */
function getBinarySize(str) {
  if (typeof str !== 'string') {
    throw new Error(`method getBinarySize requires input 'str' to be type String, got '${typeof str}'.`);
  }

  return Buffer.byteLength(str, 'utf8');
}

/**
 * Attempts to turn a value into a `Buffer`. As input it supports `Buffer`, `String`, `Number`, null/undefined, `BN` and other objects with a `toArray()` method.
 * @param {*} v the value
 */
function toBuffer(value) {
  var v = value; // eslint-disable-line

  if (!Buffer.isBuffer(v)) {
    if (Array.isArray(v)) {
      v = Buffer.from(v);
    } else if (typeof v === 'string') {
      if (isHexPrefixed(v)) {
        v = Buffer.from(padToEven(stripHexPrefix(v)), 'hex');
      } else {
        v = Buffer.from(v);
      }
    } else if (typeof v === 'number') {
      v = intToBuffer(v);
    } else if (v === null || v === undefined) {
      v = Buffer.allocUnsafe(0);
    } else if (v.toArray) {
      // converts a BN to a Buffer
      v = Buffer.from(v.toArray());
    } else if (v.dividedToIntegerBy) {
      // converts a BigNumber to a Buffer
      v = Buffer.from(padToEven(v.toString(16)), 'hex');
    } else {
      throw new Error('invalid type');
    }
  }

  return v;
}

/**
 * Returns TRUE if the first specified array contains all elements
 * from the second one. FALSE otherwise.
 *
 * @param {array} superset
 * @param {array} subset
 *
 * @returns {boolean}
 */
function arrayContainsArray(superset, subset, some) {
  if (Array.isArray(superset) !== true) { throw new Error(`method arrayContainsArray requires input 'superset' to be an array got type '${typeof superset}'`); }
  if (Array.isArray(subset) !== true) { throw new Error(`method arrayContainsArray requires input 'subset' to be an array got type '${typeof subset}'`); }

  return subset[Boolean(some) && 'some' || 'every']((value) => (superset.indexOf(value) >= 0));
}

/**
 * Should be called to get utf8 from it's hex representation
 *
 * @method toUtf8
 * @param {String} string in hex
 * @returns {String} ascii string representation of hex value
 */
function toUtf8(hex) {
  const bufferValue = new Buffer(padToEven(stripHexPrefix(hex).replace(/^0+|0+$/g, '')), 'hex');

  return bufferValue.toString('utf8');
}

/**
 * Should be called to get ascii from it's hex representation
 *
 * @method toAscii
 * @param {String} string in hex
 * @returns {String} ascii string representation of hex value
 */
function toAscii(hex) {
  var str = ''; // eslint-disable-line
  var i = 0, l = hex.length; // eslint-disable-line

  if (hex.substring(0, 2) === '0x') {
    i = 2;
  }

  for (; i < l; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16);
    str += String.fromCharCode(code);
  }

  return str;
}

/**
 * Should be called to get hex representation (prefixed by 0x) of utf8 string
 *
 * @method fromUtf8
 * @param {String} string
 * @param {Number} optional padding
 * @returns {String} hex representation of input string
 */
function fromUtf8(stringValue) {
  const str = new Buffer(stringValue, 'utf8');

  return `0x${padToEven(str.toString('hex')).replace(/^0+|0+$/g, '')}`;
}

/**
 * Should be called to get hex representation (prefixed by 0x) of ascii string
 *
 * @method fromAscii
 * @param {String} string
 * @param {Number} optional padding
 * @returns {String} hex representation of input string
 */
function fromAscii(stringValue) {
  var hex = ''; // eslint-disable-line
  for(var i = 0; i < stringValue.length; i++) { // eslint-disable-line
    const code = stringValue.charCodeAt(i);
    const n = code.toString(16);
    hex += n.length < 2 ? `0${n}` : n;
  }

  return `0x${hex}`;
}

/**
 * getKeys([{a: 1, b: 2}, {a: 3, b: 4}], 'a') => [1, 3]
 *
 * @method getKeys get specific key from inner object array of objects
 * @param {String} params
 * @param {String} key
 * @param {Boolean} allowEmpty
 * @returns {Array} output just a simple array of output keys
 */
function getKeys(params, key, allowEmpty) {
  if (!Array.isArray(params)) { throw new Error(`method getKeys expecting type Array as 'params' input, got '${typeof params}'`); }
  if (typeof key !== 'string') { throw new Error(`method getKeys expecting type String for input 'key' got '${typeof key}'.`); }

  var result = []; // eslint-disable-line

  for (var i = 0; i < params.length; i++) { // eslint-disable-line
    var value = params[i][key]; // eslint-disable-line
    if (allowEmpty && !value) {
      value = '';
    } else if (typeof(value) !== 'string') {
      throw new Error('invalid abi');
    }
    result.push(value);
  }

  return result;
}

function isHexString(value, length) {
  if (typeof(value) !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) {
    return false;
  }
  if (length && value.length !== 2 + 2 * length) { return false; }
  return true;
}

module.exports = {
  arrayContainsArray,
  toBuffer,
  intToBuffer,
  getBinarySize,
  isHexPrefixed,
  stripHexPrefix,
  padToEven,
  intToHex,
  fromAscii,
  fromUtf8,
  toAscii,
  toUtf8,
  getKeys,
  isHexString,
};
