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

/**
 * Build the MongoDB query filter object based on API parameters
 * Implementing Search and all Filters.
 */
const buildFilterQuery = (query: SalesQuery): FilterQuery<CleanSalesRecord> => {
    const filter: FilterQuery<CleanSalesRecord> = {};

    if (query.search && query.search.trim()) {
        const regex = new RegExp(query.search.trim(), 'i');
        filter.$or = [
            { customerName: { $regex: regex } },
            { phoneNumber: { $regex: regex } }
        ];
    }

    const applyMultiFilter = (mongoField: keyof CleanSalesRecord, allowedValues: string[] | undefined) => {
        if (allowedValues && allowedValues.length > 0) {
            filter[mongoField] = { $in: allowedValues };
        }
    };

    applyMultiFilter('customerRegion', query.regions);
    applyMultiFilter('gender', query.genders);
    applyMultiFilter('productCategory', query.categories);
    applyMultiFilter('paymentMethod', query.paymentMethods);

    if (query.tags && query.tags.length > 0) {
        filter.tags = { $in: query.tags.map(tag => tag.toLowerCase()) };
    }

    if (query.ageRange && query.ageRange.length === 2) {
        const [minAge, maxAge] = query.ageRange;
        if (minAge <= maxAge && minAge >= 0) {
            filter.age = { $gte: minAge, $lte: maxAge };
        }
    }

    if (query.dateRange && query.dateRange.length === 2) {
        const [startDateStr, endDateStr] = query.dateRange;
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
        endDate.setHours(23, 59, 59, 999);

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            filter.date = { $gte: startDate, $lte: endDate };
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
            sort.date = -1; 
            break;
        case 'quantity':
            sort.quantity = sortOrder;
            break;
        case 'customerName':
            sort.customerName = sortOrder;
            break;
        default:
            sort.date = -1;
            break;
    }

    const [data, totalRecords] = await Promise.all([
        SalesRecordModel.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(pageSize)
            .lean() as unknown as Promise<CleanSalesRecord[]>,
        
        SalesRecordModel.countDocuments(filter)
    ]);
    
    const totalPages = totalRecords > 0 ? Math.ceil(totalRecords / pageSize) : 1;

    return {
        data,
        totalRecords,
        totalPages,
        currentPage: page,
        pageSize,
    };
};