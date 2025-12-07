export interface FilterOption {
    label: string;
    value: string;
}

export const staticFilterOptions = {
    regions: [
        { label: 'East', value: 'East' },
        { label: 'West', value: 'West' },
        { label: 'North', value: 'North' },
        { label: 'South', value: 'South' },
        { label: 'Central', value: 'Central' },
    ] as FilterOption[],
    
    genders: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' },
    ] as FilterOption[],

    categories: [
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Beauty', value: 'Beauty' },
        { label: 'Clothing', value: 'Clothing' },
        { label: 'Home Goods', value: 'Home Goods' },
    ] as FilterOption[],
    
    paymentMethods: [
        { label: 'UPI', value: 'UPI' },
        { label: 'Credit Card', value: 'Credit Card' },
        { label: 'Cash', value: 'Cash' },
        { label: 'Net Banking', value: 'Net Banking' },
    ] as FilterOption[],

    tags: [
        { label: 'Organic', value: 'organic' },
        { label: 'Skincare', value: 'skincare' },
        { label: 'Portable', value: 'portable' },
        { label: 'Wireless', value: 'wireless' },
        { label: 'Gadgets', value: 'gadgets' },
    ] as FilterOption[],
};