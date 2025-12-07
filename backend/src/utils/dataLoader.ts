import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { SalesRecord, CleanSalesRecord } from '../models/SalesRecord';

const DATA_FILE_PATH = path.join(__dirname, '..', '..', 'truestate_assignment_dataset.csv');

/**
 * Converts a raw SalesRecord string-based object into a CleanSalesRecord with correct types.
 * @param record - The raw record from the CSV parser.
 * @returns The cleaned and typed record.
 */
const cleanRecord = (record: SalesRecord): CleanSalesRecord => {
    const safeParseFloat = (value: string): number => {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? 0 : parsed;
    };

    const safeParseInt = (value: string): number => {
        const parsed = parseInt(value, 10);
        return isNaN(parsed) ? 0 : parsed;
    };

    const [day, month, year] = record.Date.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    
    const tagsArray = record.Tags
        ? record.Tags.split(',').map(tag => tag.trim().toLowerCase())
        : [];

    return {
        transactionId: record['Transaction ID'],
        date: date,
        customerId: record['Customer ID'],
        customerName: record['Customer Name'],
        phoneNumber: record['Phone Number'],
        gender: record.Gender,
        age: safeParseInt(record.Age),
        customerRegion: record['Customer Region'],
        customerType: record['Customer Type'],
        productId: record['Product ID'],
        productName: record['Product Name'],
        brand: record.Brand,
        productCategory: record['Product Category'],
        tags: tagsArray,
        quantity: safeParseInt(record.Quantity),
        pricePerUnit: safeParseFloat(record['Price per Unit']),
        discountPercentage: safeParseFloat(record['Discount Percentage']),
        totalAmount: safeParseFloat(record['Total Amount']),
        finalAmount: safeParseFloat(record['Final Amount']),
        paymentMethod: record['Payment Method'],
        orderStatus: record['Order Status'],
        deliveryType: record['Delivery Type'],
        storeId: record['Store ID'],
        storeLocation: record['Store Location'],
        salespersonId: record['Salesperson ID'],
        employeeName: record['Employee Name'],
    };
};

/**
 * Loads and parses the CSV data asynchronously using streaming.
 * @returns A promise that resolves to an array of CleanSalesRecord objects.
 */
export const loadSalesData = (): Promise<CleanSalesRecord[]> => {
    return new Promise((resolve, reject) => {
        const results: CleanSalesRecord[] = [];

        if (!fs.existsSync(DATA_FILE_PATH)) {
            console.error(`Error: Data file not found at ${DATA_FILE_PATH}`);
            return reject(new Error('Data file not found.'));
        }

        const stream = fs.createReadStream(DATA_FILE_PATH)
            .pipe(csv())
            .on('data', (data) => {
                try {
                    const cleanedRecord = cleanRecord(data as SalesRecord);
                    results.push(cleanedRecord);
                } catch (error) {
                    console.error('Error during data cleaning for a record:', error);
                }
            })
            .on('end', () => {
                console.log(`Successfully loaded and processed ${results.length} records via streaming.`);
                resolve(results);
            })
            .on('error', (error) => {
                console.error('Error reading CSV file stream:', error);
                reject(error);
            });
    });
};