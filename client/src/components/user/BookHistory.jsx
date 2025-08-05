import React, { useContext } from 'react'
import { AppContext } from "../../context/AppContext";
import { useEffect } from 'react';

const BookHistory = () => {

    const { isLoading, getBookHistory,
        userBookHistory } =
        useContext(AppContext);

        useEffect(()=>{
            getBookHistory()
        },[])



    return (
        <div className="flex-1 bg-[url('/images/book_history.jpg')] bg-cover bg-center mt-2 flex pt-6 w-full bg-green-50 justify-center ">
            {isLoading && (
                <p className="text-2xl text-center font-bold ">Loading..</p>
            )}

            {userBookHistory? (
                
                <div className='flex flex-col items-center'>
                    <h2 className="text-3xl  border-b  font-bold mb-2 pb-2"> Book History 🕓</h2>
                    {userBookHistory.length > 0 ? (
                        <div>
                            {userBookHistory.map((book) => (
                                <div
                                    key={book._id}
                                    className="flex mb-4 border-b p-2 md:gap-10 sm:gap-0 bg-white items-center justify-arround w-full"
                                >
                                    <div className="p-5  ">
                                        <img
                                            src={book.bookId.coverImage}
                                            alt={book.title}
                                            className="w-20 h-20 mb-1"
                                        />
                                    </div>

                                    <div className="-5">
                                        <h1 className="font-semibold mb-2">{book.bookId.title}</h1>
                                        <p className="mb-1">
                                            <span>Borrowed Date:</span>{" "}
                                            {new Date(book.borrowedAt).toLocaleDateString()}
                                        </p>
                                        <p className="mb-1">
                                            <span>Returned Date:</span>{" "}
                                            {new Date(book.returnedAt).toLocaleDateString()}
                                        </p>

                                        
                                    </div>

                                    <div>
                                       
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No Books Burrowed</p>
                    )}
                </div>
            ) : (
                <p>No Books Burrowed</p>
            )}
        </div>
    )
}

export default BookHistory