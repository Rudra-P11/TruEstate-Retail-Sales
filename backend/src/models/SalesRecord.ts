/**
 * Defines the structure for a single sales transaction record.
 * The keys match the column headers in the CSV file.
 */
export interface SalesRecord {
    'Transaction ID': string;
    'Date': string;
    'Customer ID': string;
    'Customer Name': string;
    'Phone Number': string;
    'Gender': 'Male' | 'Female' | 'Other' | string;
    'Age': string; // Stored as string from CSV, will be parsed later
    'Customer Region': string;
    'Customer Type': string;
    'Product ID': string;
    'Product Name': string;
    'Brand': string;
    'Product Category': string;
    'Tags': string; // Comma-separated tags
    'Quantity': string; // Stored as string from CSV
    'Price per Unit': string; // Stored as string from CSV
    'Discount Percentage': string; // Stored as string from CSV
    'Total Amount': string; // Stored as string from CSV
    'Final Amount': string; // Stored as string from CSV
    'Payment Method': string;
    'Order Status': string;
    'Delivery Type': string;
    'Store ID': string;
    'Store Location': string;
    'Salesperson ID': string;
    'Employee Name': string;
}

/**
 * Defines the structure for a sales record after data cleaning and type conversion.
 * This is the structure we will use internally for logic (filtering, sorting).
 */
export interface CleanSalesRecord {
    transactionId: string;
    date: Date; 
    customerId: string;
    customerName: string;
    phoneNumber: string;
    gender: string;
    age: number; 
    customerRegion: string;
    customerType: string;
    productId: string;
    productName: string;
    brand: string;
    productCategory: string;
    tags: string[];
    quantity: number; 
    pricePerUnit: number; 
    discountPercentage: number; 
    totalAmount: number; 
    finalAmount: number; 
    paymentMethod: string;
    orderStatus: string;
    deliveryType: string;
    storeId: string;
    storeLocation: string;
    salespersonId: string;
    employeeName: string;
}