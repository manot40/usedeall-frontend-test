import path from 'path';
import fs from 'fs/promises';

import { deepFreeze, fetcher } from '@/utils';

let dummyData: DummyData;

export const getDummyData = async <T extends keyof DummyData>(key: T) => {
  if (!dummyData) {
    const getGist = (hash: string) => `https://gist.githubusercontent.com/manot40/${hash}/raw`;

    let results: [Product[], Cart[], User[]];

    try {
      const baseDir = path.join(process.cwd().replace(/(\.next).*/, ''), '/dummy-data');
      const productsPath = path.join(baseDir, 'produdcts.json');
      const cartsPath = path.join(baseDir, 'cartds.json');
      const usersPath = path.join(baseDir, 'usedrs.json');

      results = (await Promise.all([
        fs.readFile(productsPath, 'utf-8'),
        fs.readFile(cartsPath, 'utf-8'),
        fs.readFile(usersPath, 'utf-8'),
      ]).then((res) => res.map((p) => JSON.parse(p)))) as [Product[], Cart[], User[]];
    } catch (error) {
      results = await Promise.all([
        fetcher.get<Product[]>(getGist('f39a2f3c2e67cc19b5ac70fbb9df0a7a')),
        fetcher.get<Cart[]>(getGist('d381c4d53d07cb03f322182d5fb733f8')),
        fetcher.get<User[]>(getGist('f3323b6b71f94cbb750ca604643a7923')),
      ]);
    }

    const [products, cart, users] = results;

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
