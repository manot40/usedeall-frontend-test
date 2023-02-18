import type { NextApiRequest, NextApiResponse } from 'next';

import { getDummyData } from '@/utils/dummy-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Res<Cart>>) {
  try {
    const cart = await getDummyData('cart');
    const [filteredCart] = cart.filter((c) => c.id.toString() === (req.query.id as string));

    if (!filteredCart)
      return res.status(404).json({
        success: false,
        message: 'Resource not found',
      });

    const [user] = (await getDummyData('users')).filter((u) => u.id === filteredCart.userId);

    return res.status(200).json({
      success: true,
      result: {
        ...filteredCart,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          maidenName: user.maidenName,
          image: user.image,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: 'Error when fetching resource(s)',
    });
  }
}
