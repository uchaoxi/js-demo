/**
 * @file 组合、范围
 * (x) capturing group
 * (?:x) Non-capturing group
 * (?<name>x) Named capturing group
 * x|y
 * 字符集[xyz]
 * 反向字符集[^xyz]
 * /1 /2 子捕获匹配
 */

 //1 捕获
console.log(/this\sis\s(\w+).*\1.*/.test('this is abc, do you see abc for the first time?'));//true

//2 非捕获
console.log(/^(?:xyz){2}$/.test('xyzxyz')); //true
console.log(/^xyz{2}$/.test('xyzxyz')); //false

//3 子捕获匹配
var re = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(re, "$2, $1");
console.log(newstr);

// 4 named capturing

const dateFormat = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
const result = dateFormat.exec('2021-01-02');
console.log(result);
/*
[
  '2021-01-02',
  '2021',
  '01',
  '02',
  index: 0,
  input: '2021-01-02',
  groups: [Object: null prototype] { year: '2021', month: '01', day: '02' }
]
*/
// 4.1 反向引用 
const regex = /(?<value>a\dc)\k<value>/;
const str2 = 'a1ca1c';
console.log(regex.exec(str2));
/*
[
  'a1ca1c',
  'a1c',
  index: 0,
  input: 'a1ca1c',
  groups: [Object: null prototype] { value: 'a1c' }
]
*/