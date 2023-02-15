import type { AppProps } from 'next/app';

import BaseLayout from '@/layouts/Base';
import Providers from '@/components/Providers';

import '@/styles/global.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </Providers>
  );
};

export default App;
