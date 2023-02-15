import path from 'path';
import fs from 'fs/promises';

import { deepFreeze } from '@/utils';

let dummyData: DummyData;

(async () => {
  const baseDir = path.join(process.cwd().replace(/(\.next).*/, ''), '/static');

  const productsPath = path.join(baseDir, 'products.json');
  const cartsPath = path.join(baseDir, 'carts.json');
  const usersPath = path.join(baseDir, 'users.json');

  const [products, carts, users] = (await Promise.all([
    fs.readFile(productsPath, 'utf-8'),
    fs.readFile(cartsPath, 'utf-8'),
    fs.readFile(usersPath, 'utf-8'),
  ]).then((res) => res.map((p) => JSON.parse(p)))) as [Product[], Cart[], User[]];

  dummyData = deepFreeze({ products, carts, users });
})();

export const getDummyData = <T extends keyof DummyData>(key: T) =>
  new Promise<DummyData[T]>((resolve, reject) => {
    let retry = 0;
    const timer = setInterval(() => {
      if (retry == 10) reject(new Error('Dummy cannot be loaded!'));
      else if (dummyData) {
        clearInterval(timer);
        resolve(dummyData[key]);
      }
      retry++;
    }, 1000);
  });

type DummyData = {
  products: Readonly<Product[]>;
  carts: Readonly<Cart[]>;
  users: Readonly<User[]>;
};
