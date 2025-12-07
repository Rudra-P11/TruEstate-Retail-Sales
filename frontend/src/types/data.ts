export interface SalesRecord {
    _id: string; 
    transactionId: string;
    date: string; 
    customerName: string;
    phoneNumber: string;
    gender: string;
    age: number;
    customerRegion: string;
    productCategory: string;
    tags: string[];
    quantity: number;
    pricePerUnit: number;
    discountPercentage: number;
    totalAmount: number;
    finalAmount: number;
    paymentMethod: string;
    orderStatus: string;
    employeeName: string;
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
export const DEFAULT_PAGE_SIZE = 10; 
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