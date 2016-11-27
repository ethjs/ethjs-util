const assert = require('assert');
const utf8 = require('utf8');

// methods taken from ethereumjs-util

/**
 * Returns a `Boolean` on whether or not the a `String` starts with '0x'
 * @param {String} str
 * @return {Boolean}
 */
function isHexPrefixed(str) {
  return str.slice(0, 2) === '0x';
}

/**
 * Removes '0x' from a given `String`
 * @param {String} str
 * @return {String}
 */
function stripHexPrefix(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return isHexPrefixed(str) ? str.slice(2) : str;
}

/**
 * Pads a `String` to have an even length
 * @param {String} a
 * @return {String}
 */
function padToEven(value) {
  var a = value; // eslint-disable-line

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
  assert(i % 1 === 0, 'number is not a integer');
  assert(i >= 0, 'number must be positive');

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
  var str = ''; // eslint-disable-line
  var i = 0, l = hex.length; // eslint-disable-line
  if (hex.substring(0, 2) === '0x') {
    i = 2;
  }
  for (; i < l; i += 2) {
    const code = parseInt(hex.substr(i, 2), 16);

    if (code === 0) {
      break;
    }

    str += String.fromCharCode(code);
  }

  return utf8.decode(str);
}

/**
 * Should be called to get ascii from it's hex representation
 *
 * @method toAscii
 * @param {String} string in hex
 * @returns {String} ascii string representation of hex value
 */
function toAscii(hex) {
// Find termination
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
  var hex = ''; // eslint-disable-line
  const str = utf8.encode(stringValue);

  for(var i = 0; i < str.length; i++) { // eslint-disable-line
    const code = str.charCodeAt(i);
    if (code === 0) {
      break;
    }
    const n = code.toString(16);
    hex += n.length < 2 ? `0${n}` : n;
  }

  return `0x${hex}`;
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

// getKeys([{a: 1, b: 2}, {a: 3, b: 4}], 'a') => [1, 3]
function getKeys(params, key, allowEmpty) {
  if (!Array.isArray(params)) { throw new Error('invalid params'); }

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
