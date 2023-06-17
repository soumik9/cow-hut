export type IUserRole = "seller" | "buyer"

export interface IUser {
    name: { [key: string]: string };
    phoneNumber: string;
    address: string;
    password: string;
    role: IUserRole;
    budget: number;
    income: number;
}