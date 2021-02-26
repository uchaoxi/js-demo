#  js正则表达式RegExp
[toc]
## 创建的三种方式
```
// 字面量
const regex1 = /abc(\d)+/i;

// RegExp构造器， 第一个参数可以是字面量，也可以是字符串（是字符串时需要转义元字符）
const regex2 = new RegExp(/abc(\d)+/, 'i');
const regex3 = new RegExp('abc(\\d)+', 'i');
```
## 匹配标志（flags）
共有6种： [g, i, y, u, s, m]
### global
g-全局匹配，设置以后对于test、exec、match、matchAll、replace、replaceAll方法有影响， 对于search、split方法无影响
```
console.log('123'.match(/\d/g)); // ["1", "2", "3"]
console.log('123'.match(/\d/)); // ["1", index: 0, input: "123", groups: undefined]
```
### ignoreCase
i-忽略大小写，设置以后匹配忽略大小写
```
console.log('aBc'.match(/abc/i)); // ["aBc", index: 0, input: "aBc", groups: undefined]
console.log('aBc'.match(/abc/)); // null
```
### stick
y-粘滞模式，设置以后，必须和从lastIndex开始的连续字符进行匹配，匹配不上就失败。对于test、exec、match三个方法，y模式下每次匹配后会修改lastIndex
```
console.log(/bc/y.test('abc')); // false
console.log(/bc/.test('abc')); // true
```
### unicode
u-unicode匹配模式，设置以后能正确处理四个字节的字符（大于\uFFFF的utf-16字符），将其处理为一个字符（默认处理为2个字符）。
```
console.log(/^.$/u.test('\uD842\uDFB7')); // true, regarded as one char
console.log(/^.{2}$/.test('\uD842\uDFB7')); // true, regarded as two char
console.log(/^.$/u.test('\u4F60\u597D')); // false, 你好，也能处理普通的两个字节的字符
```

### dotAll
s-dotAll， 设置以后.可以匹配换行符\n
```
const str5 = 'a\nbc';
console.log(/^.+$/.test('a\nbc')); // false
console.log(/^.+$/s.test('a\nbc')); // true
```

### multiline
m-多行匹配

Multiline 修饰的是^与$，就是说没有Multiline的时候，把^和$与当作每一行(\n结尾的)的开头和结束来匹配，有Multiline 的时候是与整个字符串的开头和结尾匹配
```
const str = `a
bc`;
console.log(/^.+$/m.test(str)); // true
console.log(/^.+$/.test(str)); // false
```

## 元字符
元字符包括： \\, \d, \D, \w, \W, \s, \S, \n, \r, \t, \v, \f, [\b], \0, \xhh, \uhhhh, \u{hhhhh}
### \\-转义符号
正则表达式中需要转义的符号有:

&, (), *, +, ., [], ?, \\, ^, {}, |

### unicode编码
\xhh, 匹配U+0000 - U+00FF,  hexadecimal escape sequences

\uhhhh, 匹配BMP(Basic Multilingual Plane)字符，U+0000-U+FFFF,  Unicode escape sequences.

\u{hhhh}或者\u{hhhhh}, 前者和\uhhhh一样，后者匹配Astral code points字符，表示U+010000-U+10FFFF, \u{}在pattern中必须和u模式一起用, Unicode code point escapes
## 断言
断言包括： ^, $, (?=x), (?<=x), (?!x), (?<!x), \b, \B
### ^, $ 分别匹配字符串开始和结束位置

### (?=x) 先行断言
代表字符串中的一个位置,紧接着这个位置的字符串需要匹配上x，直接看例子比较好理解:
```
console.log(/abc(?=123)/.test('abc123')); // true
console.log(/abc(?=123)/.test('abc')); // false
```
### (?<=x) 后行断言
代表字符串中的一个位置,紧邻这个位置前面的字符串需要匹配上x，直接看例子
```
console.log(/(?<=start)abc/.test('startabc123')); // true
```
### (?!x) 否定先行断言
紧接着这个位置的后面的字符串不能匹配上x
```
console.log(/abc(?!123)/.test('abc123')); //false
```
### (?!x) 否定后行断言
紧接着这个位置的前面的字符串不能匹配上x
```
console.log(/(?<!123)abc/.test('123abc')); //false
```

###  \b, \B分别匹配单词的前后边缘
```
console.log(/word\b/.test('good wordbreaks')); //false
console.log(/word\b/.test('word break')); // true

console.log(/word\B/.test('good wordbreaks')); //ture
console.log(/word\B/.test('word break')); // false
```
## 范围、组合和捕获
### 范围[xyz] [^xyz] x|y
大家都懂不介绍

### 捕获组(x)和反向引用
```
// 捕获组，匹配时正则表达式会记住括号里面匹配的内容，并且体现在结果上
console.log('abc123iii'.match(/abc(\d+)([a-z]+)/));//写了两个捕获组，对应输出的第1（123）、2（iii）个元素：["abc123iii", "123", "iii", index: 0, input: "abc123iii", groups: undefined]

// 反向引用，当我们需要在正则表达式里面引用括号里面匹配的结果时，比如匹配有两个相同字符序列的字符时，用\1, \2, ...

console.log(/(\w+),\s\1/.test('hello, hello')); //true
console.log(/(\w+),\s\1/.test('hello, xiaoming')); //false
```
### 非捕获组(?:x)
当需要把一系列元字符当成一个整体，不需要记住时可以用非捕获组
```
console.log(/^(?:abc){2}$/.test('abcabc'));//true
// 其实用捕获组也行
console.log(/^(abc){2}$/.test('abcabc'));//true
```
### 命名捕获组(?<name>x)和反向引用
和捕获组基本相同，命名捕获组作用在于有个名字，更好理解
```
console.log('abc123iii'.match(/abc(?<name>\d+)/));
//["abc123", "123", index: 0, input: "abc123iii", groups: {name: "123"}], 体现在结果的groups里面
```
#### 反向引用 \k\<name>
```
console.log('hello, hello'.match(/(?<name>\w+),\s\k<name>/));
// ["hello, hello", "hello", index: 0, input: "hello, hello", groups: {name: "hello"}]
```
## unicode类别匹配
unicode字符可以被分为多个类别,如Ll表示小写字母，Lu表示大写字母，Lt表示首字母大写字母，L表示字母，Lu表示其他字母，Sm数学符号，Sc货币符号,Emoji表示emoji表情

用法是 /\p{category}/u,这里必须使用unicode flag

查看类别信息：https://util.unicode.org/UnicodeJsps/properties.jsp

```
console.log(/\p{Emoji}/u.test('😀')); //true
```
## 贪婪和非贪婪
贪婪指的是在匹配字符串个数可变的情况下，正则表达式默认会尽可能多匹配，相关的量词有： +，?，*，{n}，{n,}，{n,m}

非贪婪指的是尽可能少匹配，通过在量词后面加上?启动非贪婪模式
```
console.log('    '.match(/(\s+)(\s+)/)); //[ '    ', '   ', ' ', index: 0, input: '    ', groups: undefined ]
console.log('    '.match(/(\s+?)(\s+?)/));// [ '  ', ' ', ' ', index: 0, input: '    ', groups: undefined ]
```
## 与正则相关的方法
RegExp的方法：test exec

String的方法：search、match、matchAll、replace、replaceAll、split
### RegExp.prototype.test(str)
测试字符串是否匹配正则表达式，返回值true或者false

如果设置了global或者stick模式，RegExp对象每次匹配会修改其lastIndex属性，知道匹配失败，lastIndex重置为0
```
// 普通情况
console.log(/abc/.test('abcd')); //true

// 设置了global情况
const regex = /abc/g;
console.log(regex.lastIndex); //0
console.log(regex.test('abcdabca'));//true
console.log(regex.lastIndex);//3
console.log(regex.test('abcdabca'));//true
console.log(regex.lastIndex);//7
console.log(regex.test('abcdabca'));//false
console.log(regex.lastIndex);//0

// 设置了stick的情况
const regex2 = /abc/y;
console.log(regex2.lastIndex); //0
console.log(regex2.test('abcabca'));//true
console.log(regex2.lastIndex);//3
console.log(regex2.test('abcabca'));//true
console.log(regex2.lastIndex);//6
console.log(regex2.test('abcabca'));//false
console.log(regex2.lastIndex);//0
```

### RegExp.prototype.exec(str)
返回字符串匹配正则表达式的结果，是一个数组，数组形如[matchStr, captureGroup1, captureGroup2, ..., index, input, groups: {'name1': nameCaptureGroup1, 'name2': nameCaptureGroup2}]

如果是g或者y模式，每次匹配会改变lastIndex，最后失败重置lastIndex
```
console.log(/a(\d)a(?<hh>\d)/.exec('tta1a5bcccc')); //["a1a5", "1", "5", index: 2, input: "tta1a5bcccc", groups: {hh: "5"}]

console.log(regex.lastIndex); //0
console.log(regex.exec('abcdabca'));//[ 'abc', index: 0, input: 'abcdabca', groups: undefined ]
console.log(regex.lastIndex); //3
console.log(regex.exec('abcdabca'));//[ 'abc', index: 4, input: 'abcdabca', groups: undefined ]
console.log(regex.lastIndex); //7
console.log(regex.exec('abcdabca'));//null
console.log(regex.lastIndex); //0
```

### String.prototype.search(regex|string)
如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引;否则，返回 -1

g和y模式下不会改变lastIndex
```
console.log('abc'.search(/b/)); //1
console.log('abc'.search(/d/)); //-1

console.log(regex.lastIndex); //0
console.log('habcabcb'.search(regex)); //1
console.log(regex.lastIndex); //0
console.log('habcabcb'.search(regex)); //1
```

### String.prototype.match(regex)
match() 普通情况下返回和exec一样

在g模式下，只返回一个所有匹配结果组成的数组

在y模式下，每次match都从string的lastIndex开始匹配，必须刚好匹配上lastindex开始的字符串，每次匹配完修改lastIndex, 即使目标string不是同一个也不影响
```
console.log('abcdabca'.match(/abc/)); // [ 'abc', index: 0, input: 'abcdabca', groups: undefined ]

console.log('abcdabca'.match(/abc/g));// ['abc', 'abc']

console.log(regex2.lastIndex);//0
console.log('abcabc'.match(regex2)); // [ 'abc', index: 0, input: 'abcabc', groups: undefined ]
console.log(regex2.lastIndex);//3
console.log('abcabcabc'.match(regex2));// [ 'abc', index: 3, input: 'abcabcabc', groups: undefined ]
console.log(regex2.lastIndex);//6
console.log('abc'.match(regex2));//null
```

### String.prototype.matchAll(regex)
matchAll() 方法返回一个包含所有匹配正则表达式的结果及分组捕获组的迭代器

正则表达式需使用 /g 标志, lastIndex不会改变. 如果没有g标志, chrome会报错, node会输出一个元素的数组

```
console.log([...'abcdabcabcv'.matchAll(/abc/g)]);
\*
[
  [ 'abc', index: 0, input: 'abcdabcabcv', groups: undefined ],
  [ 'abc', index: 4, input: 'abcdabcabcv', groups: undefined ],
  [ 'abc', index: 7, input: 'abcdabcabcv', groups: undefined ]
]
*/

//如果没有g标志, chrome会报错, node会输出一个元素的数组
console.log([...'abcdabcd'.matchAll(/abc/)]); //node: [ [ 'abc', index: 0, input: 'abcdabcd', groups: undefined ] ]
console.log([...'abcdabcd'.matchAll(/abc/)]); //chrome：VM152:1 Uncaught TypeError: String.prototype.matchAll called with a non-global RegExp argument
```
### String.prototype.replace(str|regex, newStr|function)
该方法并不改变调用它的字符串本身，而只是返回一个新的替换后的字符串
```
console.log('abcdabc'.replace(regex, 'hello')); //hellodhello
```
#### newStr中可以使用的符号
- $$ : $
- $& : 表示匹配的字符串
- $` : 表示匹配的字符串左边的部分
- $' : 表示匹配的字符串右边部分
- $n : 匹配组内容
- $<name> : 命名捕获组

```
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
```

#### replace和global模式, 会替换全部匹配的字符串
```
console.log('abcdefgabc'.replace(/abc/g, '123')); //123defg123
console.log('abcdefgabc'.replace(/(abc)/g, '$1123')); //abc123defgabc123
```

#### replace和函数
函数的参数是matchStr, capture1, capture2, ..., index, input, 命名捕获组成的对象 
```
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
```

### String.prototype.replaceAll(str|regex, newStr|function) 
当第一个参数是regex时，必须是global模式

兼容性不佳

用法和结果和replace的g模式一样

### String.prototype.split(str|regex[, limit])
使用指定的分隔符字符串将一个String对象分割成子字符串数组

limit是切分出的结果数组的长度
```
//在该方法中设置g\y模式是无意义的（和不设一样）
console.log('abcdefgdfff'.split(/d/, 2)); //[ 'abc', 'efg' ]
console.log('abcdefgdfff'.split(/d/g, 2)); //[ 'abc', 'efg' ]
console.log('abcdefgdfff'.split(/d/y, 2)); //[ 'abc', 'efg' ]
console.log('abcdefgDfff'.split(/d/i)); //[ 'abc', 'efg', 'fff' ]
```
