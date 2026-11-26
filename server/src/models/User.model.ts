import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // User's name
    email: { type: String, required: true, unique: true }, // User's email (must be unique)
    password: { type: String, required: true }, // User's password (hashed)
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export default mongoose.model("User", userSchema);