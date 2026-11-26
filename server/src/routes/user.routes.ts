import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

// Protected route example
router.get('/profile', authenticateToken, (req, res) => {
    // const user = (req as any).user; // Access the user data from the token
    res.json({ 
        message: "Welcome to your secret space 😎" 
    });
});

export default router;