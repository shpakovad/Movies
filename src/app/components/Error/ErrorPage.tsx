'use client';

import { Layout } from 'antd';

import React from 'react';

import Image from 'next/image';

import errorImage from '@/app/assests/images/error-image.png';

import styles from './Error.module.css';

export function ErrorPage() {
  return (
    <Layout className={styles.layout}>
      <Image src={errorImage} alt="error" />
    </Layout>
  );
}

export default ErrorPage;
