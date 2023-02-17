import path from 'path';
import fs from 'fs/promises';

import { deepFreeze } from '@/utils';

let dummyData: DummyData;

export const getDummyData = async <T extends keyof DummyData>(key: T) => {
  if (!dummyData) {
    const baseDir = path.join(process.cwd().replace(/(\.next).*/, ''), '/dummy-data');

    const productsPath = path.join(baseDir, 'products.json');
    const cartsPath = path.join(baseDir, 'carts.json');
    const usersPath = path.join(baseDir, 'users.json');

    const [products, cart, users] = (await Promise.all([
      fs.readFile(productsPath, 'utf-8'),
      fs.readFile(cartsPath, 'utf-8'),
      fs.readFile(usersPath, 'utf-8'),
    ]).then((res) => res.map((p) => JSON.parse(p)))) as [Product[], Cart[], User[]];

    const categories = products.reduce((acc, p) => {
      if (!acc.includes(p.category)) acc.push(p.category);
      return acc;
    }, [] as string[]);

    const brands = products.reduce((acc, p) => {
      if (!acc.includes(p.brand)) acc.push(p.brand);
      return acc;
    }, [] as string[]);

    dummyData = deepFreeze({ products, cart, users, categories, brands });
  }

  return dummyData[key];
};

type DummyData = {
  products: Readonly<Product[]>;
  cart: Readonly<Cart[]>;
  users: Readonly<User[]>;
  brands: Readonly<string[]>;
  categories: Readonly<string[]>;
};
