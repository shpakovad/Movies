'use client';

import Link from 'next/link';

export function GoHomeButtonPage() {
  return (
    <Link key="go-home" href="/">
      {' '}
      go back Home{' '}
    </Link>
  );
}

export default GoHomeButtonPage;
