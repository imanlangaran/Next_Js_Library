import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

interface Props<TData, TValue> {
  title: string,
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
}

const Table = <TData, TValue>({ title, columns, data} : Props<TData, TValue>) => {
  return (
    <div className='flex justify-between items-center'>
      <h2>{title}</h2>
      <button className='btn-primary'>A-Z</button>
    </div>
  )
}

export default Table