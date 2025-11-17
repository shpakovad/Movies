'use client';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Space } from 'antd';

import { useEffect } from 'react';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { setSearchParam } from '@/app/lib/feauters/search/search-slice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { HEADER_ITEMS } from '@/app/shared/constants';

import styles from './header.module.css';

export function HeaderPage() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const route = useRouter();
  const searchParams = useSearchParams();
  console.log({ pathname, route });
  const query = searchParams.get('q');

  const { searchParam } = useAppSelector((state) => state.search);
  const activeLink = (path: string) => (pathname === path ? 'var(--magenta-5)' : '');

  const onChangeSearchInputValue = (value: string) => {
    dispatch(setSearchParam(value));
  };

  useEffect(() => {
    dispatch(setSearchParam(query));
    return () => {
      dispatch(setSearchParam(null));
    };
  }, [query]);

  const onChangePass = () => route.push(`/movies/search?q=${searchParam}&page=1`);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        {HEADER_ITEMS.map((item) => (
          <Link key={item.name} href={item.href} style={{ color: activeLink(item.href) }}>
            {item.name}
          </Link>
        ))}
        <span>
          <Space.Compact>
            <Input
              value={searchParam || ''}
              placeholder="type to search"
              onChange={(e) => onChangeSearchInputValue(e.target.value)}
              onPressEnter={onChangePass}
            />
            <Button type="primary" icon={<SearchOutlined />} onClick={onChangePass} />
          </Space.Compact>
        </span>
      </div>
      <Divider style={{ background: 'var(--gray-7)', marginBottom: 0 }} />
    </div>
  );
}

export default HeaderPage;
