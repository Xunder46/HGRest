import { OrderDetails } from './OrderDetails';
import { AddressInfo } from './Address';

export class CustomerInfo {
    customerInfoId: number;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    orderDetails?: OrderDetails[];
    addressInfoes?: AddressInfo[];
}