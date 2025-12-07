export interface SalesRecord {
    _id: string; 
    'Transaction ID': number;
    Date: string;
    'Customer ID': string;
    'Customer Name': string;
    'Phone Number': number;
    Gender: string;
    Age: number;
    'Customer Region': string;
    'Customer Type': string; 
    'Product ID': string;
    'Product Name': string;
    Brand: string;
    'Product Category': string;
    Tags: string; 
    Quantity: number;
    'Price per Unit': number;
    'Discount Percentage': number;
    'Total Amount': number; 
    'Final Amount': number;
    'Payment Method': string;
    'Order Status': string;
    'Delivery Type': string;
    'Store ID': string;
    'Store Location': string;
    'Salesperson ID': string;
    'Employee Name': string;
}

export interface SalesApiResponse {
    data: SalesRecord[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    message?: string;
}

export type SortBy = 'date' | 'quantity' | 'customerName';
export type SortOrder = 'asc' | 'desc';

export interface SalesQueryState {
    search: string;
    page: number;
    pageSize: number;
    sortBy: SortBy;
    sortOrder: SortOrder;
    
    regions: string[];
    genders: string[];
    ageRange: [number, number] | undefined;
    categories: string[];
    tags: string[];
    paymentMethods: string[];
    dateRange: [string, string] | undefined; 
}

export const API_BASE_URL = 'http://localhost:5000/api/sales';
export const DEFAULT_PAGE_SIZE = 25; 
export const INITIAL_QUERY_STATE: SalesQueryState = {
    search: '',
    page: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    sortBy: 'date',
    sortOrder: 'desc', 
    regions: [],
    genders: [],
    ageRange: undefined,
    categories: [],
    tags: [],
    paymentMethods: [],
    dateRange: undefined,
};