let ip = require('interpolating-polynomial');
let   f = interpolatingPolynomial([[1, 1],
    [2, 4],
    [3, 9],
    [5, 25]]);

for (x = 0; x < 10; x += 1) {
    console.log(x);
    console.log(f(x));
    console.log(' ');
}