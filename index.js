
const fs = require('fs');
const parse = require('csv-parse');
const stringify = require('csv-stringify');

let readStream = fs.createReadStream('Tallest Buildings.csv');
let writeStream = fs.createWriteStream('newData.csv');

let csvArr = [];
// read into csv Arr
let checkFirstRow = true;
// what does pipe do? what does on do?
readStream.pipe(parse({delimiter:','})).on('data', (csvrow)=>{ 
    // csvArr.push(csvrow);
    if (checkFirstRow) {
        console.log("skipping first row");
        checkFirstRow = false;
    }
    else{ // only push csvrows[1,3,& 4]
        let newCsvRow = [csvrow[1], csvrow[3], csvrow[4]];
        csvArr.push(newCsvRow);
        writeStream.write(newCsvRow.toString() + ",\r\n");
    }
}).on('end', ()=>{
    console.log(csvArr);
    writeStream.end();
});

// how do these anonymous functions work?
// const removeHeader = ()=>{ 
//     // remove header
//     csvArr = csvArr.slice(1);
// }

// const writeCSVToStream = ()=>{
//     csvArr.forEach((row)=>{
//         writeStream.pipe(stringify({delimiter:','}).write(row));
//     })
// }