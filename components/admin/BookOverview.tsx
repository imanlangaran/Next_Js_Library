import React from 'react'

interface Props{
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  date:Date;
  userId?: string;
}

const BookOverview = ({title, author, genre, coverUrl, date, userId}: Props) => {
  return (
    <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
                <h1>{title}</h1>
            </div>
        </div>
    </div>
  )
}

export default BookOverview;