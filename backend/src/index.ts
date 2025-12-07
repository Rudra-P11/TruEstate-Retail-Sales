import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectDB } from './utils/database'; 
import salesRoutes from './routes/salesRoutes';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); 
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