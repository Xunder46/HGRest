import { Dish } from './Dish';

export class Item {
    description: string;
    itemCategoryId: number;
    price: number;
    dishes: Dish[];
}