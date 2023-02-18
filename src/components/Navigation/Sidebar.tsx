import { memo } from 'react';

import { LinksGroup, type LinksGroupOptions } from '@/components/reusable';
import { Navbar, Group, Text, ScrollArea, createStyles, Box } from '@mantine/core';
import { useRouter } from 'next/router';

type AdminNavProps = {
  data: LinksGroupOptions[];
  header?: React.ReactNode;
  opened?: boolean;
  onChange?: (opened: boolean) => void;
};

const NavSidebar = ({ data, header, opened = false, onChange }: AdminNavProps) => {
  const { classes } = useStyles();
  const { pathname } = useRouter();

  const Links = data.map((item) => (
    <LinksGroup
      {...item}
      key={item.label}
      onClick={() => onChange?.(!opened)}
      active={parsePath(pathname) == item.label.toLowerCase()}
    />
  ));

  return (
    <>
      <Navbar height="100vh" p="md" className={classes.sidebar} style={{ left: opened ? 0 : undefined }}>
        <Navbar.Section className={classes.header}>
          <Group position="apart">
            {header || (
              <Text weight={700} style={{ userSelect: 'none' }}>
                SUPER{' '}
                <Text component="span" weight={500}>
                  ADMIN
                </Text>
              </Text>
            )}
          </Group>
        </Navbar.Section>

        <Navbar.Section grow className={classes.links} component={ScrollArea}>
          <div className={classes.linksInner}>{Links}</div>
        </Navbar.Section>
      </Navbar>
      {opened && <Box className={classes.overlay} onClick={() => onChange?.(!opened)} />}
    </>
  );
};

const parsePath = (path: string) => {
  if (path === '/') return 'dashboard';
  return path.toLowerCase().split('/')[1].replace('/', '');
};

const useStyles = createStyles((theme) => ({
  sidebar: {
    top: 0,
    left: -260,
    width: 260,
    zIndex: 99,
    position: 'fixed',
    paddingBottom: 0,
    transition: 'left 0.2s ease-in-out',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      position: 'inherit',
    },
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },

  overlay: {
    top: 0,
    left: 0,
    zIndex: 98,
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.5)',
    animation: 'fade-in 0.2s ease-in-out',

    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      display: 'none',
    },
  },
}));

export default memo(NavSidebar);
