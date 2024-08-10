import {ReactNode, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ConfigProvider} from 'antd';

export default function Providers({children}: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 5 * 1000,
        retry: 0
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              paddingBlock: 10,
              colorBgContainer: '#b0c6e3',
              colorTextPlaceholder: 'rgba(64,76,86,0.57)',
              hoverBorderColor: '#1e74e5',
              fontFamily: 'Montserrat',
            },
            Select: {
              colorBgContainer: '#b0c6e3',
              colorTextPlaceholder: 'rgba(0,0,0,0.54)',
              fontFamily: 'Montserrat',
              controlHeight: 43,
              optionSelectedBg: '#80a2ce',
              optionSelectedColor: 'white'
            },
            Form: {
              verticalLabelPadding: 0
            }
          }
        }}
      >
        {children}
      </ConfigProvider>
    </QueryClientProvider>
  );
}
