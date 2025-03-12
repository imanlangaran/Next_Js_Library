import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button';

interface Props {
  title: string;
  bottonLink: string;
  className?: string;
  children: React.ReactNode;
}

const OverviewCard = ({ title, bottonLink, className, children }: Props) => {
  return (
    <div className={cn('admin-main p-4 h-full', className)}>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium text-dark-500'>{title}</h3>
        <Button variant="outline" size="sm" asChild className='view-btn'>
          <Link href={bottonLink} className='text-base text-primary-admin'>View all</Link>
        </Button>
      </div>
      {children}
    </div>
  )
}

export default OverviewCard