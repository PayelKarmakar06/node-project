#!/usr/bin/env node

const fs = require("fs");

export class movieDataService {

    public headerArray = [];

    constructor() { }

    async fetchMovieData() {
        var lineReader = require('readline').createInterface({
            input: fs.createReadStream('assets/title.basics.tsv/data.tsv'),
        });
        var lineCounter = 0;
        var wantedLines = [];
        var header = [];
        lineReader.on('line', function (line) {
            var lineReader = require('readline').createInterface({
                input: fs.createReadStream('assets/title.ratings.tsv/data.tsv'),
            });
            var lineCounter2 = 0;
            lineReader.on('line', function (line) {
                if (lineCounter2 == 0)
            });
            if (lineCounter == 0) { header = line.split('\t'); }
            if (lineCounter !== 0) {
                var rowElem = line.split('\t');
                var movieObj = {};
                for (var i = 0; i < rowElem.length; i++) {
                    var attr = header[i];
                    movieObj[attr] = rowElem[i];
                }
                wantedLines.push(movieObj);
            }
            if (lineCounter == 20) { lineReader.close(); }
            lineCounter++;
        });
        lineReader.on('close', function () {
            return wantedLines;
        });
    }

}