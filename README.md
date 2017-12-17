# Nano Merge

[![Build Status](https://travis-ci.org/nikolay-govorov/nanomerge.svg?branch=master)](https://travis-ci.org/nikolay-govorov/nanomerge)
[![License](https://img.shields.io/npm/l/nanomerge.svg)](https://www.npmjs.com/package/nanomerge)
[![GitHub package version](https://img.shields.io/github/package-json/v/nikolay-govorov/nanomerge.svg)](https://github.com/nikolay-govorov/nanomerge)

Tiny universal isomorphic library for deep merging objects

```js
var nanomerge = require('nanomerge');

const result = nanomerge({ a: 1, b: 2 }, { a: 2, c: 3 }, { b: 5, d: 7 });

console.log(result); // { a: 2, b: 5, c: 3, d: 7 }
```
