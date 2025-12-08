import SalesRecordModel, { CleanSalesRecord } from '../models/SalesRecord';
import { FilterQuery, SortOrder } from 'mongoose';
export interface SalesQuery {
    search?: string;
    page?: number;
    pageSize?: number;
    sortBy?: 'date' | 'quantity' | 'customerName';
    sortOrder?: 'asc' | 'desc';
    
    regions?: string[];
    genders?: string[];
    ageRange?: [number, number]; 
    categories?: string[];
    tags?: string[];
    paymentMethods?: string[];
    dateRange?: [string, string]; 
}

type FilterField = keyof CleanSalesRecord;

/**
 * Build the MongoDB query filter object based on API parameters
 * Implementing Search and all Filters.
 */
const buildFilterQuery = (query: SalesQuery): FilterQuery<CleanSalesRecord> => {
    const filter: FilterQuery<CleanSalesRecord> = {};

    if (query.search && query.search.trim()) {
        const searchTerm = query.search.trim();
        const regex = new RegExp(searchTerm, 'i');
        
        const orConditions: any[] = [
            { 'Customer Name': { $regex: regex } }
        ];
        
        if (!isNaN(Number(searchTerm))) {
            orConditions.push({ 'Phone Number': Number(searchTerm) });
        }
        
        filter.$or = orConditions;
    }

    const applyMultiFilter = (mongoField: FilterField, allowedValues: string[] | undefined) => {
        if (allowedValues && allowedValues.length > 0) {
            (filter as any)[mongoField] = { $in: allowedValues };
        }
    };

    applyMultiFilter('Customer Region' as FilterField, query.regions);
    applyMultiFilter('Gender' as FilterField, query.genders);
    applyMultiFilter('Product Category' as FilterField, query.categories);
    applyMultiFilter('Payment Method' as FilterField, query.paymentMethods);

    if (query.tags && query.tags.length > 0) {
        (filter as any)['Tags'] = { $regex: query.tags.join('|'), $options: 'i' };
    }

    if (query.ageRange && query.ageRange.length === 2) {
        const [minAge, maxAge] = query.ageRange;
        if (minAge <= maxAge && minAge >= 0) {
            (filter as any)['Age'] = { $gte: minAge, $lte: maxAge };
        }
    }

    if (query.dateRange && query.dateRange.length === 2) {
        const [startDateStr, endDateStr] = query.dateRange;
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999);

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            (filter as any)['Date'] = { $gte: startDate, $lte: endDate };
        }
    }

    return filter;
};

/**
 * Main function to retrieve sales data from MongoDB with SFSP and Pagination applied.
 */
export const getSalesData = async (query: SalesQuery) => {
    const filter = buildFilterQuery(query);
    
    const pageSize = query.pageSize || 10;
    const page = query.page && query.page > 0 ? query.page : 1;
    const skip = (page - 1) * pageSize;

    let sort: { [key: string]: SortOrder } = {};
    const sortOrder = query.sortOrder === 'asc' ? 1 : -1;

    switch (query.sortBy) {
        case 'date':
            sort['Date'] = -1; 
            break;
        case 'quantity':
            sort['Quantity'] = sortOrder;
            break;
        case 'customerName':
            sort['Customer Name'] = sortOrder;
            break;
        default:
            sort['Date'] = -1;
            break;
    }

    console.log('Query filter:', JSON.stringify(filter));
    console.log('Sort:', JSON.stringify(sort));

    const [data, totalRecords] = await Promise.all([
        SalesRecordModel.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(pageSize)
            .lean() as unknown as Promise<CleanSalesRecord[]>,
        
        SalesRecordModel.countDocuments(filter)
    ]);
    
    console.log('Total records found:', totalRecords);
    console.log('Data returned:', data.length);
    
    const totalPages = totalRecords > 0 ? Math.ceil(totalRecords / pageSize) : 1;

    return {
        data,
        totalRecords,
        totalPages,
        currentPage: page,
        pageSize,
    };
};