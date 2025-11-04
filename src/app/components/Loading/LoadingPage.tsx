'use client';

import { Flex, Spin } from 'antd';

import React from 'react';

export function LoadingPage() {
  return (
    <Flex align="center" gap="middle">
      <Spin size="large" fullscreen />
    </Flex>
  );
}

export default LoadingPage;
