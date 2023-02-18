import { memo } from 'react';
import { useViewport } from '@/hooks';

import { Stack, Text } from '@mantine/core';
import { AutoTable, type TableColumns } from '../reusable';

type CartDetailTableProps = {
  data?: Cart['products'];
};

const CartDetailTable: React.FC<CartDetailTableProps> = ({ data }) => {
  const { xs } = useViewport();

  return (
    <Stack spacing={8}>
      <Text weight={600} ml={4} size={14}>
        Product List
      </Text>
      <AutoTable
        data={data}
        columns={cols}
        useScroll={xs}
        verticalSpacing="sm"
        wrapperProps={{ style: { userSelect: 'none' } }}
      />
    </Stack>
  );
};

const cols: TableColumns<Cart['products'][number]> = [
  {
    dataKey: 'title',
    title: 'Product Name',
    render: (name) => <Text weight={500}>{name}</Text>,
  },
  {
    dataKey: 'quantity',
    title: 'Purchase Qty',
  },
  {
    dataKey: 'price',
    title: 'Price',
  },
  {
    dataKey: 'total',
    title: 'Total Price',
  },
  {
    dataKey: 'discountedPrice',
    title: 'Discount Price',
  },
];

export default memo(CartDetailTable);
