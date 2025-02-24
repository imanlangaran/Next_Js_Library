import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

interface Props {
  title: string,
  columns: ColumnDef<User>[],
  data: User[],
}

const Table = ({ title, columns, data} : Props) => {
  return (
    <div className='flex justify-between items-center'>
      <h2>{title}</h2>
      <button className='btn-primary'>A-Z</button>
    </div>
  )
}

export default Table