/// <reference types="node" />
import mongoose from 'mongoose';
import fs from 'fs';
import csv from 'csv-parser';
import * as dotenv from 'dotenv';
import SalesRecordModel from '../models/SalesRecord';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

interface RawRecord {
  [key: string]: string | number;
}

async function loadData() {
    if (!MONGO_URI) {
        console.error("FATAL ERROR: MONGO_URI is not defined in the .env file.");
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Atlas connected successfully.");

        const count = await SalesRecordModel.countDocuments();
        if (count > 0) {
            console.log(`Database already contains ${count} records. Skipping import.`);
            await mongoose.disconnect();
            return;
        }

        const records: any[] = [];
        const csvPath = './truestate_assignment_dataset.csv';

        if (!fs.existsSync(csvPath)) {
            console.error(`CSV file not found at ${csvPath}`);
            await mongoose.disconnect();
            process.exit(1);
        }

        console.log('Reading CSV file...');

        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row: RawRecord) => {
                const record = {
                    'Transaction ID': parseInt(String(row['Transaction ID'])) || 0,
                    'Date': new Date(String(row['Date'])),
                    'Customer ID': String(row['Customer ID']),
                    'Customer Name': String(row['Customer Name']),
                    'Phone Number': parseInt(String(row['Phone Number'])) || 0,
                    'Gender': String(row['Gender']),
                    'Age': parseInt(String(row['Age'])) || 0,
                    'Customer Region': String(row['Customer Region']),
                    'Customer Type': String(row['Customer Type']),
                    'Product ID': String(row['Product ID']),
                    'Product Name': String(row['Product Name']),
                    'Brand': String(row['Brand']),
                    'Product Category': String(row['Product Category']),
                    'Tags': String(row['Tags']),
                    'Quantity': parseInt(String(row['Quantity'])) || 0,
                    'Price per Unit': parseFloat(String(row['Price per Unit'])) || 0,
                    'Discount Percentage': parseFloat(String(row['Discount Percentage'])) || 0,
                    'Total Amount': parseFloat(String(row['Total Amount'])) || 0,
                    'Final Amount': parseFloat(String(row['Final Amount'])) || 0,
                    'Payment Method': String(row['Payment Method']),
                    'Order Status': String(row['Order Status']),
                    'Delivery Type': String(row['Delivery Type']),
                    'Store ID': String(row['Store ID']),
                    'Store Location': String(row['Store Location']),
                    'Salesperson ID': String(row['Salesperson ID']),
                    'Employee Name': String(row['Employee Name']),
                };
                records.push(record);

                if (records.length % 1000 === 0) {
                    console.log(`Loaded ${records.length} records...`);
                }
            })
            .on('end', async () => {
                console.log(`Total records to insert: ${records.length}`);
                try {
                    await SalesRecordModel.insertMany(records, { ordered: false });
                    console.log(`Successfully inserted ${records.length} records into the database.`);
                } catch (error) {
                    console.error('Error inserting records:', error instanceof Error ? error.message : error);
                }
                await mongoose.disconnect();
                console.log('Database connection closed.');
            })
            .on('error', (error: Error) => {
                console.error('Error reading CSV:', error);
                mongoose.disconnect();
                process.exit(1);
            });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

loadData();
