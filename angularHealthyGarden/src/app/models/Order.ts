import { OrderDetails } from './OrderDetails';

export class Order {
    orderId: number;
    orderDate: string;
    orderDetails: OrderDetails[];
}