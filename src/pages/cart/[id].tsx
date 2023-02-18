import useSWR from 'swr';
import { fetcher } from '@/utils';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useBreadcrumbs } from '@/components/Navigation/Breadcrumbs';

import Head from 'next/head';
import { Result } from '@/components/reusable';
import { Box, LoadingOverlay, Stack } from '@mantine/core';
import { DetailOverview, DetailTable } from '@/components/Cart';

export default function CartDetail() {
  const { query } = useRouter();
  const { push } = useBreadcrumbs();
  const { data: cartRes, error } = useSWR<Res<Cart>>(`/api/cart/${query.id}`, fetcher.get);

  useEffect(() => {
    query?.id && push(`${query.id}`);
    // eslint-disable-next-line
  }, [query.id]);

  if (error)
    return (
      <Box py={120}>
        <Result />
      </Box>
    );

  if (!cartRes)
    return (
      <Box sx={{ position: 'relative', width: '100%', height: '80vh' }}>
        <LoadingOverlay visible overlayColor="transparent" />
      </Box>
    );

  return (
    <Stack spacing="lg">
      <Head>
        <title>Cart {cartRes.result!.id} - Simple E-Commerce</title>
      </Head>
      <DetailOverview data={cartRes.result!} />
      <DetailTable data={cartRes.result!.products} />
    </Stack>
  );
}
