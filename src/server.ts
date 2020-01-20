import * as bodyParser from 'body-parser';
import * as express from 'express';
//import JoinCSV from 'JoinCSV';
import * as morgan from 'morgan';
import router from './routes/routes';
const app = express();
const port = 3000;

 
//pass the two files, and the ids to merge on
// let csvJoiner = new JoinCSV('assets/title.basics.tsv/data.tsv', 'assets/title.ratings.tsv/data.tsv', 'tconst');
// var result = await csvJoiner.PerformJoin();
// var csvResult = await csvJoiner.convertData2CSV(result.data, 'assets/result.tsv');

// console.log(csvResult);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/', router(express));

// Starting the express server
app.listen(port, (err) => {
  if (err) throw err;
  console.log("App listening on port " + port);
});

