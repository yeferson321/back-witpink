import { Router } from 'express'
import jwt from 'jsonwebtoken';
import verifyToken from './verifyToken.js';
import Usercv from '../models/Uservc.js'

const router = Router();

router.get('/v1/datos/usercv', verifyToken, async (req, res) => {

    /* Getting the token from the header and verifying it. */
    const authorization = req.headers['authorization'];
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.KEY_TOKEN_AUTH);

    /* Trying to find the user in the database and if it is not found, it will return an error. */
    try {
        const datacv = await Usercv.findOne({ userid: decoded.id })
        console.log(datacv)
        res.status(200).send({ auth: true, name: "UserIsAuthorized", message: datacv });
    } catch (error) {
        res.status(400).send({ auth: false, name: "TryAgain", message: "Intente de nuevo" });
    }

});

export default router;