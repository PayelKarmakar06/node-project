import { movieDataService } from '../services/movieDataService';

export default function (express) {
    let movie= new movieDataService();
    const router = express.Router();
    
    router.get('/movie', (req, res) => { 
        movie.fetchMovieData()
         .then(result => res.json(result))
         .catch(err => res.send({'status': err.message}));
     })
    
    return router;
}