import type { NextApiRequest, NextApiResponse } from 'next';

import { pickTop } from '@/utils';
import { getDummyData } from '@/utils/dummy-data';

type ResData = { label: string; value: number }[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res<ProductChartData>>) {
  try {
    const products = await getDummyData('products');

    const byCategory = pickTop(
      products.reduce((acc, product) => {
        const category = acc.find((c) => c.label === product.category);
        if (category) category.value += 1;
        else acc.push({ label: product.category, value: 1 });
        return acc;
      }, [] as ResData),
      5
    );

    const byBrand = pickTop(
      products.reduce((acc, product) => {
        const brand = acc.find((b) => b.label === product.brand);
        if (brand) brand.value += 1;
        else acc.push({ label: product.brand, value: 1 });
        return acc;
      }, [] as ResData),
      5
    );

    res.status(200).json({
      success: true,
      message: 'Resource(s) fetched successfully',
      result: { byCategory, byBrand },
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Error when fetching resource(s)',
    });
  }
}
