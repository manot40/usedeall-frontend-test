import type { NextApiRequest, NextApiResponse } from 'next';

import { getDummyData } from '@/utils/dummy-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res<Product>>) {
  try {
    const products = await getDummyData('products');
    const [result] = products.filter((product) => product.id.toString() === (req.query.id as string));

    if (!result)
      return res.status(404).json({
        success: false,
        message: 'Resource not found',
      });

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Error when fetching resource(s)',
    });
  }
}
