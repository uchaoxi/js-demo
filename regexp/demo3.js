/**
 * @file base chars
 * 
 * \w [a-zA-Z_]
 * \W [^a-zA-Z_]
 * \d [0-9]
 * \D [^0-9]
 * \s space
 * \S space
 * \n 换行符 (U+000A)
 * \r 回车符 (U+000D)
 * \t 水平制表符 (U+0009)
 * \v 垂直制表符 (U+000B)
 * \f 换页符 (U+000C)
 * [\b] 退格(U+0008)
 * \0 NUL character
 */

 console.log(/\n/.test('\n')); // true
 console.log(/\r/.test('\r')); // true
 console.log(/\t/.test('\t')); // true
 console.log(/\v/.test('\v')); // true
 console.log(/\f/.test('\f')); // true
 console.log(/[\b]/.test('\b')); // true
