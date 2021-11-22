const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        // const token = req.session.jwtToken;
        // jwt.verify(token,"",function(req)) 
        const token = req.header("authorization");
        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token, '09f26e402586e2faa8da4c98a35f1b20d6b033c60');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};