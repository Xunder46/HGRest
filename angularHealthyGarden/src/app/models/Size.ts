import { OrderDetails } from './OrderDetails';

export class Size {
    sizeId: number;
    description?: any;
    categoryId: number;
    additionalPrice: number;
    orderDetails: OrderDetails[];
}