import { Router } from 'express'

const router = Router();

router.get('/', async (req, res) => {

    res.json({message:  "Compiled successfully!", auth: process.env.CYPHER });

});

export default router;