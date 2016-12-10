# User Guide

All information for developers using `ethjs-util` should consult this document.

## Install

```
npm install --save ethjs-util
```

## Usage

```js
const util = require('ethjs-util');

const value = util.intToBuffer(38272);

// returns <Buffer ...>
```

## Available Methods

```
arrayContainsArray   <Function (Array, Array) : (Boolean)>
getBinarySize        <Function (String) : (Number)>
intToBuffer          <Function (Number) : (Buffer)>
isHexPrefixed        <Function (String) : (Boolean)>
stripHexPrefix       <Function (String) : (String)>
padToEven            <Function (String) : (String)>
intToHex             <Function (Number) : (String)>
fromAscii,           <Function (String) : (String)>
fromUtf8,            <Function (String) : (String)>
toAscii,             <Function (String) : (String)>
toUtf8,              <Function (String) : (String)>
getKeys,             <Function (Array, String) : (Array)>
isHexString,         <Function (String) : (Boolean)>
```

## Why BN.js?

`ethjs` has made a policy of using `BN.js` across all of its repositories. Here are some of the reasons why:

  1. lighter than alternatives (BigNumber.js)
  2. faster than most alternatives, see [benchmarks](https://github.com/indutny/bn.js/issues/89)
  3. used by the Ethereum foundation across all [`ethereumjs`](https://github.com/ethereumjs) repositories
  4. is already used by a critical JS dependency of many ethereum packages, see package [`elliptic`](https://github.com/indutny/elliptic)
  5. purposefully **does not support decimals or floats numbers** (for greater precision), remember, the Ethereum blockchain cannot and will not support float values or decimal numbers.

## Browser Builds

`ethjs` provides production distributions for all of its modules that are ready for use in the browser right away. Simply include either `dist/ethjs-util.js` or `dist/ethjs-util.min.js` directly into an HTML file to start using this module. Note, an `ethUtil` object is made available globally.

```html
<script type="text/javascript" src="ethjs-util.min.js"></script>
<script type="text/javascript">
ethUtil(...);
</script>
```

Note, even though `ethjs` should have transformed and polyfilled most of the requirements to run this module across most modern browsers. You may want to look at an additional polyfill for extra support.

Use a polyfill service such as `Polyfill.io` to ensure complete cross-browser support:
https://polyfill.io/

## Latest Webpack Figures

```
Hash: 28b387e39e1016183a78                                                         
Version: webpack 2.1.0-beta.15
Time: 734ms
            Asset     Size  Chunks             Chunk Names
    ethjs-util.js  65.1 kB       0  [emitted]  main
ethjs-util.js.map  79.3 kB       0  [emitted]  main
    + 8 hidden modules

Hash: 4d26e1d501227158f8ab                                                         
Version: webpack 2.1.0-beta.15
Time: 1523ms
            Asset     Size  Chunks             Chunk Names
ethjs-util.min.js  25.4 kB       0  [emitted]  main
    + 8 hidden modules
```

## Other Awesome Modules, Tools and Frameworks

 - [web3.js](https://github.com/ethereum/web3.js) -- the original Ethereum swiss army knife **Ethereum Foundation**
 - [ethereumjs](https://github.com/ethereumjs) -- critical ethereumjs infrastructure **Ethereum Foundation**
 - [browser-solidity](https://ethereum.github.io/browser-solidity) -- an in browser Solidity IDE **Ethereum Foundation**
 - [wafr](https://github.com/silentcicero/wafr) -- a super simple Solidity testing framework
 - [truffle](https://github.com/ConsenSys/truffle) -- a solidity/js dApp framework
 - [embark](https://github.com/iurimatias/embark-framework) -- a solidity/js dApp framework
 - [dapple](https://github.com/nexusdev/dapple) -- a solidity dApp framework
 - [chaitherium](https://github.com/SafeMarket/chaithereum) -- a JS web3 unit testing framework
 - [contest](https://github.com/DigixGlobal/contest) -- a JS testing framework for contracts

## Our Relationship with Ethereum & EthereumJS

 We would like to mention that we are not in any way affiliated with the Ethereum Foundation or `ethereumjs`. However, we love the work they do and work with them often to make Ethereum great! Our aim is to support the Ethereum ecosystem with a policy of diversity, modularity, simplicity, transparency, clarity, optimization and extensibility.

 Many of our modules use code from `web3.js` and the `ethereumjs-` repositories. We thank the authors where we can in the relevant repositories. We use their code carefully, and make sure all test coverage is ported over and where possible, expanded on.
