import { Router } from 'express'
import jwt, { decode } from 'jsonwebtoken';
import verifyTokenLogin from './verifyTokenJwt.js';
import User from '../models/User.js'
import nodemailer from 'nodemailer';

const router = Router();

router.post('/v1/signup/auth', verifyTokenLogin, async (req, res) => {

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
            res.status(200).send({ auth: true, name: "UserIsAuthorized", message: token, pinture: decoded.picture });
        } else {
            const newUser = new User({ userid: decoded.user_id, email: decoded.email, provider: decoded.firebase.sign_in_provider });
            const token = jwt.sign({ id: newUser._id, email: newUser.email, cypher: process.env.CYPHER, cyphertwo: process.env.CYPHERTWO }, process.env.KEY_TOKEN_AUTH, { expiresIn: '30m' })
            await newUser.save()
            res.status(200).send({ auth: true, newuser: true, name: "UserIsAuthorized", message: token, pinture: decoded.picture });

            const button = 'https://witpink.vercel.app/'

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAILMAILER, // generated ethereal user
                    pass: process.env.PASSWORDMAILER, // generated ethereal password
                },
            });

            const info = await transporter.sendMail({
                from: '"WitPink " <helloworldmanage@gmail.com>', // sender address
                to: decoded.email, // list of receivers
                subject: "Bienvenido a WitPink", // Subject line
                text: "El futuro es hoy!", // plain text body
                html:
                    `<div style='text-align: center; padding: 0% 14%;'>
                        <h3 style='margin-bottom: 3%; color: gray;' >Bienvenido a WitPink</h3><br> 
                        <h4 style='margin-bottom: 3%; color: gray;' >Nuestro algoritmo de selección automática de candidatos analiza los requisitos de su trabajo y tiene en cuenta cada una de las habilidades y actitudes del aspirante para hacer más probable contratar al candidato deseado.</h4><br> 
                        <a href="${button}"><button style='background-color: #6366f1; color: #fff;  border-color: #ffffff00; padding: 12px 35px; font-size: 15px; border-radius: 10px;' type="submit">Ir a la plataforma</button></a>
                    <div/>`,
            });

        }
    } catch (error) {
        console.log(error)
        res.status(400).send({ auth: false, name: "TryAgain", message: "Intente de nuevo" });
    }

});

export default router;