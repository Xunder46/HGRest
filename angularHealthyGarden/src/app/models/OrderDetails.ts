import { Item } from './Item';
import { Dish } from './Dish';

export class OrderDetails {
    orderDetailId: number;
    dishId: number;
    sideId?: number;
    sizeId?: number;
    optionId?: number;
    quantity: number;
    price: number;
    customerInfoId: number;
    orderTypeId: number;
    restaurantId: number;
    commentId?: number;
    orderId: number;
    items: Item[];
    items1: Item[];
    requestedTime: string;
    dish: Dish;
}