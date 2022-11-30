import { Router } from 'express'
import jwt from 'jsonwebtoken';
import verifyTokenLogin from './verifyTokenJwt.js';
import User from '../models/User.js'

const router = Router();

router.post('/v1/signin/auth', verifyTokenLogin, async (req, res) => {

    /* Getting the token from the header and verifying it. */
    const authorization = req.headers['authorization'];
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.KEY_TOKEN_SECURETOKEN);

    /* Checking if the user exists in the database. */
    try {
        const user = await User.findOne({ email: decoded.email })

        if (user) {
            const token = jwt.sign({ id: user._id, email: user.email, cypher: process.env.CYPHER, cyphertwo: process.env.CYPHERTWO }, process.env.KEY_TOKEN_AUTH, { expiresIn: '30m' })
            res.status(200).send({ auth: true, name: "UserIsAuthorized", message: token, accounttype: user.accounttype, pinture: decoded.picture });
        } else {
            res.status(401).send({ auth: false, name: "UserNotFound", message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).send({ auth: false, name: "TryAgain", message: "Intente de nuevo" });
    }

});

export default router;