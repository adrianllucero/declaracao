const fs = require('fs');

const file = fs.readFileSync('./img/carimbo_csfx.PNG');
const base64 = file.toString('base64');

console.log(base64);