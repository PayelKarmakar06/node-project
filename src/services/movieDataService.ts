#!/usr/bin/env node
const fs = require("fs");
const Papa = require("papaparse");

export class movieDataService {

    constructor() { }

    async fetchMovieData(pageNo: number, searchBy?: string, sortBy?: string, order?: string) {
        var wantedLines = [];
        if (searchBy && searchBy !== 'undefined') {
            console.log('in if')
            wantedLines = await this.searchMovieData(searchBy);
        } else if(sortBy && order && sortBy !== 'undefined' && order !== 'undefined') {
            console.log('in else if')
            wantedLines = await this.sortMovieData(sortBy, order);
        } else {
            console.log('in else');
            const fileName = "assets/title.basics.tsv/data.tsv";
            const file = fs.createReadStream(fileName);
            var lineReader = require('readline').createInterface({ input: file });
            var lineCounter = 0;
            var header = [];
            var lineCounterRating = 0;
            var ratingHeader = [];

            lineReader.on('line', function (line) {
                var movieObj = {};
                if (lineCounter == 0) { header = line.split('\t'); }
                if (lineCounter > pageNo * 10 && lineCounter < (pageNo * 10) + 10) {
                    if (lineCounter % 10 == 1) { lineCounter--; }
                    var rowElem = line.split('\t');
                    for (var i = 0; i < rowElem.length; i++) {
                        var attr = header[i];
                        if (attr === 'tconst' || attr === 'primaryTitle' || attr === 'startYear' || attr === 'runtimeMinutes' || attr === 'genres') {
                            movieObj[attr] = rowElem[i];
                        }
                    }
                    wantedLines.push(movieObj);
                }

                if (wantedLines.length == 10) { lineReader.close(); }
                lineCounter++;
            });

            lineReader.on('close', function () {
                var lineReaderRating = require('readline').createInterface({
                    input: fs.createReadStream('assets/title.ratings.tsv/data.tsv'),
                });
                lineReaderRating.on('line', function (ratingLine) {
                    let rowIndex = 0;
                    if (lineCounterRating == 0) { ratingHeader = ratingLine.split('\t'); }
                    if (lineCounterRating > pageNo * 10 && lineCounterRating < (pageNo * 10) + 10) {
                        if (lineCounterRating % 10 == 1) { lineCounterRating--; }
                        const rowElemRating = ratingLine.split('\t');
                        rowIndex = wantedLines.findIndex(elem => { return elem.tconst === rowElemRating[0] });
                        for (var j = 0; j < rowElemRating.length; j++) {
                            if (rowIndex > -1 && ratingHeader[j] == 'averageRating') {
                                wantedLines[rowIndex][ratingHeader[j]] = rowElemRating[j];
                            }
                        }
                        console.log('wantedLines', wantedLines)
                    }
                    if (rowIndex == -1) { lineReaderRating.close(); }
                    lineCounterRating++;
                })
                lineReader.removeAllListeners();
                return wantedLines;
            })
        }

        return wantedLines;
    }

    async searchMovieData(searchBy: string) {
        var wantedLines = [];
        const fileName = "assets/title.basics.tsv/data.tsv";
        const file = fs.createReadStream(fileName);
        const ratingFile = fs.createReadStream('assets/title.ratings.tsv/data.tsv');
        var searchResult = [];
        var headerRow = [];
        Papa.parse(file, {
            delimiter: "\t",
            worker: true,
            step: (results) => {
                headerRow = results.data;
                Papa.abort();
            }
        })
        Papa.parse(file, {
            delimiter: "\t",
            worker: true,
            LocalChunkSize: 1024 * 1024 * 5,
            chunk: (results) => {
                searchResult = results.data.filter(data => data[2].toLowerCase().indexOf(searchBy) > -1 ||
                    data[7].indexOf(searchBy) > -1 || data[8].toLowerCase().indexOf(searchBy) > -1);
                for (let i = 0; i < searchResult.length; i++) {
                    let rowElem = searchResult[i];
                    let movieObj = {};
                    for (let j = 0; j < rowElem.length; j++) {
                        let attr = headerRow[j];
                        if (attr === 'tconst' || attr === 'primaryTitle' || attr === 'startYear' || attr === 'runtimeMinutes' || attr === 'genres') {
                            movieObj[attr] = rowElem[j];
                        }
                    }
                    wantedLines.push(movieObj);
                }
                Papa.abort();
            }
        });
        Papa.parse(ratingFile, {
            delimiter: "\t",
            worker: true,
            LocalChunkSize: 1024 * 1024 * 5,
            chunk: (results) => {
                for (let i = 0; i < wantedLines.length; i++) {
                    let rowElem = results.data.find(rowData => { return wantedLines[i].tconst === rowData[0] });
                    wantedLines[i]['averageRating'] = rowElem[1];
                }
                Papa.abort();
                return wantedLines;
            }
        });
        return wantedLines;
    }

    async sortMovieData(fieldName, sortingOrder) {
        var wantedLines = [];
        const fileName = "assets/title.basics.tsv/data.tsv";
        const file = fs.createReadStream(fileName);
        const ratingFile = fs.createReadStream('assets/title.ratings.tsv/data.tsv');
        var headerRow = [];
        Papa.parse(file, {
            delimiter: "\t",
            worker: true,
            step: (results) => {
                headerRow = results.data;
                Papa.abort();
            }
        })
        Papa.parse(file, {
            delimiter: "\t",
            worker: true,
            LocalChunkSize: 1024 * 1024 * 5,
            chunk: (results) => {
                for (let i = 0; i < results.data.length; i++) {
                    let rowElem = results.data[i];
                    let movieObj = {};
                    for (let j = 0; j < rowElem.length; j++) {
                        let attr = headerRow[j];
                        if (attr === 'tconst' || attr === 'primaryTitle' || attr === 'startYear' || attr === 'runtimeMinutes' || attr === 'genres') {
                            movieObj[attr] = rowElem[j];
                        }
                    }
                    wantedLines.push(movieObj);
                }
                Papa.abort();
            }
        });
        Papa.parse(ratingFile, {
            delimiter: "\t",
            worker: true,
            LocalChunkSize: 1024 * 1024 * 5,
            chunk: (results) => {
                for (let i = 0; i < wantedLines.length; i++) {
                    let rowElem = results.data.find(rowData => { return wantedLines[i].tconst === rowData[0] });
                    wantedLines[i]['averageRating'] = rowElem[1];
                }
                if (sortingOrder === 'asc') { wantedLines = wantedLines.sort((a, b) => { return a[fieldName] - b[fieldName] }); }
                else { wantedLines = wantedLines.sort((a, b) => { return b[fieldName] - a[fieldName] }); }
                Papa.abort();
                return wantedLines;
            }
        });
        return wantedLines;
    }
}