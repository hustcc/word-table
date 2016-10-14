# word-table

> **word-table** is simple javascript library for drawing ascii tables in the `terminal` / `console`.


[![Build Status](https://travis-ci.org/hustcc/word-table.svg?branch=master)](https://travis-ci.org/hustcc/word-table) [![npm](https://img.shields.io/npm/v/word-table.svg?style=flat-square)](https://www.npmjs.com/package/word-table) [![npm](https://img.shields.io/npm/dt/word-table.svg?style=flat-square)](https://www.npmjs.com/package/word-table) [![npm](https://img.shields.io/npm/l/word-table.svg?style=flat-square)](https://www.npmjs.com/package/word-table)


# 1. Install & Import

> **npm install word-table**


```js
var WorkTable = require('word-table');
//or
import WorkTable from 'word-table';
```


# 2. Usage & API

See a demo firstly:

```js
var header = ['id', 'name', 'birthday'];
var body = [
  ['#1', '王小为', '1992-08-01', '备注：hustcc'], 
  ['#2', '小泥巴', '1992-09-20'],
  ['#3', '佚名', '保密']
];

// basic usage
var wt = new WordTable(header, body);
console.log(wt.string());
```

![screenshot](screenshot.png)

The API is so simple that documents are not needed.

```js
wt.setHeader(['id', 'name', 'birthday']);
wt.appendBody(['#3', '佚名', '保密']);
wt.setBody([['#4', '在线工具', '保密', 'atool.org']]);
wt.array();
wt.string();
wt.reset();
```

Detail usage and demo code, can see [here](tests/test.js), and run `npm test` can see the output.


# 3. TODO

 - Browser Javascript supported.


# 4. Test

> npm install
> 
> npm test


# 5. LICENSE

MIT