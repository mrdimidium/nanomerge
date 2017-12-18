# Nano Merge

[![Build Status](https://travis-ci.org/nikolay-govorov/nanomerge.svg?branch=master)](https://travis-ci.org/nikolay-govorov/nanomerge)
[![License](https://img.shields.io/npm/l/nanomerge.svg)](https://github.com/nikolay-govorov/nanomerge/blob/master/LICENSE)
[![GitHub package version](https://img.shields.io/github/package-json/v/nikolay-govorov/nanomerge.svg)](https://github.com/nikolay-govorov/nanomerge)

Tiny universal isomorphic library for deep merging objects

* **Small**. Only 179 bytes (minified and gzipped). Only 'nano' dependencies. It uses Size Limit to control size.

* **Easy**. Everything is working. Just plug and play.

* **Customizability**. But if you need to, everything can be customized

The lib supports Node.js and all browsers starting from IE 11.

### Install

```sh
npm install --save nanomerge
```

### Usage

#### Normal

```js
var nanomerge = require('nanomerge');

nanomerge({ a: 1, b: 2 }, { a: 2, c: 3 }, { b: 5, d: 7 }); // { a: 2, b: 5, c: 3, d: 7 }
```

#### Custom configuration

```js
var config = { clone: true };

var customInstance = nanomerge(config);

customInstance({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
```

### Configuration

```js
var config = {
  /* Deep copying */
  clone: true, // boolean

  /* Strategy */
  strategy: {
    array: 'replace' // string: merge | replace | concat
  }
};
```
