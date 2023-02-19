import useSWR from 'swr';
import Head from 'next/head';
import { fetcher } from '@/utils';

import PieChart from '@/components/Chart';
import { Card, Flex, Grid, LoadingOverlay, Title } from '@mantine/core';

export default function Dashboard() {
  const { data: res } = useSWR<Res<ProductChartData>>('/api/dashboard/product', fetcher.get);
  return (
    <Grid gutter="md">
      <Head>
        <title>Dashboard - Simple E-Commerce</title>
      </Head>
      <Grid.Col span={12} md={6}>
        <Card shadow="md" mih={360} style={{ position: 'relative' }}>
          <Title align="center" order={3}>
            Product by Brand
          </Title>
          <Flex p="md">{res ? <PieChart data={res.result!.byBrand} /> : <LoadingOverlay visible />}</Flex>
        </Card>
      </Grid.Col>
      <Grid.Col span={12} md={6}>
        <Card shadow="md" mih={360} style={{ position: 'relative' }}>
          <Title align="center" order={3}>
            Product by Category
          </Title>
          <Flex p="md">{res ? <PieChart data={res.result!.byCategory} /> : <LoadingOverlay visible />}</Flex>
        </Card>
      </Grid.Col>
    </Grid>
  );
}
