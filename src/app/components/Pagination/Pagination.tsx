'use client';

import { Pagination } from 'antd';

import React from 'react';

import styles from './pagination.module.css';

interface IProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function PaginationPage({ currentPage, totalPages, onChange }: IProps) {
  return (
    <div className={styles.pagination}>
      <Pagination defaultCurrent={currentPage} total={totalPages} onChange={onChange} />
    </div>
  );
}

export default PaginationPage;
