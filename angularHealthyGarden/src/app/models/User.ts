import { AddressInfo } from './Address';
import { CustomerInfo } from './CustomerInfo';

export class User{
    userId: string;
    userName: string;
    email: string;
    phoneNumber: string;
    customerInfoId: number;
    joinDate: Date;
}