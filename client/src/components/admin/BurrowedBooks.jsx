import React, { useContext, useEffect } from 'react'
import { AppContext } from "../../context/AppContext";

const BurrowedBooks = () => {


  useEffect(() => {
    getBurrowedBook();
  }, [])

  const { burrowdBooks, isLoading, getBurrowedBook } = useContext(AppContext)
  console.log(burrowdBooks);



  return (
    <>
      <div className="flex-1 flex pt-6 w-full bg-green-50 justify-center">


        {isLoading && <p>Loading..</p>}

        {burrowdBooks.length > 0 ? <div className='flex bg-[url("/images/profile_bg.png")] bg-contain bg-center  w-full flex-col items-center bg-green-50' >

          <h2 className="text-3xl border-b  font-bold mb-2 pb-2">Books Burrowed 📗</h2>

          {burrowdBooks.map(book => (
            <div className='flex  border-b p-5 gap-5 bg-white rounded' key={book.borrowedAt} >
              <div className=' flex flex-col items-center  justify-center'>
                <img src={book.coverImage} alt="" className='w-20 h-25 mb-1' />
              </div>
              <div className=' flex flex-col justify-center'>
                <p> <strong>Title : </strong>{book.title}</p>

                <p><strong>Borrower Name :</strong> {book.userName} </p>
                <p><strong>Borrower Email :</strong> {book.userEmail} </p>
              </div>
              <div className=' flex flex-col justify-center'>
                <p> <strong>Borrow Date :</strong> {new Date(book.borrowedAt).toLocaleDateString()} </p>
                <p className={`${Date.now() > new Date(book.dueDate).getTime()
                  ? "text-red-500 font-semibold"
                  : ""
                  }`}> <strong>Due Date :</strong> {new Date(book.dueDate).toLocaleDateString()} </p>
              </div>
            </div>
          ))}

        </div> : <p>No books burrowed</p>}

      </div>
    </>

  )
}

export default BurrowedBooks