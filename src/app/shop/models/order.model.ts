import { BasketItem } from './BasketItem.model';

export interface Order {
   id?: string;
   orderDate: number;
   deliveryDate: number;
   deliveryTime: string;
   deliveryAddress?: string;
   status: OrderStatus;
   items: Array<BasketItem>;
   userId: string;
   paid?: boolean;
   amount: number;
}

export enum OrderStatus {
    OPEN = 'OPEN',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
    CLOSED = 'CLOSED',
    ARCHIVED = 'ARCHIVED'
}


export interface DurationWithStatus {
    start: number;
    end: number;
    status?: string;
  }