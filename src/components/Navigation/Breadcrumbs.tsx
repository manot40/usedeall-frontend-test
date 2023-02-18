import { memo, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { prettyString } from '@/utils';
import { Breadcrumbs, Text } from '@mantine/core';
import { useBreadcrumbsStore } from '@/store/breadcrumbs';

const NavBreadcrumbs: React.FC = () => {
  const { nav } = useBreadcrumbs();
  return (
    <Breadcrumbs style={{ userSelect: 'none' }}>
      {nav.length ? (
        nav.map((n, i) => {
          if (i + 1 === nav.length)
            return (
              <Text key={i} style={linkStyle} weight={600}>
                {prettyString(n)}
              </Text>
            );
          return (
            <Link key={i} href={`/${nav.slice(0, i + 1).join('/')}`}>
              {prettyString(n)}
            </Link>
          );
        })
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

const linkStyle = { maxWidth: '16ch', overflow: 'hidden', textOverflow: 'ellipsis' };

export default memo(NavBreadcrumbs);
