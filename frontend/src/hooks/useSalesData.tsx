import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
    SalesRecord, 
    SalesApiResponse, 
    SalesQueryState, 
    INITIAL_QUERY_STATE,
    API_BASE_URL 
} from '../types/data';


interface SalesContextType {
    data: SalesRecord[];
    query: SalesQueryState;
    metrics: {
        totalUnitsSold: number;
        totalAmount: number;
        totalDiscount: number;
        rawTotalRecords: number; 
    };
    loading: boolean;
    error: string | null;
    pagination: {
        totalRecords: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
    setQuery: React.Dispatch<React.SetStateAction<SalesQueryState>>;
    handleSearch: (searchTerm: string) => void;
    handlePagination: (page: number) => void;
    handleSort: (sortBy: 'date' | 'quantity' | 'customerName', sortOrder: 'asc' | 'desc') => void;
    handleFilterChange: (key: keyof SalesQueryState, value: any) => void;
    refetch: () => void;
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export const SalesDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [query, setQuery] = useState<SalesQueryState>(INITIAL_QUERY_STATE);
    const [response, setResponse] = useState<SalesApiResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [refetchTrigger, setRefetchTrigger] = useState(0);

    const [metrics, setMetrics] = useState({
        totalUnitsSold: 0,
        totalAmount: 0,
        totalDiscount: 0,
        rawTotalRecords: 0,
    });

    const buildQueryParams = useCallback((currentQuery: SalesQueryState) => {
        const params = new URLSearchParams();

        if (currentQuery.search) params.append('search', currentQuery.search);
        params.append('page', String(currentQuery.page));
        params.append('pageSize', String(currentQuery.pageSize));
        params.append('sortBy', currentQuery.sortBy);
        params.append('sortOrder', currentQuery.sortOrder);

        if (currentQuery.regions.length > 0) params.append('regions', currentQuery.regions.join(','));
        if (currentQuery.genders.length > 0) params.append('genders', currentQuery.genders.join(','));
        if (currentQuery.categories.length > 0) params.append('categories', currentQuery.categories.join(','));
        if (currentQuery.tags.length > 0) params.append('tags', currentQuery.tags.join(','));
        if (currentQuery.paymentMethods.length > 0) params.append('paymentMethods', currentQuery.paymentMethods.join(','));

        if (currentQuery.ageRange) params.append('ageRange', currentQuery.ageRange.join(','));
        if (currentQuery.dateRange) params.append('dateRange', currentQuery.dateRange.join(','));

        return params.toString();
    }, []);

    useEffect(() => {
        const fetchSales = async () => {
            setLoading(true);
            setError(null);
            const params = buildQueryParams(query);

            try {
                const pagedResponse = await axios.get<SalesApiResponse>(`${API_BASE_URL}?${params}`);
                
                const metricParams = buildQueryParams({ ...query, page: 1, pageSize: 99999999 }); 
                const metricsResponse = await axios.get<SalesApiResponse>(`${API_BASE_URL}?${metricParams}`);

                setResponse(pagedResponse.data);
                
                const metricData = metricsResponse.data.data;
                const totals = metricData.reduce((acc, record) => {
                    acc.totalUnitsSold += record.quantity;
                    acc.totalAmount += record.finalAmount;
                    const discountAmount = record.totalAmount - record.finalAmount;
                    acc.totalDiscount += discountAmount;
                    return acc;
                }, { totalUnitsSold: 0, totalAmount: 0, totalDiscount: 0 });
                
                setMetrics({ 
                    ...totals, 
                    rawTotalRecords: metricsResponse.data.totalRecords 
                });

            } catch (err) {
                console.error("API Fetch Error:", err);
                setError("Failed to fetch data from the server. Check backend connection.");
                setResponse(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, [query, buildQueryParams, refetchTrigger]);


    const handleSearch = (searchTerm: string) => {
        setQuery(prev => ({ ...prev, search: searchTerm, page: 1 }));
    };

    const handlePagination = (page: number) => {
        setQuery(prev => ({ ...prev, page }));
    };

    const handleSort = (sortBy: 'date' | 'quantity' | 'customerName', sortOrder: 'asc' | 'desc') => {
        setQuery(prev => ({ ...prev, sortBy, sortOrder, page: 1 }));
    };

    const handleFilterChange = (key: keyof SalesQueryState, value: any) => {
        setQuery(prev => ({ ...prev, [key]: value, page: 1 }));
    };
    
    const refetch = () => {
        setRefetchTrigger(prev => prev + 1);
    };

    const contextValue: SalesContextType = {
        data: response?.data || [],
        query,
        metrics: metrics,
        loading,
        error,
        pagination: {
            totalRecords: response?.totalRecords || 0,
            totalPages: response?.totalPages || 1,
            currentPage: response?.currentPage || 1,
            pageSize: response?.pageSize || INITIAL_QUERY_STATE.pageSize,
        },
        setQuery,
        handleSearch,
        handlePagination,
        handleSort,
        handleFilterChange,
        refetch,
    };

    return (
        <SalesContext.Provider value={contextValue}>
            {children}
        </SalesContext.Provider>
    );
};

export const useSales = () => {
    const context = useContext(SalesContext);
    if (context === undefined) {
        throw new Error('useSales must be used within a SalesDataProvider');
    }
    return context;
};