import useSWR from 'swr';
import { useEffect } from 'react';

import { useUrlQuery } from '@/hooks';
import { fetcher, qsFormat } from '@/utils';

import { Result } from '@/components/reusable';
import { Stack, Card } from '@mantine/core';
import { ProductTable, Searchbar } from '@/components/Product';

export default function Products() {
  const { query, setQuery } = useUrlQuery(QS, OPTIONAL_QS, (q) => localStorage.setItem('query', JSON.stringify(q)));
  const { data, error } = useSWR<Res<Product[]>>(`/api/product?${qsFormat(query)}`, fetcher.get);

  useEffect(() => {
    const storage = localStorage.getItem('query');
    if (storage) setQuery(JSON.parse(storage));
    // eslint-disable-next-line
  }, []);

  return (
    <Stack spacing="md">
      <Searchbar query={query as Record<string, string>} onChange={setQuery} />
      {error ? (
        <Card withBorder py={120}>
          <Result />
        </Card>
      ) : (
        <ProductTable
          data={data?.result}
          query={query as BaseQuery<Product>}
          totalCount={data?.pagination?.totalCount || 1}
          onSortChange={(sort) => setQuery(sort, { persistAll: true })}
          onPageChange={(_page) => setQuery({ _page }, { persistAll: true })}
        />
      )}
    </Stack>
  );
}

const QS: QueryType = {
  q: '',
  _page: 1,
  _sort: 'title',
  _order: 'asc',
  _limit: 10,
  brand_in: '',
  category_in: '',
};

const OPTIONAL_QS = [] satisfies QueryType[];

export type QueryType = BaseQuery<Product> & Record<string, string | number>;
