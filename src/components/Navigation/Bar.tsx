import { Box, Burger, createStyles, Flex, Navbar } from '@mantine/core';
import NavBreadcrumbs from '@/components/Navigation/Breadcrumbs';

type NavigationProps = {
  opened?: boolean;
  onChange?: (opened: boolean) => void;
};

const NavBar = ({ opened = false, onChange }: NavigationProps) => {
  const { classes } = useStyles();
  return (
    <Navbar className={classes.navbar} height="auto">
      <Navbar.Section className={classes.header}>
        <Flex align="center" justify="space-between">
          <Box py={4}>
            <NavBreadcrumbs />
          </Box>
          <Box sx={(th) => ({ [`@media (min-width: ${th.breakpoints.sm}px)`]: { display: 'none' } })}>
            <Burger aria-label="Menu Button" opened={opened} onClick={() => onChange?.(!opened)} />
          </Box>
        </Flex>
      </Navbar.Section>
    </Navbar>
  );
};

const useStyles = createStyles((theme) => ({
  navbar: {
    display: 'flex',
    padding: 16.5,
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: { padding: theme.spacing.md },
  },

  header: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

export default NavBar;
