import React from 'react'

const Input = ({icon, ...props}) => {
  return (
    <div className='relative '>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3'>{icon}</div>
        <input {...props} className='w-64 pl-10 py-1 rounded' />
    </div>
  )
}

export default Input