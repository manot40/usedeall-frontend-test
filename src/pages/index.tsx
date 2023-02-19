import useSWR from 'swr';
import Head from 'next/head';
import { fetcher } from '@/utils';

import PieChart from '@/components/Chart';
import { Card, Flex, Grid, Title } from '@mantine/core';

export default function Dashboard() {
  const { data: res, error } = useSWR<Res<ProductChartData>>('/api/dashboard/product', fetcher.get);
  return (
    <Grid gutter="md">
      <Head>
        <title>Dashboard - Simple E-Commerce</title>
      </Head>
      <Grid.Col span={12} md={6}>
        <Card shadow="md">
          <Title align="center" order={3}>
            Product by Brand
          </Title>
          <Flex p="md">{res && <PieChart data={res.result!.byBrand} />}</Flex>
        </Card>
      </Grid.Col>
      <Grid.Col span={12} md={6}>
        <Card shadow="md">
          <Title align="center" order={3}>
            Product by Category
          </Title>
          <Flex p="md">{res && <PieChart data={res.result!.byCategory} />}</Flex>
        </Card>
      </Grid.Col>
    </Grid>
  );
}
