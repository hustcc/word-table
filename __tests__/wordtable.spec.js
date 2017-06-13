
test('WordTable', () => {
  var WordTable = require('../src/');
  // start table data.
  var header = ['id', 'name', 'birthday'];
  var body = [
    ['#1', '王小为', '1992-08-01', '备注：hustcc'],
    ['#2', '小泥巴', '1992-09-20'],
    ['#3', '佚名', '保密']
  ];

  // basic usage
  console.log('\n\n========== test basic usage ==========');
  var wt = new WordTable([], body);
  console.log(wt.string());

  // setHeader
  console.log('\n\n========== test setHeader ==========');
  wt.setHeader(header);
  console.log(wt.string());

  // appendBody
  console.log('\n\n========== test appendBody ==========');
  wt.appendBody(['#3', '佚名', '保密']);
  console.log(wt.string());

  // setBody
  console.log('\n\n========== test setBody ==========');
  wt.setBody([['#4', '在线工具', '保密', 'atool.org']]);
  console.log(wt.string());

  // reset
  console.log('\n\n========== test reset ==========');
  wt.reset();
  console.log(wt.string());

  // test only header
  console.log('\n\n========== test only header ==========');
  wt.setHeader(header);
  console.log(wt.string());

  // test to array
  console.log('\n\n========== test to array ==========');
  console.log(wt.array());

  // chainable api
  console.log('\n\n========== test chainable api ==========');
  var wt = new WordTable();
  wt.reset()
    .setHeader()
    .setHeader(['id', 'name', 'birthday'])
    .appendBody(['#3', '佚名', '保密']);
  console.log(wt.string());

  // for int
  wt.reset()
    .setHeader(['id', 'name', 'birthday'])
    .appendBody([1, 'TERM_PROGRAM', '/var/folders/mm/nnjn7j4d6270gf1cxzfm8y0w0000gn/T/']);
  console.log(wt.string());

  // chainable api
  console.log('\n\n========== test dist file ==========');
  var WordTable = require('..');
  var wt = new WordTable();
  wt.reset()
    .setHeader(['id', 'name', 'var'])
    .appendBody(['#3', '佚名', '保密']);
  console.log(wt.string());
});