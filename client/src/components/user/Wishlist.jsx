import React, { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const Wishlist = () => {
    const { isLoading, addToWishlist, getUserWishlist, wishlist, burrowBook, removeFromWishlist } = useContext(AppContext);

    useEffect(() => {
        getUserWishlist();
    }, [])

    console.log(wishlist);

    return <>

        <div className="flex-1 bg-[url('/images/wishlist_bg.jpg')] bg-cover bg-center mt-2 flex pt-6 w-full bg-green-50 justify-center">
            {isLoading && (
                <p className="text-2xl text-center font-bold ">Loading..</p>
            )}

            {wishlist ? (

                <div>
                    {wishlist.length > 0 ? (
                        <div className="flex flex-col items-center">
                            <h2 className="text-3xl text-center border-b  font-bold mb-2 pb-2">Wishlist ❤️</h2>
                            {wishlist.map((book) => (
                                <div
                                    key={book._id}
                                    className="flex mb-4 border-b p-2 md:gap-10 sm:gap-0 bg-white items-center justify-arround w-full"
                                >
                                    <div className="p-2  ">
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="w-30 h-30 mb-1"
                                        />
                                    </div>

                                    <div className="p-5">
                                        <h1 className="font-semibold mb-2">{book.title}</h1>
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
                                            <strong>Available:</strong> {book.isAvailable ? "✅" : "❌"}
                                        </p>

                                    </div>

                                    <div className="p-5 flex flex-col">
                                        <button onClick={()=>burrowBook(book._id)} className="mb-2 px-4 py-2 bg-green-500 hover:bg-green-600 cursor-pointer rounded-lg shadow-md transition duration-300 ease-in-out font-medium">Burrow</button>
                                        <button onClick={()=>removeFromWishlist(book._id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer rounded-lg shadow-md transition duration-300 ease-in-out font-medium">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No Books in wishList</p>
                    )}
                </div>
            ) : (
                <p>No Books Burrowed</p>
            )}
        </div>
    </>;
};

export default Wishlist;
