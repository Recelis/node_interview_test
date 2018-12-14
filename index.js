
const fs = require('fs');
const parse = require('csv-parse');

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
        writeStream.write(newCsvRow.toString() + ",\r\n"); // csv files are strings "stuff, stuff, stuff" apparently separated by \r\n 
    }
}).on('end', ()=>{
    writeStream.end();
    let meanHeight = getMeanHeight();
    console.log("the mean of the top " + csvArr.length + " buildings in the world is " + meanHeight + "m.");
});

// how do these anonymous functions work?
const getMeanHeight = () =>{
    // sum all of heights together
    let totalHeight = 0;
    csvArr.forEach((row, index) =>{
        let numRow = row[2]; // pass into numRow value
        // remove anything surrounded by []
        let brackets = row[2].match(/\[.+\]/g);
        // argh!!! so confusing!
        let bracketLocation = row[2].search(brackets);
        if ( bracketLocation >= 0){
            numRow = numRow.slice(0,bracketLocation); // assume that bracket location is always after numbers
        };
        // remove m in height using regex
        numRow = numRow.match(/[0-9.]/g);
        // put back together
        numRow = Number(numRow.join(''));
        totalHeight += numRow;
    });
    return (totalHeight/csvArr.length).toFixed(2);
};
