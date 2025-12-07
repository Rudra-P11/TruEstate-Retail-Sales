import { loadSalesData } from '../utils/dataLoader';
import { CleanSalesRecord } from '../models/SalesRecord';

let allSalesData: CleanSalesRecord[] = [];

/**
 * Loads the sales data from the CSV file and stores it in memory.
 */
export const initializeData = async () => {
    try {
        allSalesData = await loadSalesData();
        console.log(`Data loaded successfully. Total records: ${allSalesData.length}`);
    } catch (error) {
        console.error("Failed to load sales data:", error);
        process.exit(1); 
    }
};

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
 * Applies search, filtering, and sorting to the entire dataset.
 * @param data - The dataset to process.
 * @param query - The search/filter/sort parameters.
 * @returns The processed and sorted data.
 */
const applySFSP = (data: CleanSalesRecord[], query: SalesQuery): CleanSalesRecord[] => {
    let filteredData = [...data];

    if (query.search && query.search.trim()) {
        const searchTerm = query.search.trim().toLowerCase();
        filteredData = filteredData.filter(record => 
            record.customerName.toLowerCase().includes(searchTerm) ||
            record.phoneNumber.includes(searchTerm)
        );
    }

    const applyMultiFilter = (field: keyof CleanSalesRecord, allowedValues: string[] | undefined) => {
        if (allowedValues && allowedValues.length > 0) {
            const allowedSet = new Set(allowedValues.map(v => v.toLowerCase()));
            filteredData = filteredData.filter(record => 
                allowedSet.has(String(record[field]).toLowerCase())
            );
        }
    };

    applyMultiFilter('customerRegion', query.regions);
    applyMultiFilter('gender', query.genders);
    applyMultiFilter('productCategory', query.categories);
    applyMultiFilter('paymentMethod', query.paymentMethods);

    if (query.tags && query.tags.length > 0) {
        const tagSet = new Set(query.tags.map(tag => tag.toLowerCase()));
        filteredData = filteredData.filter(record =>
            record.tags.some(tag => tagSet.has(tag))
        );
    }

    if (query.ageRange && query.ageRange.length === 2) {
        const [minAge, maxAge] = query.ageRange;
        if (minAge <= maxAge && minAge >= 0) {
            filteredData = filteredData.filter(record => 
                record.age >= minAge && record.age <= maxAge
            );
        }
    }

    if (query.dateRange && query.dateRange.length === 2) {
        const [startDateStr, endDateStr] = query.dateRange;
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
            filteredData = filteredData.filter(record => {
                const recordDate = new Date(record.date.toDateString());
                
                return recordDate >= startDate && recordDate <= endDate;
            });
        }
    }

    if (query.sortBy) {
        const { sortBy, sortOrder = 'asc' } = query;
        filteredData.sort((a, b) => {
            let comparison = 0;
            const isDesc = sortOrder === 'desc';

            switch (sortBy) {
                case 'date':
                    comparison = a.date.getTime() - b.date.getTime();
                    return isDesc ? comparison * -1 : comparison;
                case 'quantity':
                    comparison = a.quantity - b.quantity;
                    break;
                case 'customerName':
                    comparison = a.customerName.localeCompare(b.customerName);
                    break;
                default:
                    return 0; 
            }
            return isDesc ? comparison * -1 : comparison;
        });
    }

    return filteredData;
};


/**
 * Main function to retrieve sales data with SFSP and Pagination applied.
 * @param query - The request parameters from the frontend.
 * @returns An object containing the paginated data, total records, and total pages.
 */
export const getSalesData = (query: SalesQuery) => {
    const processedData = applySFSP(allSalesData, query);
    
    const totalRecords = processedData.length;
    
    const pageSize = query.pageSize || 10; 
    const page = query.page && query.page > 0 ? query.page : 1;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const paginatedData = processedData.slice(startIndex, endIndex);
    
    const totalPages = totalRecords > 0 ? Math.ceil(totalRecords / pageSize) : 1;

    return {
        data: paginatedData,
        totalRecords,
        totalPages,
        currentPage: page,
        pageSize,
    };
};