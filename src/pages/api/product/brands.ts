import type { NextApiRequest, NextApiResponse } from 'next';

import { objectQuery } from '@/utils';
import { getDummyData } from '@/utils/dummy-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res<string[]>>) {
  try {
    const brands = await getDummyData('brands');
    const filteredBrands = objectQuery(req.query, brands);
    return res.status(200).json({
      success: true,
      ...filteredBrands,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Error when fetching resource(s)',
    });
  }
}
