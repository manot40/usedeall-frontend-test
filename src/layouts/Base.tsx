import { Box, Container, Flex } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';

import Sidebar from '@/components/Sidebar';
import Navigation from '@/components/Navigation';

import { IconBox, IconGauge, IconShoppingCart } from '@tabler/icons-react';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, handler] = useDisclosure(false);

  return (
    <Flex>
      <Sidebar opened={isOpen} onChange={handler.toggle} data={mockData} />
      <Box>
        <Navigation opened={isOpen} onChange={handler.toggle} />
        <Container fluid py="md">
          {children}
        </Container>
      </Box>
    </Flex>
  );
};

const mockData = [
  { label: 'Dashboard', icon: IconGauge, links: [{ label: '', link: '/' }] },
  { label: 'Products', icon: IconBox, links: [{ label: '', link: '/products' }] },
  { label: 'Cart', icon: IconShoppingCart, links: [{ label: '', link: '/cart' }] },
];

export default BaseLayout;
