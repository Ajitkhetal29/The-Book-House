import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BackendUrl;
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [allBooks, setAllBooks] = useState([]);
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userBooks, setUserBooks] = useState([]);
  const [userBookHistory, setUserBookHistory] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [burrowdBooks, setBurrowedBooks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [dashboradDetails, setDashboradDetails] = useState([]);
  const [userNotification, setUserNotification] = useState([]);

  const logout = async () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setUser("");
    toast.success("Logout Succefull", { autoClose: 2000 });
  };

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/user/register`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        await getUserDetails();
        if (response.data.user.role === "user") {
          navigate("/user");
        } else if (response.data.user.role === "admin") {
          navigate("/admin");
        }
        toast.success(response.data.message, { autoClose: 2000 });
      } else {
        toast.error(response.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/user/login`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        await getUserDetails();

        if (response.data.user.role === "user") {
          navigate("/user");
        } else if (response.data.user.role === "admin") {
          navigate("/admin");
        }

        toast.success(response.data.message, { autoClose: 2000 });
      } else {
        toast.error(response.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/userDetails`, {
        headers: { token: localStorage.getItem("token") },
      });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/book/allBooks`, {
        headers: { token: localStorage.getItem("token") },
      });
      if (response.data.success) {
        setAllBooks(response.data.books);
      } else {
        toast.error(response.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
    setIsLoading(false);
  };

  const addBook = async (form) => {
    try {
      const response = await axios.post(`${backendUrl}/book/addBook`, form, {
        headers: { token: localStorage.getItem("token") },
      });

      if (response.data.success) {
       await getAllBooks();
        navigate("/admin/allBooks");
        toast.success(response.data.message, { autoClose: 2000 });
      } else {
        toast.error(response.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message, { autoClose: 2000 });
    }
  };

  const getUserBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/book/userBurrowedBooks`, {
        headers: { token: localStorage.getItem("token") },
      });

      if (response.data.success) {
        setUserBooks(response.data.userBurrowedBooks);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getBook = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/book/getbook/${id}`);
      if (response.data.success) {
        setBook(response.data.book);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const burrowBook = async (bookId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/book/burrowBook/${bookId}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 2000 });
        await getUserDetails();
        await getAllBooks();
        await getUserBooks();
        await getUserWishlist();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, { autoClose: 2000 });
    }
  };

  const returnBook = async (bookId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/book/returnBook/${bookId}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 2000 });
        await getUserDetails();
        await getAllBooks();
        await getUserBooks();
      } else {
        toast.error(response.data.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message, { autoClose: 2000 });
    }
  };

  const getBookHistory = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${backendUrl}/book/bookHistory`, {
        headers: { token: localStorage.getItem("token") },
      });

      if (response.data.success) {
        setUserBookHistory(response.data.bookHistory);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const addToWishlist = async (bookId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/user/addToWishlist/${bookId}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 3000 });
        await getUserWishlist();
        navigate("/user/wishlist");
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserWishlist = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/userWishlist`, {
        headers: { token: localStorage.getItem("token") },
      });

      if (response.data.success) {
        setWishlist(response.data.userWishlist);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (bookId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/user/removeFromWishlist/${bookId}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getUserWishlist();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateBookDetails = async (bookId, form) => {
    try {
      const response = await axios.post(
        `${backendUrl}/book/updateBook/${bookId}`,
        form,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getAllBooks();
        getBook(bookId);
        navigate(`/book/${bookId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/book/deleteBook/${bookId}`,
        {},
        {
          headers: { token: localStorage.getItem("token") },
        }
      );

      if (response.data.success) {
        await getAllBooks();
        toast.success(response.data.message, { autoClose: 3000 });
        navigate("/admin/allBooks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBurrowedBook = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${backendUrl}/user/getBurrowedBook`, {
        headers: { token: localStorage.getItem("token") },
      });

      if (response.data.success) {
        console.log("burrowed book", response.data.burrowedBooks);
        setBurrowedBooks(response.data.burrowedBooks);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/user/allUsers`, {
        headers: { token: localStorage.getItem("token") },
      });

      if (response.data.success) {
        setAllUsers(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const setOverallDetails = async () => {
    setIsLoading(true);
    setDashboradDetails({
      totalBooksCount: allBooks.length,
      burrowdBooksCount: burrowdBooks.length,
      availableBooksCount: allBooks.filter((book) => book.isAvailable === true)
        .length,
      totalUsersCount: allUsers.length,
      fine: allUsers.reduce((count, user) => {
        if (user.fine > 0) {
          count += user.fine;
        }
        return count;
      }, 0),
    });
    setIsLoading(false);
  };

  const deleteUser = async () => {
    try {
      const response = await axios.post(`${backendUrl}/user/deleteUser`, {}, {
        headers: { token: localStorage.getItem('token') }
      })
      if (response.data.success) {
        toast.success(response.data.message);
        logout()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, { autoClose: 2000 });
    }
  }

  const getNotifications = async (req, res) => {
    setIsLoading(true)
    try {
      const response =await axios.get(`${backendUrl}/user/notification`, {
        headers: { token: localStorage.getItem('token') }
      });
      
      if (response.data.success) {
        setUserNotification(response.data.notifications)
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, { autoClose: 2000 });
    }
    setIsLoading(false)

  }

  useEffect(() => {
    if (user.role === "user") {
      getUserBooks();
      getNotifications()
    }
    if (user.role === "admin") {
      getAllUsers();
      getBurrowedBook();
    }
    getUserDetails();
    getAllBooks();
  }, []);

  useEffect(() => {
    if (user.role === 'admin') {
      if (
        allBooks.length > 0 &&
        allUsers.length > 0 &&
        burrowdBooks.length >= 0
      ) {
        setOverallDetails();
      }
    }
  }, [allBooks, allUsers, burrowdBooks]);

  const value = {
    backendUrl,
    setUser,
    setToken,
    navigate,
    user,
    logout,
    getAllBooks,
    allBooks,
    isLoading,
    signup,
    login,
    addBook,
    userBooks,
    getUserBooks,
    setUserBooks,
    getBook,
    book,
    burrowBook,
    getUserDetails,
    returnBook,
    getBookHistory,
    userBookHistory,
    addToWishlist,
    wishlist,
    getUserWishlist,
    removeFromWishlist,
    updateBookDetails,
    deleteBook,
    getBurrowedBook,
    burrowdBooks,
    getAllUsers,
    allUsers,
    setOverallDetails,
    dashboradDetails,
    deleteUser,
    userNotification,
    getNotifications
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
