import { Product } from './product.model';

export interface BasketItem {
   id: number;
   quantity: number;
   product: Product;
}
