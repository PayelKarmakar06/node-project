// const fs = require("fs");
// const Papa = require("papaparse");

// export class utilityService {
//     async concattsvAndOutput(tsvFilePaths, outputFilePath) {
//         const promises = tsvFilePaths.map((path) => {
//           return new Promise((resolve) => {
//             const dataArray = [];
//             return tsv
//                 .fromPath(path, {headers: true})
//                 .on('data', function(data) {
//                   dataArray.push(data);
//                 })
//                 .on('end', function() {
//                   resolve(dataArray);
//                 });
//           });
//         });
      
//         return Promise.all(promises)
//             .then((results) => {
//               const tsvStream = tsv.format({headers: true});
//               const writableStream = fs.createWriteStream(outputFilePath);
      
//               writableStream.on('finish', function() {
//                 console.log('DONE!');
//               });
      
//               tsvStream.pipe(writableStream);
//               results.forEach((result) => {
//                 result.forEach((data) => {
//                   tsvStream.write(data);
//                 });
//               });
//               tsvStream.end();
//             });
//       }
// }