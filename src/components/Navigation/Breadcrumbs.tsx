import { memo, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { prettyString } from '@/utils';
import { Breadcrumbs, Text } from '@mantine/core';
import { useBreadcrumbsStore } from '@/store/breadcrumbs';

type NavBreadcrumbsProps = {};

const NavBreadcrumbs: React.FC<NavBreadcrumbsProps> = (props) => {
  const { nav } = useBreadcrumbs();
  return (
    <Breadcrumbs>
      {nav.length ? (
        nav.map((n, i) => (
          <Text key={i}>
            <Link href={nav.slice(0, i + 1).join('/')}>{prettyString(n)}</Link>
          </Text>
        ))
      ) : (
        <Text>
          <Link href="/">Dashboard</Link>
        </Text>
      )}
    </Breadcrumbs>
  );
};

export function useBreadcrumbs() {
  const { pathname } = useRouter();
  const [nav, setNav, push] = useBreadcrumbsStore((state) => [state.breadcrumbs, state.setBreadcrumbs, state.push]);

  useEffect(() => {
    setNav(pathname.split('/').filter((n) => n && !n.includes('[')));
  }, [pathname, setNav]);

  return { push, nav };
}

export default memo(NavBreadcrumbs);
