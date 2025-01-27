import jwt from "jsonwebtoken";

export const authDoctor = async (req, res, next) => {
    try {
        console.log('Headers:', req.headers);
        const dToken = req.headers.authorization?.split(' ')[1] || req.headers.token;
        console.log('Extracted Token:', dToken);

        if (!dToken) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(dToken, process.env.JWT_SECRET_KEY);
        req.body.docId = decoded.id;
        next();
    } catch (error) {
        console.error('Auth Error:', error);
        return res.status(401).json({ message: "Invalid token" });
    }
};