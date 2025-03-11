import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
  title: string;
  bottonLink: string;
  className?: string;
}

const OverviewCard = ({ title, bottonLink, className }: Props) => {
  return (
    <div className={cn('admin-main p-4 h-full', className)}>
      <h3 className='text-lg font-medium text-dark-500'>{title}</h3>
      <Link href={bottonLink} className='text-sm text-blue-500'>View all</Link>
    </div>
  )
}

export default OverviewCard