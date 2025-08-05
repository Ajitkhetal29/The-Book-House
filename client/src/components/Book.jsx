import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Book = () => {
  const {
    user,
    isLoading,
    book,
    getBook,
    burrowBook,
    getUserDetails,
    returnBook,
    addToWishlist,
    navigate,
    deleteBook,
  } = useContext(AppContext);
  const { id } = useParams();

  useEffect(() => {
    getBook(id), getUserDetails();
  }, []);

  if (isLoading) {
    return <p className="text-2xl text-center font-bold">Loading..</p>;
  }

  if (!user || !book) {
    return null;
  }

  const borrowedEntry = Array.isArray(user.books)
    ? user.books.find((entry) => entry.bookId === book._id)
    : null;

  return (
    <div
      className="flex-1 
     flex  "
    >
      {isLoading && <p className="text-2xl text-center font-bold">Loading..</p>}
      {book && user && (
        <div className=" gap-2 items-center justify-center  flex p-4 pt-6 bg-[url('/images/burrowed_book.jpg')] bg-cover bg-center w-full ">
          <div className="p-5 ">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-48 h-64 mb-4 "
            />
          </div>

          <div className="p-5 bg-white rounded border-b">
            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
            <p className="mb-1">
              <strong>Author:</strong> {book.author}
            </p>
            <p className="mb-1">
              <strong>Language:</strong> {book.language}
            </p>
            <p className="mb-1">
              <strong>Category:</strong> {book.category}
            </p>
            <p className="mb-1">
              <strong>Description:</strong> {book.description}
            </p>
            {!borrowedEntry ? (
              <p className="mb-1">
                <strong>Available:</strong> {book.isAvailable ? "✅" : "❌"}
              </p>
            ) : (
              <>
                <p className="mb-1">
                  <strong>Borrowed Date:</strong>{" "}
                  {new Date(borrowedEntry.borrowedAt).toLocaleDateString()}
                </p>
                <p className="mb-1">
                  <strong>Due Date:</strong>{" "}
                  <span
                    className={`${Date.now() > new Date(borrowedEntry.dueDate).getTime()
                        ? "text-red-500 font-semibold"
                        : ""
                      }`}
                  >
                    {new Date(borrowedEntry.dueDate).toLocaleDateString()}
                  </span>
                </p>
              </>
            )}

            {user.role === "user" && (
              <ul className="flex gap-4 items-center justify-center mt-4">
                {user.books.some((entry) => entry.bookId === book._id) ? (
                  <li>
                    <button
                      onClick={() => returnBook(book._id)}
                      className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out font-medium"
                    >
                      Return
                    </button>
                  </li> 
                ) : (
                  <li>
                    <button
                      onClick={() => burrowBook(book._id)}
                      disabled={!book.isAvailable || user.books.length >= 2}
                      className={`px-4 py-2 text-white rounded-lg shadow-md transition duration-300 ease-in-out font-medium
                        ${!book.isAvailable || user.books.length >= 2
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600 cursor-pointer"
                        }
                     `}
                    >
                      Borrow
                    </button>
                  </li>
                )}

                <li>
                  <button
                    onClick={() => addToWishlist(book._id)}
                    className="px-4 py-2 cursor-pointer bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition duration-300 ease-in-out font-medium"
                  >
                    Wishlist
                  </button>
                </li>
              </ul>
            )}

            {user.role === "admin" && (
              <ul className="flex gap-4 items-center justify-center mt-4">
                <li>
                  <button
                    onClick={() => navigate(`/updateBook/${book._id}`)}
                    className="px-4 py-2 cursor-pointer bg-yellow-400 text-black rounded-lg shadow-md hover:bg-yellow-500 transition duration-300 ease-in-out font-semibold"
                  >
                    Update
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out font-semibold"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
