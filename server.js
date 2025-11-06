import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import visualRoutes from './routes/visualRoutes.js';
import { connectDB } from './connectDB/db.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',visualRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



