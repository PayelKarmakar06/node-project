import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';
import router from './routes/routes';
import { movieDataService } from './services/movieDataService';
const app = express();
const port = 3000;
let movie = new movieDataService();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

movie.fetchMovieData()
  .then(result => {
    console.log('hi', result);
  })
  
app.use('/api/', router(express));
// Starting the express server
app.listen(port, (err) => {
  if (err) throw err;
  console.log("App listening on port " + port);
});

