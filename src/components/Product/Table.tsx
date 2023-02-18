import type { ColumnSort } from '@/components/reusable/AutoTable/table';

import { memo } from 'react';
import { useViewport } from '@/hooks';

import { prettyString } from '../../utils';
import { Avatar, Badge, Flex, Group, Text, Tooltip } from '@mantine/core';
import { AutoTable, type TableColumns } from '../reusable';

type ProductSort = Pick<BaseQuery<Product>, '_order' | '_sort'>;

type ProductTableProps = {
  data?: Product[];
  query: BaseQuery<Product>;
  totalCount: number;
  onSortChange: (order: ProductSort) => void;
  onPageChange: (page: number) => void;
};

const ProductTable: React.FC<ProductTableProps> = ({ data, query, totalCount, onPageChange, onSortChange }) => {
  const { xs } = useViewport();

  const handleSort = ({ key, order }: ColumnSort<Product>) => onSortChange({ _sort: key, _order: order });

  return (
    <AutoTable
      data={data}
      useScroll={xs}
      verticalSpacing="sm"
      wrapperProps={{ mih: 630 }}
      columns={cols.map((col) => ({ ...col, onSort: handleSort }))}
      pagination={{
        size: xs ? 'sm' : 'md',
        page: query._page,
        total: Math.ceil(totalCount / query._limit),
        onChange: onPageChange,
      }}
    />
  );
};

const cols: TableColumns<Product> = [
  {
    dataKey: 'title',
    title: 'Product Name',
    style: { width: '50%' },
    render: (type, { id, description, thumbnail }) => (
      <Flex gap={12} align="center">
        <Avatar src={thumbnail} />
        <Tooltip openDelay={300} width={220} position="right" label={description} arrowSize={8} multiline withArrow>
          <Text maw="fit-content" weight={500}>
            {prettyString(type)}
          </Text>
        </Tooltip>
      </Flex>
    ),
  },
  {
    dataKey: 'category',
    title: 'Category',
    render: (type) => (
      <Badge size="sm" color="gray">
        {prettyString(type)}
      </Badge>
    ),
  },
  {
    dataKey: 'brand',
    title: 'Brand',
    render: (type) => (
      <Group noWrap spacing="xs">
        <Text weight={500}>{prettyString(type)}</Text>
      </Group>
    ),
  },
  {
    dataKey: 'stock',
    title: 'Stock',
  },
  {
    dataKey: 'price',
    title: 'Price/Disc',
    render: (type, { discountPercentage }) => (
      <Group noWrap spacing="xs">
        <Text weight={500}>{type}</Text>
        {discountPercentage && <Text color="red">{discountPercentage}%</Text>}
      </Group>
    ),
  },
];

export default memo(ProductTable);
