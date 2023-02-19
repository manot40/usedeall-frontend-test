import useSWR from 'swr';
import { memo } from 'react';
import { fetcher } from '@/utils';
import { useViewport } from '@/hooks';

import Filter from './Filter';
import Search from './Search';

import { Flex, SimpleGrid } from '@mantine/core';

type SearchbarProps = {
  query?: Record<string, string>;
  onChange: (q: Record<string, string | number>) => void;
};

const Searchbar: React.FC<SearchbarProps> = ({ query, onChange }) => {
  const { xs } = useViewport();
  const { data: brandsRes } = useSWR<Res<string[]>>('/api/product/brands', fetcher.get);
  const { data: categoriesRes } = useSWR<Res<string[]>>('/api/product/categories', fetcher.get);

  return (
    <div style={{ alignSelf: xs ? 'normal' : 'flex-start' }}>
      <Flex direction={xs ? 'column' : 'row'} gap="xs">
        <Search autoComplete="off" value={query?.q} onChange={onChange} />
        <SimpleGrid cols={2} spacing="xs">
          <Filter
            context="category"
            data={categoriesRes?.result || []}
            value={query?.category_in.split(',')}
            onChange={(v) => onChange({ category_in: v.join(','), _page: 1 })}
          />
          <Filter
            context="brand"
            data={brandsRes?.result || []}
            value={query?.brand_in.split(',')}
            onChange={(v) => onChange({ brand_in: v.join(','), _page: 1 })}
          />
        </SimpleGrid>
      </Flex>
    </div>
  );
};

export default memo(Searchbar);
