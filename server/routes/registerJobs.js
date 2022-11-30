import { Router } from 'express';
import jwt, { decode } from 'jsonwebtoken';
import verifyToken from './verifyToken.js';
import Jobs from '../models/Jobs.js';
import Businesscv from '../models/Businesscv.js';

const router = Router();

router.post('/v1/register/oferta', verifyToken, async (req, res) => {

    const { form, habilidades  } = req.body

    /* Getting the token from the header and verifying it. */
    const authorization = req.headers['authorization'];
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.KEY_TOKEN_AUTH);

    /* Saving the data in the database. */
    try {
        const user = await Businesscv.findOne({ userid: decoded.id })
        const newUser = new Jobs({ tiempo: form.tiempo, empresa: user.name, cargo: form.cargo, salario: form.salario, habilidades: habilidades, descripcion: form.descripcion, jobsid: decoded.id });
        await newUser.save()
        res.status(200).send({ auth: true, name: "UserIsAuthorized", message: "Oferta agregada" });

    } catch (error) {
        console.log(error)
        res.status(400).send({ auth: false, name: "TryAgain", message: "Intente de nuevo" });
    }

});

export default router;