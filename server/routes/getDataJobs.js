import { Router } from 'express'
import Jobs from '../models/Jobs.js';

const router = Router();

router.get('/v1/datos/search/jobs/:search?', async (req, res) => {

    const searchs = req.params.search

    /* A search engine that searches for a job by cargo. */
    try {
        if (searchs) {
            const search = await Jobs.find({ cargo: searchs })
            res.status(200).send({ auth: true, name: "UserIsAuthorized", message: search });
        } else {
            const search = await Jobs.find({})
            res.status(200).send({ auth: true, name: "UserIsAuthorized", message: search });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ auth: false, name: "TryAgain", message: "Intente de nuevo" });
    }

});

export default router;