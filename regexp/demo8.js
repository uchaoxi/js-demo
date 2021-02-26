/**
 * @file methods
 * test
 * exec
 * search
 * match
 * matchAll
 * replace
 * replaceAll
 * split
 */

 // RegExp.prototype.compile 已经废弃 
 // RegExp.prototype.toSource 非标准方法，不建议使用，也不看了
 // RegExp.prototype.toString 输出字面量的字符串

 // RegExp.prototype.test
 // test() 方法执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false
 console.log(/abc/.test('abcd')); //true
 // 当设置了global模式以后，每次执行test会改变lastIndex，失败后重置
 const regex = /abc/g;
 console.log(regex.lastIndex); //0
 console.log(regex.test('abcdabca'));//true
 console.log(regex.lastIndex);//3
 console.log(regex.test('abcdabca'));//true
 console.log(regex.lastIndex);//7
 console.log(regex.test('abcdabca'));//false
 console.log(regex.lastIndex);//0
console.log('------------');
//设置y模式, 也会每次执行test改变lastIndex，失败后重置
const regex2 = /abc/y;
console.log(regex2.lastIndex); //0
console.log(regex2.test('abcabca'));//true
console.log(regex2.lastIndex);//3
console.log(regex2.test('abcabca'));//true
console.log(regex2.lastIndex);//6
console.log(regex2.test('abcabca'));//false
console.log(regex2.lastIndex);//0

// exec
// 如果匹配到返回一个数组,0是匹配的字符串，1-n是分组匹配结果，包含额外的属性index是匹配字符开始位置, input原始字符串, groups存命名捕获组
console.log(/a(\d)a(?<hh>\d)/.exec('tta1a5bcccc'));
/*
[
  'a1a5',
  '1',
  '5',
  index: 2,
  input: 'tta1a5bcccc',
  groups: [Object: null prototype] { hh: '5' }
]
*/

//如果是g或者y模式，每次匹配会改变lastIndex，最后失败重置lastIndex
console.log(regex.lastIndex); //0
console.log(regex.exec('abcdabca'));//[ 'abc', index: 0, input: 'abcdabca', groups: undefined ]
console.log(regex.lastIndex); //3
console.log(regex.exec('abcdabca'));//[ 'abc', index: 4, input: 'abcdabca', groups: undefined ]
console.log(regex.lastIndex); //7
console.log(regex.exec('abcdabca'));//null
console.log(regex.lastIndex); //0

// String.prototype.search
//如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1。、
//和test有异曲同工之妙，不同在于找到以后,还可以知道index

console.log('abc'.search(/b/)); //1
console.log('abc'.search(/d/)); //-1
// g模式影响，search不会改变lastIndex，每次结果都一样的
console.log('abcabc'.search(/a/g)); //0
console.log('abcabc'.search(/a/));// 0

console.log(regex.lastIndex); //0
console.log('habcabcb'.search(regex)); //1
console.log(regex.lastIndex); //0
console.log('habcabcb'.search(regex)); //1
console.log(regex.lastIndex); //0
console.log('habcabcb'.search(regex)); //1

// y模式下,search不会改变lastIndex,每次结果都是一样的
console.log(regex2.lastIndex); //0
console.log('abcabcb'.search(regex2)); //0
console.log(regex2.lastIndex); //0
console.log('abcabcb'.search(regex2)); //0
console.log(regex2.lastIndex); //0
console.log('abcabcb'.search(regex2)); //0


// String.prototype.match
// match() 普通情况下返回和exec一样
console.log('abcdabca'.match(/abc/)); // [ 'abc', index: 0, input: 'abcdabca', groups: undefined ]

//在g模式下，只返回一个所有匹配结果组成的数组
console.log('abcdabca'.match(/abc/g));// ['abc', 'abc']

// 在y模式下有奇怪的表现，每次match都从string的lastIndex开始匹配，必须刚好匹配上lastindex开始的字符串，每次匹配完修改lastIndex, 即使目标string不是同一个也不影响
console.log(regex2.lastIndex);//0
console.log('abcabc'.match(regex2)); // [ 'abc', index: 0, input: 'abcabc', groups: undefined ]
console.log(regex2.lastIndex);//3
console.log('abcabcabc'.match(regex2));// [ 'abc', index: 3, input: 'abcabcabc', groups: undefined ]
console.log(regex2.lastIndex);//6
console.log('abc'.match(regex2));//null

// String.prototype.matchAll
//matchAll() 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器。
// 正则表达式需使用 /g 标志, lastIndex不会改变
console.log([...'abcdabcabcv'.matchAll(/abc/g)]);
/** 二维数组
[
  [ 'abc', index: 0, input: 'abcdabcabcv', groups: undefined ],
  [ 'abc', index: 4, input: 'abcdabcabcv', groups: undefined ],
  [ 'abc', index: 7, input: 'abcdabcabcv', groups: undefined ]
]
 */

//如果没有g标志, chrome会报错, node会输出一个元素的数组
console.log([...'abcdabcd'.matchAll(/abc/)]); //[ [ 'abc', index: 0, input: 'abcdabcd', groups: undefined ] ]
console.log([...'abcdabcd'.matchAll(/abc/)]); //chrome：VM152:1 Uncaught TypeError: String.prototype.matchAll called with a non-global RegExp argument


//String.prototype.replace 该方法并不改变调用它的字符串本身，而只是返回一个新的替换后的字符串
// replace(regex, string)
console.log('abcdabc'.replace(regex, 'hello')); //hellodhello
// replace(regex|string, specialString)
/**
 * $$ - $
 * $& - 表示匹配的字符串
 * $` - 表示匹配的字符串左边的部分
 * $' - 表示匹配的字符串右边部分
 * $n - 匹配组内容
 * $<name> - 命名捕获组
 */
// $$-just $
console.log('abcdefg'.replace(/abc/, '$$')); //$defg
console.log('abcdefg'.replace('abc', '$$')); //$defg
// $& - 表示匹配的字符串， 第一个参数可以是regexp、可以是string
console.log('abcdefg'.replace(/defg/, '123$&')); //abc123defg
// $` - 表示匹配的字符串左边的部分，  第一个参数可以是regexp、可以是string
console.log('abcdefg'.replace(/d/, '$`'));//abcabcefg
// $' -表示匹配的字符串右边部分，  第一个参数可以是regexp、可以是string
console.log('abcdefg'.replace(/d/, '$\'')); //abcefgefg
// $n - 匹配组内容， 第一个参数必须是regexp
console.log('abcdefg'.replace(/(d).*(f)/, '$2e$1')) //abcfedg
// $<name>命名捕获组
console.log('abcdefg'.replace(/(?<first>abc)d/, '$<first>')); //abcefg

// replace和global模式
console.log('abcdefgabc'.replace(/abc/g, '123')); //123defg123
console.log('abcdefgabc'.replace(/(abc)/g, '$1123')); //abc123defgabc123

// replace和y模式
console.log('abcdefgabc'.replace(/abc/y, '123')); //123defgabc

// replace和函数参数, 函数的参数是matchStr, capture1, capture2, ..., index, input, 命名捕获组成的对象 
//eg,  驼峰式转连字符写法
console.log('openDoor'.replace(/(?<hh>[A-Z])/, function(){
  console.log(arguments); 
  /*
  [Arguments] {
  '0': 'D',
  '1': 'D',
  '2': 4,
  '3': 'openDoor',
  '4': [Object: null prototype] { hh: 'D' }
}
  */
 return '-' + arguments[0].toLowerCase();  //-d
})); //open-door
//  换种写法行不通
console.log('openDoor'.replace(/([A-Z])/, '-$1'.toLowerCase())) //这么写不行。。。。open-Door

//eg 华氏度-摄氏度
const regex3 = /(\d+)F/;
console.log('212F'.replace(regex3, function(match, group1, index, input){
  console.log(typeof group1);//string
  console.log((group1-32)*5/9);
  return (group1-32)*5/9 + 'C';
}));

// replaceAll 第一个参数可以是string或者regex，第二个参数可以是string或者function
//当第一个参数是regex时，必须是global模式
// 兼容性不佳

// String.prototype.split
//split() 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。 
//str.split([separator[, limit]])
//g\y模式是无意义的, i模式是有意义的

console.log('abcdefgdfff'.split(/d/, 2)); //[ 'abc', 'efg' ]
console.log('abcdefgdfff'.split(/d/g, 2)); //[ 'abc', 'efg' ]
console.log('abcdefgdfff'.split(/d/y, 2)); //[ 'abc', 'efg' ]
console.log('abcdefgDfff'.split(/d/i)); //[ 'abc', 'efg', 'fff' ]

