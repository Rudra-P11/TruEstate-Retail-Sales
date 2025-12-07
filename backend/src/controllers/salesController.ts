import { Request, Response } from 'express';
import { getSalesData, SalesQuery } from '../services/salesService';

/**
 * Extracts and formats the query parameters for the SalesQuery interface.
 */
const formatQuery = (req: Request): SalesQuery => {
    const { search, page, pageSize, sortBy, sortOrder } = req.query;
    const query: SalesQuery = {};

    if (search) query.search = String(search);
    if (page) query.page = parseInt(String(page));
    if (pageSize) query.pageSize = parseInt(String(pageSize));
    if (sortBy) query.sortBy = String(sortBy) as SalesQuery['sortBy'];
    if (sortOrder) query.sortOrder = String(sortOrder) as SalesQuery['sortOrder'];

    const parseMulti = (key: string) => 
        req.query[key] ? String(req.query[key]).split(',').map(s => s.trim()) : undefined;

    query.regions = parseMulti('regions');
    query.genders = parseMulti('genders');
    query.categories = parseMulti('categories');
    query.tags = parseMulti('tags');
    query.paymentMethods = parseMulti('paymentMethods');

    const parseRange = (key: string): [number, number] | undefined => {
        const rangeStr = req.query[key];
        if (rangeStr) {
            const [min, max] = String(rangeStr).split(',').map(s => parseInt(s.trim()));
            if (!isNaN(min) && !isNaN(max)) return [min, max];
        }
        return undefined;
    };

    const parseDateRange = (key: string): [string, string] | undefined => {
        const rangeStr = req.query[key];
        if (rangeStr) {
            const [start, end] = String(rangeStr).split(',').map(s => s.trim());
            if (start && end) return [start, end];
        }
        return undefined;
    };

    query.ageRange = parseRange('ageRange') as [number, number];
    query.dateRange = parseDateRange('dateRange') as [string, string];
    
    return query;
};

/**
 * Handles the GET /api/sales request.
 */
export const getSales = (req: Request, res: Response) => {
    try {
        const allSalesData = req.salesData; 
        const query = formatQuery(req);
        
        const result = getSalesData(allSalesData, query);

        if (result.totalRecords === 0) {
            return res.status(200).json({
                message: "No results found matching your criteria.",
                ...result,
            });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getSales controller:", error);
        res.status(500).json({ 
            message: 'An internal server error occurred while processing the request.',
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};