import { DBSchema } from '@ngrx/db';

/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
  version: 1,
  name: 'onweb',
  stores: {
    categories: {
      autoIncrement: true,
      primaryKey: 'id',
    },
    products: {
      autoIncrement: true,
      primaryKey: 'id',
    },
  },
};