#!/usr/bin/env node

const fs = require("fs");

export class movieDataService {

    constructor() {}

    async fetchHeaderRow() {
        var lineReader = require('readline').createInterface({
            input: fs.createReadStream('assets/title.basics.tsv/data.tsv'),
        });
        var lineCounter = 0; 
        var headerLine = '';
        lineReader.on('line', function (line) {
            headerLine = line;
            if (lineCounter == 0) { lineReader.close(); }
        });
        lineReader.on('close', function () {
            return (headerLine);
        });
    }

    async fetchMovieData() {
        var lineReader = require('readline').createInterface({
            input: fs.createReadStream('assets/title.basics.tsv/data.tsv'),
        });
        var lineCounter = 0; 
        var wantedLines = [];
        lineReader.on('line', function (line) {
            lineCounter++;
            wantedLines.push(line);
            if (lineCounter == 20) { lineReader.close(); }
        });
        lineReader.on('close', function () {
            console.log(wantedLines);
            return (wantedLines);
        });

        
    }

}