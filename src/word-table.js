/**
  Copyright (c) 2016 hustcc
  License: MIT 
  https://github.com/hustcc/word-table
**/

var WordWidth = require('word-width');

/**
 * The class of `WordTable`.
 *  - header (Array): the header of ascii table.
 *  - body (Array of Array): the data in ascii table.
 *
 * Return the instance of `WordTable`.
 */
module.exports = function(header, body) {
  
  // 标记内容是否修改
  var updated = true,
    // ascii table 字符串缓存
    stringTable,
    // 表格每一列中最大的宽度
    tableColLength,
    // table 的最大列数
    maxCols,
    tableDatas,
    wordWidthMap = [], // 缓存字符串宽度，防止后续重复计算

    tableHeader = header || []; // header 数据
    tableBody = body || []; // 全部数据

  // 补齐字符串
  function _fillStr(l, c) {
    var str = '', i;
    for (i = 0; i < l; i ++) {
      str += c;
    }
    return str;
  }

  // 初始化一些长度数据
  function _initLength(i, j, str) {
    maxCols = Math.max(j + 1, maxCols);

    if (tableColLength.length <= j) {
      tableColLength.push(0); // 长度不够，添加一个长度
    }

    var width = WordWidth(str);
    // 补齐 map
    while (wordWidthMap.length <= i) wordWidthMap.push([]);

    if (wordWidthMap[i].length <= j) wordWidthMap[i].push(width);
    else wordWidthMap[i][j] = width;

    tableColLength[j] = Math.max(width, tableColLength[j]);
  }

  // 初始化数据
  function _initDatas() {
    tableDatas = tableBody.concat(); 
    tableDatas.splice(0, 0, tableHeader);

    // reset
    tableColLength = [];
    maxCols = 0;

    var i, j, 
      rowlen = tableDatas.length, rowdata,
      collen;
    // 遍历每一行数据
    for (i = 0; i < rowlen; i ++) {
      rowdata = tableDatas[i];
      // 遍历每一行的每一列，获取每一列的最大字符串长度
      collen = rowdata.length;
      for (j = 0; j < collen; j ++) {
        _initLength(i, j, rowdata[j]);
      }
    }
  }
  
  // 绘制分割横线
  function _drawDivider(sepWidth) {
    var i, j, width, 
      str = '+';
    for (i = 0; i < maxCols; i ++) {
      width = tableColLength[i] + sepWidth[i] * 2;
      str += _fillStr(width, '-');

      str += '+';
    }
    return str;
  }

  // 绘制每一行数据
  function _drawLine(rowdata, sepWidth, index) {
    var i, str = '|', 
      collen = rowdata.length,
      temp, left, right;
    for (i = 0; i < maxCols; i ++) {
      if (i >= collen) {
        // 元素不足，需要使用空格补充
        str += _fillStr(tableColLength[i] + sepWidth[i] * 2, ' ');
        str += '|';
      }
      else {
        // 元素存在
        temp = (tableColLength[i] - wordWidthMap[index][i]) / 2;
        left = Math.floor(temp);
        right = Math.ceil(temp);
        str += _fillStr(sepWidth[i] + left, ' ');
        str += rowdata[i];
        str += _fillStr(sepWidth[i] + right, ' ');
        str += '|';
      }
    }
    return str;
  }

  // 绘制 ascii table
  function _drawTable() {
    var i, j, sepWidth = [],  // 每列的间隔数量为字符串长度 / 4 向上取整
      rowlen = tableDatas.length, rowdata,
      collen;

    for (i = 0; i < maxCols; i ++) {
      sepWidth.push(Math.ceil(tableColLength[i] / 4));
    }

    var devider = _drawDivider(sepWidth); // 分割线
    stringTable = [devider];

    // 遍历每一行数据，绘制 table
    for (i = 0; i < rowlen; i ++) {
      stringTable.push(_drawLine(tableDatas[i], sepWidth, i));
      stringTable.push(devider);
    }
  }

  /**
   * Get the ascii table of string.
   * 
   * WordTable().string();
   */
  this.string = function() {
    return this.array().join("\n");
  };

  /**
   * Get the ascii table of array.
   * 
   * WordTable().array();
   */
  this.array = function() {
    if (updated) {
      // calculate
      _initDatas();

      // draw
      _drawTable();

      if (maxCols === 0) return []; 

      updated = false;
    }

    return stringTable;
  };

  /**
   * Set the header of ascii table with API.
   *  - header (Array): the header of ascii table.
   *
   */
  this.setHeader = function(header) {
    tableHeader = header || [];
    updated = true;
  };
  
  /**
   * Append data into ascii table with API.
   *  - data (Array): one table row data.
   *
   */
  this.appendBody = function(tr) {
    tableBody.push(tr);
    updated = true;
  };

  /**
   * Reset data into ascii table with API.
   *  - datas (Array of Array): all records in table.
   *
   */
  this.setBody = function(body) {
    tableBody = body;
    updated = true;
  };
  /**
   * Reset the instance.
   *
   */
  this.reset = function() {
    updated = true;
    tableHeader = [];
    tableBody = [];
  };
};