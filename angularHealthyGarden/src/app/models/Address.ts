import { CustomerInfo } from './CustomerInfo';

export class AddressInfo {
    addressInfoId: number;
    street?: any;
    apartment?: any;
    zipId: number;
    customerInfo: CustomerInfo[];
}
