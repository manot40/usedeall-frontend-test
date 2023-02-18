import type { ColumnSort } from '@/components/reusable/AutoTable/table';

import { memo } from 'react';
import { useRouter } from 'next/router';
import { useViewport } from '@/hooks';

import { Text } from '@mantine/core';
import { AutoTable, type TableColumns } from '../reusable';

type CartSort = Pick<BaseQuery<Cart>, '_order' | '_sort'>;

type CartTableProps = {
  data?: Cart[];
  query: BaseQuery<Cart>;
  totalCount: number;
  onSortChange: (order: CartSort) => void;
  onPageChange: (page: number) => void;
};

const CartTable: React.FC<CartTableProps> = ({ data, query, totalCount, onPageChange, onSortChange }) => {
  const { xs } = useViewport();
  const { push } = useRouter();

  const handleSort = ({ key, order }: ColumnSort<Cart>) => onSortChange({ _sort: key, _order: order });

  return (
    <AutoTable
      data={data}
      useScroll={xs}
      highlightOnHover
      verticalSpacing="sm"
      onClick={(r) => push(`/cart/${r.id}`)}
      wrapperProps={{ mih: 630, style: { userSelect: 'none' } }}
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

const cols: TableColumns<Cart> = [
  {
    dataKey: 'id',
    title: 'Cart ID',
    render: (id) => <Text weight={500}>{id}</Text>,
  },
  {
    dataKey: 'totalProducts',
    title: 'Total Products',
  },
  {
    dataKey: 'total',
    title: 'Total Amount',
  },
];

export default memo(CartTable);
