'use client';

import { Layout } from 'antd';

import React from 'react';

import Image from 'next/image';

import errorImage from '@/app/assests/images/error-image.svg';
import GoHomeButtonPage from '@/app/components/GoHomeButton/GoHomeButtonPage';

import styles from './Error.module.css';

export function ErrorPage() {
  return (
    <Layout className={styles.layout}>
      <Image src={errorImage} alt="error" />
      <div className={styles.description}>
        <h1>Oops!</h1>
        <h2>Something went wrong here...</h2>
        <h2>
          <GoHomeButtonPage />
        </h2>
      </div>
    </Layout>
  );
}

export default ErrorPage;
