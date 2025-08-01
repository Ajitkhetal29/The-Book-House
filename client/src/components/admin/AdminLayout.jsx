import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='flex-1 mt-10 flex '>
      <Outlet />

    </div>
  )
}

export default AdminLayout