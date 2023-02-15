// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getDummyData, queryParser } from '@/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await getDummyData('products');
  return res.status(200).json(queryParser(req, data));
}
