import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided ❌" });
        }
        
        // Verify the token
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET as string
        ) as any;
        // normalized user object: controllers expect an `_id` field
        (req as any).user = {
            _id: decoded._id || decoded.userId,
            ...decoded,
        }; // Attach decoded token data to the request object
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token ❌" });
    }
}