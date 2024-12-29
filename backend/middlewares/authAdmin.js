import jwt from "jsonwebtoken";

export const authAdmin = async (req, res, next) => {
    try {
        const token = req.headers;
        if(!token) return res.status(401).json({ message: "Unauthorized" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { email } = decoded;
        if (email !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};