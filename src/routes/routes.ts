import { movieDataService } from '../services/movieDataService';

export default function (express) {
    let movie = new movieDataService();
    const router = express.Router();

    router.get('/movie', async (req, res) => {
        const pageNo = req.query.page ? parseInt(req.query.page) : 0;
        console.log('a');
        await movie.fetchMovieData(pageNo)
            .then(result => {
                setTimeout(function() {
                    console.log('result', result)
                    res.send({ 'data': result })
                }, 3000)
            })
            .catch(err => res.send({ 'status': err.message }));
    })

    return router;
}