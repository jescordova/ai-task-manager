import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI  as string);
    console.log("✅ MongoDB connecté");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB:", error);
    process.exit(1); // Arrête le serveur en cas d'erreur de connexion
  }
};

export default connectDB;