import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  return (  
    <div>
        <h1>Book Details</h1>
        <p>Book ID: {id}</p>
    </div>
  )
}

export default page