import jwt from "jsonwebtoken";

function verifyTokenLogin(req, res, next) {

    /* Getting the token from the header. */
    const authorization = req.headers['authorization'];
    const token = authorization.replace('Bearer ', '');

    /* Checking if the token is valid or not. */
    if (token) {
        jwt.verify(token, process.env.KEY_TOKEN_SECURETOKEN, function (err, decoded) {
            if (err) {
                res.status(401).send({ auth: false, name: err.name, message: err.message });
            } else if (decoded.iss === process.env.ISS && decoded.aud === process.env.AUD) {
                next();
            } else {
                return res.status(401).send({ auth: false, name: "TokenIsInvalid", message: "jwt is invalid" });
            }
        });
    } else {
        return res.status(401).send({ auth: false, name: "TokenNotFound", message: "jwt not found" });
    }

}

export default verifyTokenLogin