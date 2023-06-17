import { Types } from "mongoose";

export type IUserRole = "seller" | "buyer"

export interface IUser {
    _id?: Types.ObjectId | undefined | string;
    name: { [key: string]: string };
    phoneNumber: string;
    address: string;
    password: string;
    role: IUserRole;
    budget: number;
    income: number;
}

// cow model

export type ILocation = 'Dhaka' | 'Chattogram' | 'Barishal' | 'Rajshahi' | 'Sylhet' | 'Comilla' | 'Rangpur' | 'Mymensingh';

export type ILabel = "for sale" | "sold out";

export type ICowCategory = "Dairy" | "Beef" | "DualPurpose";

export interface ICow {
    name: string;
    age: number;
    price: number;
    location: ILocation;
    breed: string;
    weight: number;
    label: string;
    category: ICowCategory;
    seller: string | Types.ObjectId | undefined;
}