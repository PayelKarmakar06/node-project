#!/usr/bin/env node
const fs = require("fs");

export class movieDataService {

    constructor() { }

    async fetchMovieData() {
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
            if (lineCounter > 0 && lineCounter < 10) {
                var rowElem = line.split('\t');
                for (var i = 0; i < rowElem.length; i++) {
                    var attr = header[i];
                    movieObj[attr] = rowElem[i];
                }
                wantedLines.push(movieObj);
            }
            if (lineCounter > 10) { lineReader.close(); }
            lineCounter++;

            lineReaderRating.on('line', function (ratingLine) {
                if (lineCounterRating == 0) { ratingHeader = ratingLine.split('\t') }
                if (lineCounterRating !== 0 && lineCounterRating < 10) {
                    var rowElemRating = ratingLine.split('\t');
                    for (var j = 0; j < rowElemRating.length; j++) {
                        if (wantedLines[lineCounterRating - 1][ratingHeader[0]] === rowElemRating[0]) {
                            wantedLines[lineCounterRating - 1][ratingHeader[j]] = rowElemRating[j];
                        }
                    }
                }
                if (lineCounterRating > 10) { lineReaderRating.close(); }
                lineCounterRating++;
            })
        });

        lineReader.on('close', function () {
            lineReader.removeAllListeners();
            return { data: wantedLines };
        })
    }

}