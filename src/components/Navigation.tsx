import { Box, Burger, createStyles, Flex, Navbar } from '@mantine/core';

type NavigationProps = {
  opened?: boolean;
  onChange?: (opened: boolean) => void;
};

const Navigation = ({ opened = false, onChange }: NavigationProps) => {
  const { classes } = useStyles();

  return (
    <Navbar className={classes.navbar} height="auto">
      <Navbar.Section className={classes.header}>
        <Flex align="center" justify="space-between">
          <div style={{ fontWeight: 600 }}>Dashboard</div>
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
      width: 'calc(100vw - 300px)',
    },
  },

  header: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
}));

export default Navigation;
