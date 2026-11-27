import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Task title
    description: { type: String },
    completed: { type: Boolean, default: false }, // Task completion status (default is false)
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who owns the task
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.model("Task", taskSchema);