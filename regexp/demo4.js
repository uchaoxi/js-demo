/**
 * @file 断言、条件控制符
 * ^ $
 * x(?=y) follow
 * (?<=y)x before
 * x(?!y) not follow
 * (?<!y)x not before
 * /b word edge
 * /B not word edge
 */

console.log(/abc(?=123)/.test('abc123')); // true
console.log(/abc(?=123)/.test('abc')); // false
console.log(/(?<=start)abc/.test('startabc123')); // true
console.log(/abc(?!123)/.test('abc123')); //false
console.log(/(?<!start)abc/.test('startabc')); // false

console.log(/word\b/.test('good wordbreaks')); //false
console.log(/word\b/.test('word break')); // true

console.log(/word\B/.test('good wordbreaks')); //ture
console.log(/word\B/.test('word break')); // false

