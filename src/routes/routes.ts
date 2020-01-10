import { movieDataService } from '../services/movieDataService';

export default function (express) {
    let movie= new movieDataService();
    const router = express.Router();
    
    router.get('/movie', async(req, res) => { 
        var ret = await movie.fetchMovieData();
        console.log('ret', ret);
        return ret;
        //  .then(result => res.json(result))
        //  .catch(err => res.send({'status': err.message}));
     })
    
    return router;
}