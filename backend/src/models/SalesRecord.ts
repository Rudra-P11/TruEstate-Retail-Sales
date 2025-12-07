import mongoose, { Document, Schema } from 'mongoose';
export interface CleanSalesRecord extends Document {
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

const SalesRecordSchema: Schema = new Schema({
    transactionId: { type: String, required: true, unique: true },
    date: { type: Date, required: true, index: true }, 
    customerId: { type: String },
    customerName: { type: String, index: true },
    phoneNumber: { type: String, index: true }, 
    gender: { type: String },
    age: { type: Number, index: true }, 
    customerRegion: { type: String, index: true }, 
    customerType: { type: String },
    productId: { type: String },
    productName: { type: String },
    brand: { type: String },
    productCategory: { type: String, index: true },
    tags: { type: [String], index: true }, 
    quantity: { type: Number, index: true }, 
    pricePerUnit: { type: Number },
    discountPercentage: { type: Number },
    totalAmount: { type: Number },
    finalAmount: { type: Number },
    paymentMethod: { type: String, index: true }, 
    orderStatus: { type: String },
    deliveryType: { type: String },
    storeId: { type: String },
    storeLocation: { type: String },
    salespersonId: { type: String },
    employeeName: { type: String },
}, {
    collection: 'sales', 
    timestamps: false 
});

export default mongoose.model<CleanSalesRecord>('SalesRecord', SalesRecordSchema);