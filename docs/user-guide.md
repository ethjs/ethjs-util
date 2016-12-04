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
toBuffer             <Function (String) : (Buffer)>
intToBuffer          <Function (Number) : (Buffer)>
isHexPrefixed        <Function (String) : (Boolean)>
stripHexPrefix       <Function (String) : (String)>
padToEven            <Function (String) : (String)>
intToHex             <Function (Number) : (String)>
```

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
