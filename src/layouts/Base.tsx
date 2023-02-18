import { Box, Flex } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { NavBar, SideBar } from '@/components/Navigation';
import { IconBox, IconGauge, IconShoppingCart } from '@tabler/icons-react';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, handler] = useDisclosure(false);

  return (
    <Flex h="100%">
      <SideBar opened={isOpen} onChange={handler.close} data={mockData} />
      <Flex direction="column" w="100%" h="100vh" sx={{ overflowX: 'hidden', flex: '1 1 0%' }}>
        <NavBar opened={isOpen} onChange={handler.toggle} />
        <Flex h="100%" mah="100vh" sx={{ overflowY: 'auto' }}>
          <Box w="100%" p="md">
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

const mockData = [
  { label: 'Dashboard', icon: IconGauge, links: [{ label: '', link: '/' }] },
  { label: 'Products', icon: IconBox, links: [{ label: '', link: '/products' }] },
  { label: 'Cart', icon: IconShoppingCart, links: [{ label: '', link: '/cart' }] },
];

export default BaseLayout;
