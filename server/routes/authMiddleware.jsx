const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Split 'Bearer ' from the token
    if (!token) {
        return res.status(401).json({ message: 'Token missing or invalid format' });
    }
    console.log('request : ', token)
    console.log('secret key', secretKey)

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        req.user = user; // Attach user information to the request object
        next();
    });
};

module.exports = { verifyToken };