import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { loadSalesData } from './utils/dataLoader'; 
import salesRoutes from './routes/salesRoutes';
import { CleanSalesRecord } from './models/SalesRecord';

declare global {
    namespace Express {
        interface Request {
            salesData: CleanSalesRecord[];
        }
    }
}

const PORT = process.env.PORT || 5000;

const app = express();

let globalSalesData: CleanSalesRecord[] = [];

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const injectSalesData = (req: Request, res: Response, next: NextFunction) => {

    req.salesData = globalSalesData;
    next();
};


const startServer = async () => {
    try {
        console.log("Starting data loading process via streaming...");
        globalSalesData = await loadSalesData();
        console.log("Data loading complete. Server ready to handle requests.");
    } catch (error) {
        console.error("CRITICAL: Failed to load sales data. Shutting down.", error);
        process.exit(1); 
    }

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('Retail Sales Management System API is running.');
    });

    app.use('/api/sales', injectSalesData, salesRoutes);

    app.listen(PORT, () => {
        console.log('Server running on http://localhost:${PORT}');
    });
};

startServer();