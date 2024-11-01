import React from 'react'

const IconButton = ({Icon}) => {
  return (
    <div className='bg-[#00000026] p-1.5 rounded-full'>
        {Icon && <Icon />}
    </div>
  )
}

export default IconButton