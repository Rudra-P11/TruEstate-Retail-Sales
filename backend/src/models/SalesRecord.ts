import mongoose, { Document, Schema } from 'mongoose';
export interface CleanSalesRecord extends Document {
    'Transaction ID': number;
    Date: Date;
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

const SalesRecordSchema: Schema = new Schema({
    'Transaction ID': { type: Number, index: true },
    'Date': { type: Date, index: true }, 
    'Customer ID': { type: String, index: true },
    'Customer Name': { type: String, index: true },
    'Phone Number': { type: Number, index: true }, 
    'Gender': { type: String, index: true },
    'Age': { type: Number, index: true }, 
    'Customer Region': { type: String, index: true }, 
    'Customer Type': { type: String },
    'Product ID': { type: String },
    'Product Name': { type: String },
    'Brand': { type: String },
    'Product Category': { type: String, index: true },
    'Tags': { type: String }, 
    'Quantity': { type: Number, index: true }, 
    'Price per Unit': { type: Number },
    'Discount Percentage': { type: Number },
    'Total Amount': { type: Number },
    'Final Amount': { type: Number },
    'Payment Method': { type: String, index: true }, 
    'Order Status': { type: String },
    'Delivery Type': { type: String },
    'Store ID': { type: String },
    'Store Location': { type: String },
    'Salesperson ID': { type: String },
    'Employee Name': { type: String },
}, {
    collection: 'Sales', 
    timestamps: false 
});

export default mongoose.model<CleanSalesRecord>('SalesRecord', SalesRecordSchema);