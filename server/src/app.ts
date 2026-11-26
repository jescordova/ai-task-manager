import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';

const app = express();

// Middleware
app.use(cors()); // Permet les requêtes cross-origin de front-end
app.use(helmet()); // Sécurise les en-têtes HTTP
app.use(express.json()); // Permet de parser les requêtes JSON

// Routes
app.use('/auth', authRoutes); // Routes d'authentification
app.use('/user', userRoutes); // Routes utilisateur protégées
app.use('/tasks', taskRoutes); // Routes de gestion des tâches protégées

// Route de test
app.get('/', (req, res) => {
  res.json({ message: "API is working! 🚀" });
});
export default app;