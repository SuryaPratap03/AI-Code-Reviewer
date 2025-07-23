import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './routes/ai.routes.js';

const app = express();
dotenv.config();

// ✅ Enable CORS for your frontend port (Vite: 5173)
app.use(cors({
  origin: '*'
}));


// ✅ Must come after cors()
app.use(express.json());

// app.get('/', (req, res) => {
//   res.json("App is working great 😁");
// });

app.use('/ai', aiRoutes);

export default app;
