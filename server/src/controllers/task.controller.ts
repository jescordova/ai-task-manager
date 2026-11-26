import { Request, Response } from 'express';
import Task from '../models/Task.model';

export const createTask = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id; // Get the authenticated user's ID
        const task = await Task.create({ 
            ...req.body, 
            user: userId // Associate the task with the authenticated user
        });
        res.status(201).json({ message: "Task created successfully 🎉", task });
    } catch (error) {
        // console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error while creating task" });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id; // Get the authenticated user's ID
        const tasks = await Task.find({ user: userId }); // Fetch tasks belonging to the authenticated user
        res.status(200).json({ message: "Tasks retrieved successfully ✅", tasks });
    } catch (error) {
        // console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Server error while fetching tasks" });
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id; // Get the authenticated user's ID
        const taskId = req.params.id;
        const task = await Task.findOneAndUpdate(
            { _id: taskId, user: userId }, // Ensure the task belongs to the authenticated user
            req.body,
            { new: true } // Return the updated task
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized ❌" });
        }
        res.status(200).json({ message: "Task updated successfully ✅", task });
    } catch (error) {
        // console.error("Error updating task:", error);
        res.status(500).json({ message: "Server error while updating task ❌" });
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id; // Get the authenticated user's ID
        const taskId = req.params.id;
        const task = await Task.findOneAndDelete(
            { _id: taskId, user: userId } // Ensure the task belongs to the authenticated user
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized ❌" });
        }
        res.status(200).json({ message: "Task deleted successfully ✅" });
    } catch (error) {
        // console.error("Error deleting task:", error);
        res.status(500).json({ message: "Server error while deleting task 🗑️" });
    }
}
