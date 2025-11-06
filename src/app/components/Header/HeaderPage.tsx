'use client';

import { Divider, Input } from 'antd';

import Link from 'next/link';

import styles from './header.module.css';

export function HeaderPage() {
  const { Search } = Input;
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Link href={'/'}>Home</Link>
        <Link href={'/movies'}>Movies</Link>
        <span>
          <Search placeholder="input search text" onSearch={() => {}} style={{ width: 200 }} />
        </span>
      </div>
      <Divider style={{ background: 'var(--gray-7)', marginBottom: 0 }} />
    </div>
  );
}

export default HeaderPage;
