import type { NextApiRequest, NextApiResponse } from 'next';

import { objectQuery } from '@/utils';
import { getDummyData } from '@/utils/dummy-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res<Cart[]>>) {
  try {
    const cart = await getDummyData('cart');
    const filteredCart = objectQuery(req.query, cart);
    return res.status(200).json({
      success: true,
      ...filteredCart,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Error when fetching resource(s)',
    });
  }
}
