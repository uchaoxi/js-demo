/**
 * @file 贪婪匹配和非贪婪匹配
 * 贪婪： +，?，*，{n}，{n,}，{n,m}
 * 非贪婪： 加上？
 */

console.log('    '.match(/(\s+)(\s+)/)); //[ '    ', '   ', ' ', index: 0, input: '    ', groups: undefined ]
console.log('    '.match(/(\s+?)(\s+?)/));// [ '  ', ' ', ' ', index: 0, input: '    ', groups: undefined ]