/**
 * Copyright (c) 2017 hustcc
 * License: MIT
 * GitHub: https://github.com/hustcc/word-table
 **/

const WordWidth = require('word-width');

class WordTable {
  /**
   * @param header
   * @param body
   */
  constructor(header = [], body = []) {
    // 标记内容是否修改
    this._updated = true;
    // ascii table 字符串缓存
    this._stringTable = null;
    // 表格每一列中最大的宽度
    this._tableColLength = 0;
    // table 的最大列数
    this._maxCols = 0;
    this._tableDatas = null;
    // 缓存字符串宽度，防止后续重复计算
    this._wordWidthMap = [];
    // header 数据
    this._tableHeader = header;
    // 全部数据
    this._tableBody = body;
  }

  _fillStr = (l, c) => {
    let str = '';
    let i;
    for (i = 0; i < l; i += 1) {
      str += c;
    }
    return str;
  };

  _initLength = (i, j, str) => {
    this._maxCols = Math.max(j + 1, this._maxCols);

    if (this._tableColLength.length <= j) {
      this._tableColLength.push(0); // 长度不够，添加一个长度
    }

    const width = WordWidth(`${str}`); // 强制转字符串
    // 补齐 map
    while (this._wordWidthMap.length <= i) this._wordWidthMap.push([]);

    if (this._wordWidthMap[i].length <= j) this._wordWidthMap[i].push(width);
    else this._wordWidthMap[i][j] = width;

    this._tableColLength[j] = Math.max(width, this._tableColLength[j]);
  };

  _initDatas = () => {
    this._tableDatas = this._tableBody.concat();
    this._tableDatas.splice(0, 0, this._tableHeader);

    // reset
    this._tableColLength = [];
    this._maxCols = 0;

    let i;
    let j;
    const rowlen = this._tableDatas.length;
    let rowdata;
    let collen;
    // 遍历每一行数据
    for (i = 0; i < rowlen; i += 1) {
      rowdata = this._tableDatas[i];
      // 遍历每一行的每一列，获取每一列的最大字符串长度
      collen = rowdata.length;
      for (j = 0; j < collen; j += 1) {
        this._initLength(i, j, rowdata[j]);
      }
    }
  };

  // 绘制分割横线
  _drawDivider = (sepWidth) => {
    let i;
    let width;
    let str = '+';
    for (i = 0; i < this._maxCols; i += 1) {
      width = this._tableColLength[i] + sepWidth[i] * 2;
      str += this._fillStr(width, '-');

      str += '+';
    }
    return str;
  };

  // 绘制每一行数据
  _drawLine = (rowdata, sepWidth, index) => {
    let i;
    let str = '|';
    const collen = rowdata.length;
    let temp;
    let left;
    let right;
    for (i = 0; i < this._maxCols; i += 1) {
      if (i >= collen) {
        // 元素不足，需要使用空格补充
        str += this._fillStr(this._tableColLength[i] + sepWidth[i] * 2, ' ');
        str += '|';
      } else {
        // 元素存在
        temp = (this._tableColLength[i] - this._wordWidthMap[index][i]) / 2;
        left = Math.floor(temp);
        right = Math.ceil(temp);
        str += this._fillStr(sepWidth[i] + left, ' ');
        str += rowdata[i];
        str += this._fillStr(sepWidth[i] + right, ' ');
        str += '|';
      }
    }
    return str;
  };

  // 绘制 ascii table
  _drawTable = () => {
    let i;
    const sepWidth = [];  // 每列的间隔数量为字符串长度 / 4 向上取整
    const rowlen = this._tableDatas.length;

    for (i = 0; i < this._maxCols; i += 1) {
      sepWidth.push(Math.ceil(this._tableColLength[i] / 4));
    }

    const divider = this._drawDivider(sepWidth); // 分割线
    this._stringTable = [divider];

    // 遍历每一行数据，绘制 table
    for (i = 0; i < rowlen; i += 1) {
      this._stringTable.push(this._drawLine(this._tableDatas[i], sepWidth, i));
      this._stringTable.push(divider);
    }
  };

  /**
   * Get the ascii table of string.
   *
   * WordTable().string();
   */
  string = () => this.array().join('\n');

  /**
   * Get the ascii table of array.
   *
   * WordTable().array();
   */
  array = () => {
    if (this._updated) {
      // calculate
      this._initDatas();

      // draw
      this._drawTable();

      if (this._maxCols === 0) return [];

      this._updated = false;
    }

    return this._stringTable;
  };

  /**
   * Set the header of ascii table with API.
   *  - header (Array): the header of ascii table.
   *
   */
  setHeader = (header = []) => {
    this._tableHeader = header;
    this._updated = true;
    return this;
  };

  /**
   * Append data into ascii table with API.
   *  - data (Array): one table row data.
   *
   */
  appendBody = (tr) => {
    this._tableBody.push(tr);
    this._updated = true;
    return this;
  };

  /**
   * Reset data into ascii table with API.
   *  - datas (Array of Array): all records in table.
   *
   */
  setBody = (body) => {
    this._tableBody = body;
    this._updated = true;
    return this;
  };
  /**
   * Reset the instance.
   *
   */
  reset = () => {
    this._updated = true;
    this._tableHeader = [];
    this._tableBody = [];
    return this;
  };
}

module.exports = WordTable;
