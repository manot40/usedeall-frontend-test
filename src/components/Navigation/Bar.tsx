import { Box, Burger, createStyles, Flex, Navbar } from '@mantine/core';
import NavBreadcrumbs, { useBreadcrumbs } from '@/components/Navigation/Breadcrumbs';

type NavigationProps = {
  opened?: boolean;
  onChange?: (opened: boolean) => void;
};

const NavBar = ({ opened = false, onChange }: NavigationProps) => {
  const { classes } = useStyles();
  const { push } = useBreadcrumbs();

  return (
    <Navbar className={classes.navbar} height="auto">
      <Navbar.Section className={classes.header}>
        <Flex align="center" justify="space-between" onClick={() => push(Math.random().toFixed(2))}>
          <Box style={{ fontWeight: 600 }} py={4}>
            <NavBreadcrumbs />
          </Box>
          <Box
            sx={(th) => ({
              zIndex: 99,
              display: 'block',
              position: 'relative',
              [`@media (min-width: ${th.breakpoints.sm}px)`]: {
                display: 'none',
              },
            })}
          >
            <Burger color={opened ? '#F2F2F2' : undefined} opened={opened} onClick={() => onChange?.(!opened)} />
          </Box>
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
};

const useStyles = createStyles((theme) => ({
  navbar: {
    width: '100vw',
    padding: theme.spacing.md,
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      width: 'calc(100vw - 260px)',
    },
  },

  header: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

export default NavBar;
