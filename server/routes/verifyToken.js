import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {

    /* Getting the token from the header. */
    const authorization = req.headers['authorization'];
    const token = authorization.replace('Bearer ', '');

    /* Checking if the token is valid or not. */
    if (token) {
        jwt.verify(token, process.env.KEY_TOKEN_AUTH, function (err, decoded) {
            if (err) {
                res.status(401).send({ auth: false, name: err.name, message: err.message });
            } else if (decoded.cypher === process.env.CYPHER && decoded.cyphertwo === process.env.CYPHERTWO) {
                next();
            } else {
                return res.status(401).send({ auth: false, name: "TokenIsInvalid", message: "jwt is invalid" });
            }
        });
    } else {
        return res.status(401).send({ auth: false, name: "TokenNotFound", message: "jwt not found" });
    }

}

export default verifyToken