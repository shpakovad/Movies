'use client';

import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';

import { ReactNode } from 'react';

const antStyleTheme = {
  token: {
    colorPrimaryHover: 'var(--magenta-5)',
  },
  components: {
    Rate: {
      starBg: 'var(--gray-7)',
    },
    Input: {
      activeBorderColor: 'var(--magenta-3)',
      hoverBorderColor: 'var(--magenta-5)',
    },
    Button: {
      defaultHoverBorderColor: 'var(--magenta-5)',
    },
  },
};

export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider theme={antStyleTheme}>{children}</ConfigProvider>
    </StyleProvider>
  );
}
