import { Router } from 'express';
import { getSales, getMetrics } from '../controllers/salesController';
import SalesRecordModel from '../models/SalesRecord';

const router = Router();

router.get('/', getSales);
router.get('/metrics', getMetrics);

router.get('/debug/info', async (req, res) => {
    try {
        const db = SalesRecordModel.collection.conn.db;
        if (!db) {
            return res.status(500).json({ error: 'Database not connected' });
        }
        
        const collections = await db.listCollections().toArray();
        const count = await SalesRecordModel.countDocuments();
        const sample = await SalesRecordModel.collection.findOne();
        
        console.log('Available collections:', collections.map(c => c.name));
        console.log('Document count:', count);
        console.log('Sample document:', sample);
        
        res.json({
            totalRecords: count,
            sampleData: sample,
            collections: collections.map(c => c.name),
            modelName: SalesRecordModel.collection.name
        });
    } catch (error) {
        console.error('Debug error:', error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

export default router;