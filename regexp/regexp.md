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
元字符包括： \\, \d, \D, \w, \W, \s, \S, \n, \r, \t, \v, \f, [\b], \0, \xhh, \uhhhh, \u{hhhh}或者\u{hhhhh} 
### \\-转义符号
正则表达式中需要转义的符号有:

&, (), *, +, ., [], ?, \\, ^, {}, |

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
具体看demo8吧，太多了