import { Router } from 'express'

const router = Router();

router.post('/v1/text', async (req, res) => {

    const { text } = req.body

    console.log(req.body)

    res.json({message: "Compiled successfully!", text: text });

});

export default router;