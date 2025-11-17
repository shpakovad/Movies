'use client';

import Link from 'next/link';

import styles from './GoHomeButtonPage.module.css';

export function GoHomeButtonPage() {
  return (
    <Link key="go-home" href="/">
      {' '}
      <span className={styles.link}>go back Home </span>
    </Link>
  );
}

export default GoHomeButtonPage;
