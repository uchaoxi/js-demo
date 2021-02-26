/**
 * @char encode
 * 
 * \xhh 两位16进制
 * \uhhhh 四位16进制UTF-16
 * \u{hhhh} 16进制unicode
 * \u{hhhhh} 16进制unicode
 */

const str = '你好';
var code = escape(str);

console.log(code.replace(/%u/g, '\\u')); //\u4F60\u597D
console.log(/\u4F60\u597D/.test(str)); // true

// 当设置了u模式时，使用\u{hhhh}匹配单个字符（guess）
console.log(/\u{597D}/u.test('\u597D\u4F60'));//true
console.log(/\u{597D}/.test('\u597D\u4F60'));// false
console.log(/\u597D/u.test('\u597D\u4F60')); //false(这个false表明在u模式下，单个字符也不能匹配了，必须用\u{hhhh})
console.log(/\u{D842}/u.test("\uD842\uDFB7")); //false
console.log(/\uD842/u.test("\uD842\uDFB7")); //false

// \u{hhhhh}需要和u模式一起用，否则被认为是匹配1234个u组成的字符串
console.log(/\u{1D306}/u.test('𝌆')); // true
console.log(/\u{1234}/.test('uuuuuuuuuuuu...uuuuuuuu'));
console.log(/\a/u.test('a')); //Invalid regular expression: /\a/: Invalid escape