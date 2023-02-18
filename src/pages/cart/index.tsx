import useSWR from 'swr';

import { useUrlQuery } from '@/hooks';
import { fetcher, qsFormat } from '@/utils';

import { Box, Card } from '@mantine/core';
import { CartTable } from '@/components/Cart';
import { Result } from '@/components/reusable';

export default function Cart() {
  const { query, setQuery } = useUrlQuery(QS, undefined);
  const { data, error } = useSWR<Res<Cart[]>>(`/api/cart?${qsFormat(query)}`, fetcher.get);
  return (
    <Box>
      {error ? (
        <Card withBorder py={120}>
          <Result />
        </Card>
      ) : (
        <CartTable
          data={data?.result}
          query={query as BaseQuery<Cart>}
          totalCount={data?.pagination?.totalCount || 1}
          onSortChange={(sort) => setQuery(sort, { persistAll: true })}
          onPageChange={(_page) => setQuery({ _page }, { persistAll: true })}
        />
      )}
    </Box>
  );
}

const QS: BaseQuery<Cart> = {
  _page: 1,
  _sort: 'id',
  _order: 'desc',
  _limit: 10,
};
