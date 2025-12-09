/// <reference types="node" />
import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectDB } from './utils/database'; 
import salesRoutes from './routes/salesRoutes';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [process.env.CORS_ORIGIN || 'https://your-frontend-domain.vercel.app']
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'];

app.use(cors({ origin: allowedOrigins })); 
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Retail Sales Management System API is running.');
});

app.use('/api/sales', salesRoutes);

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer();