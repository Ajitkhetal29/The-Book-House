import React, { useContext, useState } from 'react'
import { AppContext } from "../../context/AppContext";

const AddBooks = () => {

    const { addBook } = useContext(AppContext);

    const [Loading , setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        author: '',
        language: "English",
        category: "Fiction",
        description: "",
        totalCopies: 1,
        coverImage: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        addBook(form);
        setForm({
            title: "",
            author: "",
            language: "English",
            category: "Fiction",
            description: "",
            totalCopies: 1,
            coverImage: ""
        });

        setLoading(false)

    }

    return (
        <div className='flex-1 flex mt-5 bg-[url("/images/add_book_bg.jpg")] bg-contain bg-center flex items-center justify-center bg'>

            <form onSubmit={handleSubmit} action="" className='bg-white border rounded px-8 pt-6 w-full max-w-lg'>

                <div className='mb-6 text-center'>
                    <h2 className='text-3xl text-center font-bold mb-2'>➕ Add New Book 📗</h2>
                </div>

                <div className="mb-4 text-center">
                    <input value={form.title} className='w-full px-4 py-2 border border-gray-300 rounded' type="text" placeholder='Title' name="title" onChange={handleChange} required />
                </div>

                <div className="mb-4 text-center">
                    <input value={form.author} className='w-full px-4 py-2 border border-gray-300 rounded' type="text" placeholder='Author' name="author" onChange={handleChange} required />
                </div>

                <div className="mb-4 text-center">
                    <select className='w-full px-4 py-2 border border-gray-300 rounded' name="language" id="" onChange={handleChange} value={form.language} >
                        <option >English</option>
                        <option >Hindi</option>
                        <option >Marathi</option>
                    </select>
                </div>

                <div className="mb-4 text-center">
                    <select className='w-full px-4 py-2 border border-gray-300 rounded' name="category" id="" onChange={handleChange} value={form.category} >
                        <option>Fiction</option>
                        <option>Non-fiction</option>
                        <option>Science</option>
                        <option>Biography</option>
                        <option>Technology</option>
                        <option>Other</option>
                    </select>
                </div>

                <div className="mb-4 text-center">
                    <textarea value={form.description} className='w-full px-4 py-2 border border-gray-300 rounded' name="description" placeholder="Description" onChange={handleChange} />
                </div>

                <div className="mb-4 text-center">
                    <input value={form.totalCopies} className='w-full px-4 py-2 border border-gray-300 rounded' type="number" name="totalCopies" placeholder="Total Copies" onChange={handleChange} required />
                </div>

                <div className="mb-4 text-center" >
                    <input value={form.coverImage} className='w-full px-4 py-2 border border-gray-300 rounded' name="coverImage" placeholder="Cover Image URL" onChange={handleChange} />
                </div>

                <div className="mb-6 text-center" >
                    <button className={`w-full cursor-pointer rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 py-3 ${Loading ? 'disabled':''}`} type='submit' >Add Book</button>
                </div>


            </form>

        </div>
    )
}

export default AddBooks