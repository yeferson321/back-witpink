import { Router } from 'express';
import jwt, { decode } from 'jsonwebtoken';
import verifyToken from './verifyToken.js';
import Businesscv from '../models/Businesscv.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

const router = Router();

router.post('/v1/register/bussinesscv', verifyToken, async (req, res, next) => {

    const { accounttype, name, categoria, correo, ubicacion, numero, descripcion } = req.body

    /* Getting the token from the header and verifying it. */
    const authorization = req.headers['authorization'];
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.KEY_TOKEN_AUTH);

    /* Saving the data in the database. */
    try {
        await User.findByIdAndUpdate({ "_id": decoded.id }, { accounttype: accounttype })
        const newUser = new Businesscv({ name: name, categoria: categoria, correo: correo, ubicacion: ubicacion, numero: numero, descripcion: descripcion, userid: decoded.id });
        await newUser.save()
        res.status(200).send({ auth: true, name: "UserIsAuthorized", message: token });

        next();

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
    } catch (error) {
        console.log(error)
        res.status(400).send({ auth: false, name: "TryAgain", message: "Intente de nuevo" });
    }

});

export default router;