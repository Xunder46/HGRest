import { Dish } from './Dish';

export class Item {
    description: string;
    itemCategory: number;
    price: number;
    dishes: Dish[];
}