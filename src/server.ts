import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';
import router from './routes/routes';
const app = express();
const port = 3000;

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

