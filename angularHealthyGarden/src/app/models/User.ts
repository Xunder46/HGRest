import { AddressInfo } from './Address';
import { CustomerInfo } from './CustomerInfo';

export class User{
    userId: string;
    username: string;
    email: string;
    phoneNumber: string;
    customerInfoId: number;
    joinDate: Date;
    customerInfo: CustomerInfo;
    addressInfo: AddressInfo;
}