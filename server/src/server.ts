import app  from './app';
import * as dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config(); // charge les variables d'environnement depuis le fichier .env
// connectDB(); // Connecte à MongoDB avant de démarrer le serveur
const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  await connectDB(); // Connecte à MongoDB avant d'écouter les requêtes
  console.log(`🚀 Server is running on port http://localhost:${PORT}`);
});