import { Router } from 'express'
import jwt from 'jsonwebtoken';
import verifyTokenLogin from './verifyTokenJwt.js';
import User from '../models/User.js'

const router = Router();

router.post('/v1/signup/auth', async (req, res) => {

    /* This is the code that is used to verify the token that was sent in the request. */
    const authorization = req.headers['authorization'];
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.KEY_TOKEN_SECURETOKEN);

    /* The code is trying to find a user in the database with the userid that was sent in the
    request. If the user is found, then a new token is created and sent back to the client. If the user
    is not found, then a new user is created and a new token is created and sent back to the client. */
    try {
        const user = await User.findOne({ userid: decoded.user_id })

        if (user) {
            const token = jwt.sign({ id: user._id, email: user.email, cypher: process.env.CYPHER, cyphertwo: process.env.CYPHERTWO }, process.env.KEY_TOKEN_AUTH, { expiresIn: '30m' })
            res.status(200).send({ auth: true, name: "UserIsAuthorized", message: token });
        } else {
            const newUser = new User({ userid: decoded.user_id, email: decoded.email, provider: decoded.firebase.sign_in_provider });
            const token = jwt.sign({ id: newUser._id, email: newUser.email, cypher: process.env.CYPHER, cyphertwo: process.env.CYPHERTWO }, process.env.KEY_TOKEN_AUTH, { expiresIn: '30m' })
            await newUser.save()
            res.status(200).send({ auth: true, newuser: true, name: "UserIsAuthorized", message: token });
        }
    } catch (error) {
        res.status(400).send({ auth: false, name: "TryAgain", message: "Intente de nuevo" });
    }

});

export default router;