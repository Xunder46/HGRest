import { Dish } from './Dish';

export class Item {
    itemId: number;
    description: string;
    itemCategoryId: number;
    price: number;
    dishes: Dish[];
}