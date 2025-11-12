'use client';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Space } from 'antd';

import Link from 'next/link';
import {usePathname, useRouter} from 'next/navigation';

import { HEADER_ITEMS } from '@/app/shared/constants';

import styles from './header.module.css';
import {useAppDispatch, useAppSelector} from "@/app/lib/hooks";
import {setSearchParam} from "@/app/lib/feauters/search/search-slice";

export function HeaderPage() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const route = useRouter();

  const { searchParam} = useAppSelector(state=>state.search);
  const activeLink = (path: string) => (pathname === path ? 'var(--magenta-5)' : '');

  const onChangeSearchInputValue = (value: string) => {
    dispatch(setSearchParam(value))
  };

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
