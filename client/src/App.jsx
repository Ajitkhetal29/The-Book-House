import { useEffect, useState } from 'react'

import { Outlet, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './components/admin/AdminDashBoard'
import AllBooks from './components/AllBooks'
import BurrowedBooks from './components/admin/BurrowedBooks'
import AddBooks from './components/admin/AddBooks'
import UserDashBoard from './components/user/UserDashBoard'
import UserBurrowedBooks from './components/user/UserBurrowedBooks'
import BookHistory from './components/user/BookHistory'
import Wishlist from './components/user/Wishlist'
import Book from './components/Book'
import UpdateBook from './components/admin/UpdateBook'
import AllUsers from './components/admin/AllUsers'
import Profile from './components/Profile'
import Notification from './components/user/Notification'
import VerifyPayment from './components/verifyPayment'


function App() {
  const [count, setCount] = useState(0)



  return (
    <>

      <ToastContainer />

      <div className='min-h-screen flex flex-col'  >
        <Navbar />

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='allBooks' element={<AllBooks />} />
            <Route path='BurrowedBooks' element={<BurrowedBooks />} />
            <Route path='addBooks' element={<AddBooks />} />
            <Route path='allUsers' element={<AllUsers />} />
          </Route>
          <Route path='/user' element={<UserDashBoard />}>
            <Route index element={<AllBooks />} />
            <Route path='burrowedBook' element={<UserBurrowedBooks />} />
            <Route path='bookHistory' element={<BookHistory />} />
            <Route path='wishlist' element={<Wishlist />} />
            <Route path='notification' element={<Notification />} />
          </Route>
          <Route path='/book/:id' element={<Book />}></Route>
          <Route path='/updateBook/:id' element={<UpdateBook />}></Route>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/verify' element={<VerifyPayment/>} ></Route>
        </Routes>

        <Outlet />
      </div>



    </>
  )
}

export default App
