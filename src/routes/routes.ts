import { movieDataService } from '../services/movieDataService';

export default function (express) {
    let movie = new movieDataService();
    const router = express.Router();

    router.get('/movie', async (req, res) => {
        const pageNo = req.query.page ? parseInt(req.query.page) : 0;
        await movie.fetchMovieData(pageNo, req.query.searchBy, req.query.sortBy, req.query.order)
            .then(result => {
                setTimeout(function() {
                    res.send({ 'data': result })
                }, 6000)
            })
            .catch(err => res.send({ 'status': err.message }));
    })

    return router;
}