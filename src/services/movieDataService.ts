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
            // var lineReaderRating = require('readline').createInterface({
            //     input: fs.createReadStream('assets/title.ratings.tsv/data.tsv'),
            // });
            console.log('in on');
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

            // lineReaderRating.on('line', function (ratingLine) {
            //     if (lineCounterRating == 0) { ratingHeader = ratingLine.split('\t') }
            //     if (lineCounterRating !== 0 && lineCounterRating < 11) {
            //         var rowElemRating = ratingLine.split('\t');
            //         for (var j = 0; j < rowElemRating.length; j++) {
            //             if (wantedLines[lineCounterRating - 1][ratingHeader[0]] === rowElemRating[0]) {
            //                 wantedLines[lineCounterRating - 1][ratingHeader[j]] = rowElemRating[j];
            //             }
            //         }
            //     }
            //     if (lineCounterRating > 10) { lineReaderRating.close(); }
            //     lineCounterRating++;
            // })

            if (wantedLines.length == 10) { lineReader.close(); }
            lineCounter++;
        });

        lineReader.on('close', function () {
            lineReader.removeAllListeners();
            console.log('close', wantedLines)
            return wantedLines;
        })

        return await wantedLines;
    }

}