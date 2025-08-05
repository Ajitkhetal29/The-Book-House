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
            <div className="flex-1  bg-no-repeat bg-fixed bg-green-50 p-6 bg-[url('/images/home_bg.jpg')] bg-cover bg-center" >
  {isLoading && (
    <p className="text-2xl text-center font-bold">Loading...</p>
  )}
  <div>
    {allBooks.length > 0 && (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-white mb-6 border-b-4 border-white pb-2">All Books 📕</h2>

        <div className="flex flex-col md:flex-row justify-between w-full mb-6 gap-4">
          <ul className="flex flex-wrap gap-2">
            {["All", "Marathi", "English", "Hindi"].map((lang, index) => (
              <li
                key={index}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1 border cursor-pointer font-medium shadow-sm transition duration-200 ${lang === selectedLang ? "bg-pink-700 text-white" : "bg-white hover:bg-pink-600 hover:text-white"}`}
              >
                {lang}
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-2">
            {["All", "Fiction", "Non-fiction", "Science", "Biography", "Technology", "Other"].map((cat, index) => (
              <li
                key={index}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1 border cursor-pointer font-medium shadow-sm transition duration-200 ${cat === selectedCat ? "bg-pink-700 text-white" : "bg-white hover:bg-pink-600 hover:text-white"}`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                onClick={() => {
                  getBook(book._id);
                  navigate(`/book/${book._id}`);
                }}
                key={book._id}
                className="p-4 bg-indigo-50 border bg-tra rounded-xl shadow-md hover:shadow-xl transition duration-200 cursor-pointer"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-70 h-80 object-cover border rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">
                  {book.title}
                </h2>
                <p className="text-gray-600"><strong>Author:</strong> {book.author}</p>
                <p className="text-gray-600"><strong>Language:</strong> {book.language}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-white font-semibold">
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
