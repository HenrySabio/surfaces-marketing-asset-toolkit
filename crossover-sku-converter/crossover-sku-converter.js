// Loads file system modile, converts text file data to an array
const fs = require('fs');
let searchCodes = fs.readFileSync('data/search.txt').toString().split('\n');
let bulkCodes = fs.readFileSync('data/bulk_codes.txt').toString().split('\n');
let stockCodes = fs.readFileSync('data/stock_codes.txt').toString().split('\n');

for (let i = 0; i < searchCodes.length; i++) {
        for (let x = 0; x < stockCodes.length; x++) {
            if (searchCodes[i] == bulkCodes[x]) {
                fs.appendFile(`data/conversion.txt`, `${stockCodes[x]}\n`, function (err) {
                    if (err) return console.log(err);
                })
                console.log(`${searchCodes[i]},${stockCodes[x]}`)
                break;
            }
        }
}