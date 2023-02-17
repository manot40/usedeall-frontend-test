import useSWR from 'swr';
import { fetcher, qsFormat } from '@/utils';
import { useUrlQuery } from '@/hooks';

import { Box, Title, Stack } from '@mantine/core';
import ProductTable from '@/components/ProductTable';

export default function Home() {
  const { query, setQuery } = useUrlQuery(QS, OPTIONAL_QS);
  const { data, error } = useSWR<Res<Product[]>>(`/api/product?${qsFormat(query)}`, fetcher.get);

  return (
    <Box>
      <Stack spacing="md">
        <Title size="2rem">All Products</Title>
        <ProductTable
          totalCount={data?.pagination?.totalCount || 0}
          onSortChange={(sort) => setQuery(sort, true)}
          onPageChange={(_page) => setQuery({ _page }, true)}
          data={data?.result}
          query={query as BaseQuery<Product>}
        />
      </Stack>
    </Box>
  );
}

const QS: BaseQuery<Product> & Record<string, string | number> = {
  _page: 1,
  _sort: 'title',
  _order: 'asc',
  _limit: 10,
  brand_in: '',
  category_in: '',
};

const OPTIONAL_QS = [] satisfies (keyof typeof QS)[];
