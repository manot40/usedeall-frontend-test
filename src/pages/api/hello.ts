// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getDummyData, objectQuery } from '@/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const products = await getDummyData('products');
  const filteredProduct = objectQuery(req.query, products);
  return res.status(200).json(filteredProduct);
}
