'use client';
import { Provider } from 'react-redux';

import { ReactNode, useRef } from 'react';

import { AppStore, makeStore } from '@/app/lib/store';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
