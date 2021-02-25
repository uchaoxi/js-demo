/**
 * @file new RegExp, & propteries
 */

const regex1 = /abc(\d)+/i;
const regex2 = new RegExp(/abc(\d)+/, 'i');
const regex3 = new RegExp('abc(\\d)+', 'i');

const str = 'abC1234abc';

console.log(regex1.exec(str)); // 'abC1234', '4', index: 0, input: 'abC1234abc', groups: undefined ]
console.log(regex2.exec(str)); // same with above
console.log(regex3.exec(str)); // same with aboved sssssssss