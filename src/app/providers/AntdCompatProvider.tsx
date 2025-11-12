'use client';

import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';

import { useEffect } from 'react';

// Настройка совместимости для React 19
if (typeof window !== 'undefined') {
  unstableSetRender((node, container) => {
    container._reactRoot ||= createRoot(container);
    const root = container._reactRoot;
    root.render(node);
    return async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      root.unmount();
    };
  });
}

export function AntdCompatProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Дополнительно подавляем предупреждения в development
    if (process.env.NODE_ENV === 'development') {
      const originalWarn = console.warn;
      console.warn = (...args: any[]) => {
        if (typeof args[0] === 'string' && args[0].includes('antd: compatible')) {
          return;
        }
        originalWarn.apply(console, args);
      };

      return () => {
        console.warn = originalWarn;
      };
    }
  }, []);

  return <>{children}</>;
}
