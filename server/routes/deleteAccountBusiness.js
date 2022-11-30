import { Router } from 'express'
import jwt from 'jsonwebtoken';
import verifyToken from './verifyToken.js';
import Businesscv from '../models/Businesscv.js';
import User from '../models/User.js';

const router = Router();

router.delete('/v1/delete/accountbusiness', verifyToken, async (req, res) => {

    const data = req.body

    // /* Getting the token from the header and verifying it. */
    const authorization = req.headers['authorization'];
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.KEY_TOKEN_AUTH);

    try {
        await User.findOneAndDelete({ "_id": decoded.id })
        await Businesscv.findOneAndDelete({ userid: decoded.id })
        res.status(200).send({ auth: true, name: "UserIsAuthorized", message: "Cuenta eliminada" });
    } catch (error) {
        res.status(400).send({ auth: false, name: "TryAgain", message: "Intente de nuevo" });
    }

});

export default router;