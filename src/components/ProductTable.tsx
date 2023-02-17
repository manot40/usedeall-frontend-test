import type { ColumnSort } from '@/components/reusable/AutoTable/table';

import { memo } from 'react';
import { useViewport } from '@/hooks';

import { prettyString } from '../utils';
import { Badge, Group, Text, Tooltip } from '@mantine/core';
import { AutoTable, type TableColumns } from './reusable';

import Link from 'next/link';
import {
  IconVideo,
  IconChecks,
  IconClockPlay,
  IconDeviceLaptop,
  IconMessageCircle,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

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
      columns={cols.map((col) => (col.title === 'Action' ? col : { ...col, onSort: handleSort }))}
      pagination={{
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
    title: 'Name',
    style: { width: '50%' },
    render: (type, { id, description }) => (
      <Tooltip openDelay={300} width={220} position="right" label={description} arrowSize={8} multiline withArrow>
        <Text maw="fit-content" weight={500}>
          <Link href={`/products/${id}`}>{prettyString(type)}</Link>
        </Text>
      </Tooltip>
    ),
  },
  {
    dataKey: 'category',
    title: 'Category',
    render: (type) => (
      <Badge size="sm" color={pickCategoryColor(type)}>
        {prettyString(type)}
      </Badge>
    ),
  },
  {
    dataKey: 'brand',
    title: 'Brand',
    render: (type) => {
      const { color, Icon } = pickBrandBadge(type);
      if (!color || !Icon) return;
      return (
        <Group noWrap spacing="xs">
          <Icon color={color} size={18} />
          <Text weight={500} color={color}>
            {prettyString(type)}
          </Text>
        </Group>
      );
    },
  },
];

const pickCategoryColor = (type: Product['category']) =>
  ((
    {
      recreational: 'blue',
      educational: 'green',
      testimonial: 'orange',
      training: 'grape',
    } as Record<Product['category'], string>
  )[type] || 'gray');

const pickBrandBadge = (status: Product['brand']) =>
  ((
    {
      COMPLETED: { color: '#40c057', Icon: IconChecks },
      SHOOTING: { color: '#228be6', Icon: IconVideo },
      FEEDBACK: { color: '#4c6ef5', Icon: IconMessageCircle },
      INCOMPLETE: { color: '#fa5252', Icon: IconClockPlay },
      EDITING: { color: '#be4bdb', Icon: IconDeviceLaptop },
    } as Record<Product['brand'], { color: string; Icon: TablerIcon }>
  )[status] || {});

export default memo(ProductTable);
