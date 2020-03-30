import { OrderDetails } from './OrderDetails';

export class CustomerInfo {
    customerInfoId: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    addressInfoId?: number;
    orderDetails: OrderDetails[];
}