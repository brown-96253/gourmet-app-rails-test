'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BodyClassWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [className, setClassName] = useState('');

  useEffect(() => {
    setClassName(pathname.startsWith('/shop/') ? 'no-background' : 'with-background');
  }, [pathname]);

  return <div className={className}>{children}</div>;
}