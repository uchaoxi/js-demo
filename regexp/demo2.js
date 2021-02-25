/**
 * @file flags
 * 
 * g-global search
 * i-ignore UpperCase & LowerCase
 * m-multiline search
 * s-dotAll, . can match \n
 * u-unicode mode match
 * y-sticky match
 */

// 1. global
const regex1 = /\w+\s/g;
const regex2 = /\w+\s/;
const str = 'i like eatting fruits';

// 1.1 global mode exec every time to exe, will modify the lastIndex, give different results, until null 
console.log(regex1.exec(str)); // [ 'i ', index: 0, input: 'i like eatting fruits', groups: undefined ]
console.log(regex1.exec(str)); // [ 'like ', index: 2, input: 'i like eatting fruits', groups: undefined]
console.log(regex1.exec(str)); // [ 'eatting ', index: 7, input: 'i like eatting fruits', groups: undefined]
console.log(regex1.exec(str)); // null

console.log(regex2.exec(str)); // [ 'i ', index: 0, input: 'i like eatting fruits', groups: undefined ]
console.log(regex2.exec(str)); // [ 'i ', index: 0, input: 'i like eatting fruits', groups: undefined ]

// 1.2 global & match, don't display index & input & group info
console.log(str.match(regex1)); // [ 'i ', 'like ', 'eatting ' ]
console.log(str.match(regex2)); // [ 'i ', index: 0, input: 'i like eatting fruits', groups: undefined ]

// 1.3 global & test
console.log(regex1.lastIndex); //0, the test method will modify the lastindex
console.log(regex1.test(str)); // true
console.log(regex2.test(str)); // true

// 1.4 global & matchAll, a matchAll must has a global, or throw error
console.log(regex1.lastIndex); //2
console.log(str.matchAll(regex1)); //Object [RegExp String Iterator] {}
console.log(regex1.lastIndex); // 2
console.log([...str.matchAll(regex1)]);
//当使用 match() 和 /g 标志方式获取匹配信息时，捕获组会被忽略, matchAll不会
/**
 [
  [
    'like ',
    index: 2,
    input: 'i like eatting fruits',
    groups: undefined
  ],
  [
    'eatting ',
    index: 7,
    input: 'i like eatting fruits',
    groups: undefined
  ]
]
 */

 // 1.5 replace
 const str2 = str.replace(regex1, 'Good');
 console.log(str2); //GoodGoodGoodfruits, all is replaced

 // 1.6 search, 返回正则表达式在字符串中首次匹配项的索引, only the first one
 console.log(str);
 console.log(str.search(regex1)); // 0
 console.log(str.search(regex1)); // 0

 // 1.7 split no anymore to say

 // 2 ignore
 const regex3 = /abc/i;
 const regex4 = /abc/;

 const str3 = 'aBc';

 console.log(regex3.test(str3)); // true
 console.log(regex4.test(str3)); // false

 // 3 multiline, Multiline 修饰的是^与$，就是说没有Multiline的时候，把^和$与当作每一行(\n结尾的)的开头和结束来匹配，有Multiline 的时候是与整个字符串的开头和结尾匹配

 const regex5 = /^.+$/m;
 const regex6 = /^.+$/;
 const str4 = `a
bc`;
console.log(regex5.test(str4)); // true
console.log(regex6.test(str4)); // false

// 4 s . match \n
const regex7 = /^.+$/s;
const str5 = 'a\nbc';
console.log(regex6.test(str5)); // false
console.log(regex7.test(str5)); // true

// 5 unicode mode
// 此修饰符标识能够正确处理大于\uFFFF的Unicode字符。也就是说，会正确处理四个字节的UTF-16编码。
console.log(/^.$/u.test("\uD842\uDFB7")); // true, regarded as one char
console.log(/^.{2}$/.test("\uD842\uDFB7")); // true, regarded as two char
 
//6 y修饰符 规定只能从lastIndex属性规定的位置开始进行匹配，匹配失败不会再去尝试后面的字符。
// 6.1 粘滞匹配，每次匹配后更新lastIndex， 和global不一样的是，匹配失败后不会重置为0??? X, 错误后会更新lastIndex

const regex8 = /\w+\s/y;
console.log(regex8.test(str));//true
console.log(regex8.lastIndex);
console.log(regex8.test(str));//true
console.log(regex8.lastIndex);
console.log(regex8.test(str));//true
console.log(regex8.lastIndex);
console.log(regex8.test(str));//false
console.log(regex8.lastIndex);
console.log(regex8.test(str));//false
console.log(regex8.lastIndex);

// 6.2 y修饰符可以进行全局匹配，且必须从当前匹配的起始位置(lasTIndex)开始匹配且匹配成功，否则退出匹配, yes
console.log(/o/y.test('foo')); //false
console.log(/o/.test('foo')); //true

const regex9 = /o/y;
console.log(regex9.lastIndex); //0
console.log(regex9.test('oo foo oo'));//true
console.log(regex9.lastIndex);//1
console.log(regex9.test('oo foo oo'));//true
console.log(regex9.lastIndex);//2
console.log(regex9.test('oo foo oo'));//false
regex9.lastIndex = 4;
console.log(regex9.test('oo foo oo')); //true

