import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../context/AppContext";

const AllBooks = () => {
    const { getAllBooks, allBooks, isLoading, getBook, navigate } = useContext(AppContext);
    const [selectedLang, setSelectedLang] = useState("All");
    const [selectedCat, setSelectedCat] = useState("All");

    const filteredBooks = allBooks.filter(book => {
        const matchesLang = selectedLang === 'All' || book.language === selectedLang
        const matchesCat = selectedCat === 'All' || book.category === selectedCat
        return matchesLang && matchesCat
    })

    return (
        <>
            <div className="flex-1 w-full p-6 items-center justify-center bg-green-50">
                {isLoading && (
                    <p className="text-2xl text-center font-bold">Loading..</p>
                )}
                <div>
                    {allBooks.length > 0 && (
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-3xl border-b  font-bold mb-2 pb-2">All Books 📕</h2>
                            <div className="flex w-full justify-between">
                                <ul className="flex flex-wrap gap-2 bg-green-20 items-center">🔍{["All", "Marathi", "English", "Hindi"].map((lang, index) => (
                                    <li key={index} onClick={() => setSelectedLang(lang)} className={`px-2 py-1 border rounded cursor-pointer hover:bg-pink-700 hover:text-white transition ${lang === selectedLang ? "bg-pink-800 text-white" : ""}`}>
                                        {lang}
                                    </li>
                                ))}
                                </ul>
                                <ul className="flex flex-wrap gap-2 bg-green-20 items-center">🔍
                                    {["All", "Fiction", "Non-fiction", "Science", "Biography", "Technology", "Other"].map((cat, index) => (
                                        <li key={index} onClick={() => setSelectedCat(cat)} className={`px-2 py-1 border rounded cursor-pointer hover:bg-pink-700 hover:text-white transition ${cat === selectedCat ? "bg-pink-800 text-white" : ""}`}>
                                            {cat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                                {filteredBooks.length > 0 ? (
                                    filteredBooks.map((book) => (
                                        
                                        <div
                                            onClick={() => {
                                                getBook(book._id),
                                                navigate(`/book/${book._id}`)
                                            }}
                                            key={book._id}
                                            className="p-4 bg-green-20 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                                        >
                                            <img
                                                src={book.coverImage}
                                                alt={book.title}
                                                className="w-70 h-70 object-fit rounded mb-3"
                                            />
                                            <h2 className="text-lg font-bold truncate">
                                                Title: <span className="font-normal">{book.title}</span>
                                            </h2>
                                            <p><strong>Author:</strong> {book.author}</p>
                                            <p><strong>Language:</strong> {book.language}</p>
                                            <p><strong>Category:</strong> {book.category}</p>
                                            <p className="truncate"><strong>Description:</strong> {book.description}</p>
                                            <p><strong>Available:</strong> {book.isAvailable ? "✅ Yes" : "❌ No"}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="col-span-full text-center text-gray-600 font-semibold">
                                        No such book available.
                                    </p>
                                )}
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AllBooks;
