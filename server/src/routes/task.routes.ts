import { Router } from 'express';
import { authenticateToken } from '../middlewares/auth.middleware';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/task.controller';

const router = Router();

// Apply authentication middleware to all task routes
// router.use(authenticateToken);

// Route to create a new task
router.post('/', authenticateToken, createTask);

// Route to get all tasks for the authenticated user
router.get('/', authenticateToken,  getTasks);

// Route to update a specific task by ID
router.put('/:id', authenticateToken, updateTask);

// Route to delete a specific task by ID
router.delete('/:id', authenticateToken, deleteTask);

export default router;