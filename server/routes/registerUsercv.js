import { Router } from 'express'
import jwt from 'jsonwebtoken';
import verifyToken from './verifyToken.js';
import Usercv from '../models/Uservc.js'
import User from '../models/User.js'

const router = Router();

router.post('/v1/register/usercv', verifyToken, async (req, res) => {

    const { accounttype, name, prefijo, telefono, ocupacion, conocimientos, habilidades, nivel, idiomas, interes, presentacion } = req.body

    /* Getting the token from the header and verifying it. */
    const authorization = req.headers['authorization'];
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.KEY_TOKEN_AUTH);

    /* Saving the data in the database. */
    try {
        await User.updateOne({ accounttype: accounttype })
        const newUser = new Usercv({ name: name, prefijo: prefijo, telefono: telefono, ocupacion: ocupacion, conocimientos: conocimientos, habilidades: habilidades, nivel: nivel, idiomas: idiomas, interes: interes, presentacion: presentacion, userid: decoded.id });
        await newUser.save()
        res.status(200).send({ auth: true, name: "UserIsAuthorized", message: token });
    } catch (error) {
        res.status(400).send({ auth: false, name: "TryAgain", message: "Intente de nuevo" });
    }

});

export default router;