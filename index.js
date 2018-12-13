
const fs = require('fs');
const parse = require('csv-parse');
let readStream = fs.createReadStream('Tallest Buildings.csv');
let writeStream = fs.createWriteStream('newData.csv');

let csvArr = [];
// read into csv Arr

// what does pipe do? what does on do?
readStream.pipe(parse({delimiter:','})).on('data', (csvrow)=>{ 
    // csvArr.push(csvrow);
    // only push csvrows[1,3,& 4]
    let newCsvRow = [csvrow[1], csvrow[3], csvrow[4]];
    csvArr.push(newCsvRow);
}).on('end', ()=>{
    console.log(csvArr);
    
});

const func = ()=>{
    console.log("running func");
    // remove header
}

