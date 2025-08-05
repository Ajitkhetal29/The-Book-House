import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";

const UserBurrowedBooks = () => {
    const { isLoading, getUserBooks, userBooks, getUserDetails, returnBook } =
        useContext(AppContext);

    useEffect(() => {
        getUserBooks();
    }, []);


    return (
        <div className="flex-1 bg-[url('/images/profile_bg.png')] bg-contain bg-center mt-2 flex pt-6 w-full bg-green-50 justify-center">
            {isLoading && (
                <p className="text-2xl text-center font-bold ">Loading..</p>
            )}

            {userBooks ? (
                <div>

                    {userBooks.length > 0 ? (
                        <div className="flex flex-col items-center">
                            <h2 className="text-3xl  border-b  font-bold mb-2 pb-2">Books 📚</h2>
                            {userBooks.map((book) => (
                                <div
                                    key={book._id}
                                    className="flex mb-4 border-b p-4 md:gap-10 sm:gap-0 bg-white items-center justify-arround w-full"
                                >
                                    <div className="p-5  ">
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="w-40 h-40 mb-4"
                                        />
                                    </div>

                                    <div className="-5">
                                        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
                                        <p className="mb-1">
                                            <strong>Author:</strong> {book.author}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Category:</strong> {book.category}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Language:</strong> {book.language}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Borrowed Date:</strong>{" "}
                                            {new Date(book.borrowedAt).toLocaleDateString()}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Due Date:</strong>{" "}
                                            <span
                                                className={`${Date.now() > new Date(book.dueDate).getTime()
                                                    ? "text-red-500 font-semibold"
                                                    : ""
                                                    }`}
                                            >
                                                {new Date(book.dueDate).toLocaleDateString()}
                                            </span>
                                        </p>
                                        {Date.now() > new Date(book.dueDate).getTime() ? (
                                            <p className="mb-1">
                                                <span className="text-red-500 font-semibold">
                                                    Need to return the book, due date is passed
                                                </span>
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <div>
                                        <button
                                            onClick={() => returnBook(book._id)}
                                            className="px-4 py-2 bg-red-500 text-white cursor-pointer rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out font-medium"
                                        >
                                            Return
                                        </button>{" "}
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
    );
};

export default UserBurrowedBooks;
