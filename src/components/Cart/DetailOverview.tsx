import { memo } from 'react';

import { Card, SimpleGrid, Stack, Text } from '@mantine/core';

type CartDetailOverviewProps = {
  data: Cart;
};

const CartDetailOverview: React.FC<CartDetailOverviewProps> = ({ data }) => {
  return (
    <Stack spacing={8}>
      <Text weight={600} ml={2} size={14}>
        Cart Overview
      </Text>
      <Card withBorder>
        <SimpleGrid cols={2} sx={{ fontSize: 14 }}>
          {generateOverview(data).map((item) => (
            <OverviewItem key={item.ctx} {...item} />
          ))}
        </SimpleGrid>
      </Card>
    </Stack>
  );
};

function generateOverview(data: Cart) {
  return [
    {
      ctx: 'User',
      value: `${data.user!.firstName} ${data.user!.lastName || ''}`,
    },
    {
      ctx: '# of items',
      value: data.totalQuantity,
    },
    {
      ctx: 'Added on',
      value: Intl.DateTimeFormat('us', { dateStyle: 'full' }).format(new Date(data.addedOn)),
    },
    {
      ctx: 'Total Amount',
      value: data.total,
    },
  ];
}

function OverviewItem({ ctx, value }: ReturnType<typeof generateOverview>[number]) {
  return (
    <Text weight={600}>
      {ctx}: &nbsp;
      <Text weight={400} component="span">
        {value}
      </Text>
    </Text>
  );
}

export default memo(CartDetailOverview);
