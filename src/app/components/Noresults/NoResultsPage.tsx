'use client';

import { Layout } from 'antd';

import React from 'react';

import Image from 'next/image';

import noResultsImage from '@/app/assests/images/no-results-image.svg';
import GoHomeButtonPage from '@/app/components/GoHomeButton/GoHomeButtonPage';

import styles from '../Error/Error.module.css';

export function NoResultsPage() {
  return (
    <Layout className={styles.layout}>
      <Image src={noResultsImage} alt="no-results" />
      <div className={styles.description}>
        <h1>Oops!</h1>
        <h2>No results found for your search.</h2>
        <h2>
          Please try a different query or
          <span>
            <GoHomeButtonPage />
          </span>
        </h2>
      </div>
    </Layout>
  );
}

export default NoResultsPage;
