'use client';

import { Divider, Input } from 'antd';

import Link from 'next/link';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import { HEADER_ITEMS } from '@/app/shared/constants';

import styles from './header.module.css';

export function HeaderPage() {
  const { Search } = Input;
  const pathname = usePathname();
  const activeLink = (path: string) => (pathname === path ? 'var(--magenta-5)' : '');


  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {HEADER_ITEMS.map((item) => (
          <Link key={item.name} href={item.href} style={{color: activeLink(item.href)}}>
            {item.name}
          </Link>
        ))}
        <span>
          <Search placeholder="type to search" onSearch={() => {}} style={{ width: 200 }} />
        </span>
      </div>
      <Divider style={{ background: 'var(--gray-7)', marginBottom: 0 }} />
    </div>
  );
}

export default HeaderPage;
