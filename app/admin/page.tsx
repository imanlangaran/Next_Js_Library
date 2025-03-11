import StatsCard from '@/components/admin/StatsCard'
import React from 'react'

const page = () => {
  return (
    <section className='grid grid-cols-3 gap-4'>
      <StatsCard title="Total Users" telorance={2} value={100} />
      <StatsCard title="Total Users" telorance={-2} value={100} />
      <StatsCard title="Total Users" telorance={2} value={100} />

    </section>
  )
}

export default page