import useSWR from 'swr';
import { fetcher } from '@/utils';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useBreadcrumbs } from '@/components/Navigation/Breadcrumbs';

import Head from 'next/head';
import { Result } from '@/components/reusable';
import { Box, LoadingOverlay, Stack } from '@mantine/core';

export default function ProductDetail() {
  const { query } = useRouter();
  const { push } = useBreadcrumbs();
  const { data: productRes, error } = useSWR<Res<Product>>(`/api/product/${query.id}`, fetcher.get);

  useEffect(() => {
    const title = productRes?.result!.title;
    if (query?.id && title) push(title);
    // eslint-disable-next-line
  }, [query?.id, productRes?.result!.title]);

  if (error)
    return (
      <Box py={120}>
        <Result />
      </Box>
    );

  if (!productRes)
    return (
      <Box sx={{ position: 'relative', width: '100%', height: '80vh' }}>
        <LoadingOverlay visible overlayColor="transparent" />
      </Box>
    );

  return (
    <Stack spacing="lg">
      <Head>
        <title>{productRes.result!.title} - Simple E-Commerce</title>
      </Head>
      Work In Progress
    </Stack>
  );
}
