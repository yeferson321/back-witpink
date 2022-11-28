import { Router } from 'express'
import jwt from 'jsonwebtoken';
import verifyToken from './verifyToken.js';
import Usercv from '../models/Uservc.js'

const router = Router();

router.put('/v1/update/datos/usercv', verifyToken, async (req, res) => {

    const data = req.body

    // /* Getting the token from the header and verifying it. */
    const authorization = req.headers['authorization'];
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.KEY_TOKEN_AUTH);

    try {
            await  Usercv.findOneAndUpdate({"userid": decoded.id}, data)
            res.status(200).send({ auth: true, name: "UserIsAuthorized", message: "Datos actualizados" });
    } catch (error) {
        res.status(400).send({ auth: false, name: "TryAgain", message: "Intente de nuevo" });
    }

});

export default router;