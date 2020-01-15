#!/usr/bin/env node
const fs = require("fs");

export class movieDataService {

    constructor() { }

    async fetchMovieData(pageNo: number) {
        var lineReader = require('readline').createInterface({
            input: fs.createReadStream('assets/title.basics.tsv/data.tsv'),
        });
        var lineCounter = 0;
        var wantedLines = [];
        var header = [];
        var lineCounterRating = 0;
        var ratingHeader = [];

        lineReader.on('line', function (line) {
            var lineReaderRating = require('readline').createInterface({
                input: fs.createReadStream('assets/title.ratings.tsv/data.tsv'),
            });
            var movieObj = {};
            if (lineCounter == 0) { header = line.split('\t'); }
            if (lineCounter > pageNo * 10 && lineCounter < (pageNo * 10) + 10) {
                if(lineCounter % 10 == 1) { lineCounter--; }
                var rowElem = line.split('\t');
                for (var i = 0; i < rowElem.length; i++) {
                    var attr = header[i];
                    movieObj[attr] = rowElem[i];
                }
                wantedLines.push(movieObj);
            }

            lineReaderRating.on('line', function (ratingLine) {
                let rowIndex = 0;
                if (lineCounterRating == 0) { ratingHeader = ratingLine.split('\t'); }
                if (lineCounterRating > pageNo * 10 && lineCounterRating < (pageNo * 10) + 10) {
                    if(lineCounterRating % 10 == 1) { lineCounterRating--; }
                    const rowElemRating = ratingLine.split('\t');
                    rowIndex = wantedLines.findIndex(elem => { return elem.tconst === rowElemRating[0]});
                    for (var j = 0; j < rowElemRating.length; j++) {
                        if(rowIndex > -1) {
                            wantedLines[rowIndex][ratingHeader[j]] = rowElemRating[j];
                        }
                    }
                }
                if(rowIndex == -1) { lineReaderRating.close(); }
                lineCounterRating++;
            })

            if (wantedLines.length == 10) { lineReader.close(); }
            lineCounter++;
        });

        lineReader.on('close', function () {
            lineReader.removeAllListeners();
            return wantedLines;
        })

        return wantedLines;
    }

}