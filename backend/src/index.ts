import express, { Request, Response } from 'express';
import cors from 'cors';
import { initializeData } from './services/salesService';
import salesRoutes from './routes/salesRoutes';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Retail Sales Management System API is running.');
});

app.use('/api/sales', salesRoutes);

const startServer = async () => {
    await initializeData(); 

    app.listen(PORT, () => {
        console.log('Server started on http://localhost:${PORT}');
    });
};

startServer();