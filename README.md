# Nano Merge

[![Build status](https://travis-ci.org/nikolay-govorov/nanomerge.svg?branch=master)](https://travis-ci.org/nikolay-govorov/nanomerge)
[![License](https://img.shields.io/npm/l/nanomerge.svg)](https://github.com/nikolay-govorov/nanomerge/blob/master/LICENSE)
![Maintenance intention for this crate](https://img.shields.io/badge/maintenance-actively--developed-brightgreen.svg)
[![GitHub package version](https://img.shields.io/github/package-json/v/nikolay-govorov/nanomerge.svg)](https://github.com/nikolay-govorov/nanomerge)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Tiny universal/isomorphic library for intelligently deep-merging objects

```js
var nanomerge = require('nanomerge');

var merger = nanomerge({
  strategy: { array: 'merge' }
});

//=> { a: [{ a: 1 }, { a: 3 }], b: 'It works!' }
merger({ a: [{ a: 2 }, { a: 3 }] }, { a: [{ a: 1 }] }, { b: 'It works!' });
```

* **Small**. Only 1 kilobyte (minified and gzipped). Only "nano" dependencies. It uses [Size Limit](https://www.npmjs.com/package/size-limit) to keep the size under control.

* **Easy**. Everything works out of the box. Just plug and play.

* **Customizability**. But, if you need to, everything can be customized.

The lib supports Node.js and all browsers starting from IE 11.

### Install

```sh
npm install --save nanomerge
```

### Usage

#### Default settings

```js
var nanomerge = require('nanomerge');

nanomerge({ a: 1, b: 2 }, { a: 2, c: 3 }, { b: 5, d: 7 }); //=> { a: 2, b: 5, c: 3, d: 7 }
```

#### Custom merge mechanism

If passed only one parameter, it is interpreted as configuration data, and a customized merge function is returned.

```js
var nanomerge = require('nanomerge');

var myCustomMerge = nanomerge.create({ /* options */ });

myCustomMerge({ a: 1 }, { b: 2 }) //=> { a: 1, b: 2 }
```

### Configuration

```js
var config = {
  /**
  * If true, each item will be deeply copied,
  * otherwise it will be copied as needed
  */
  force: true, // boolean

  /**
   * The strategy specifies how we should handle a particular type
   */
  strategy: {
    array:     'replace', // string: merge | replace | concat
    object:    'deep',    // string: deep
    primitive: 'default', // string: default
  },

   /**
    * Custom types allow you to create intelligent mechanisms for enterprises
    */
   types: {
     mode: 'add', // string: add | replace

     list: [
       {
         name: "array", // Type name. The name must be unique.

         is: function(el) {  }, // Function checking whether an element is an object of type

         default: "simple", // The name of the mechanism of merging the default

         merge: { // The object contains all the mechanisms for draining this type
           simple: function(merger, a, b, config) {},
         }
       },
       /* You custom types */
     ],
   },
};
```
