import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { logout, user } = useContext(AppContext);

  const [isDropDown, setIsDropDown] = useState(false);

  return (
    <>
      <div className="flex fixed w-full items-center justify-between h-[60px] px-4 bg-gray-800 text-white shadow-md ">
        <div className="flex items-center cursor-pointer m-2 ">
          <NavLink to={user.role === "user" ? "/user" : "/admin"}>
            <img
              src="/images/logo.jpg"
              alt=""
              className="w-12 h-12 object-contain"
            />
          </NavLink>
        </div>
        <div className="flex  items-center">
          <p className="font-bold">THE BOOK HOUSE</p>
        </div>
        {user.role === "user" && (
          <div className="flex items-center gap-4 m-2 cursor-pointer">

            <NavLink to="user/burrowedBook" className={({ isActive }) =>
              ` ${isActive && 'border-b border-blue'
              }`}>
              <span>Burrowd Books</span>
            </NavLink>

            <NavLink to="user/wishlist" className={({ isActive }) =>
              ` ${isActive && 'border-b border-blue'
              }`}><span>WishList</span>
              </NavLink>

            <NavLink to="user/bookHistory" className={({ isActive }) =>
              ` ${isActive && 'border-b border-blue'
              }`}><span  >Book History</span></NavLink>

            <NavLink to="user/notification" className={({ isActive }) =>
              ` ${isActive && 'border-b border-blue'
              }`}><span  >Notification</span></NavLink>

            <img
              src="/images/profile.png"
              alt=""
              className="w-10 h-12 object-contain"
              onClick={() => setIsDropDown(!isDropDown)}
            />
          </div>
        )}
        {user.role === "admin" && (
          <div className="flex items-center gap-4 m-2 cursor-pointer">
            <NavLink className={({ isActive }) =>
              ` ${isActive && 'border-b border-blue'
              }`} to="admin/allBooks">
              <span>All Books</span>
            </NavLink>
            <NavLink className={({ isActive }) =>
              ` ${isActive && 'border-b border-blue'
              }`} to="admin/BurrowedBooks">
              <span>Books Borrowed</span>
            </NavLink>
            <NavLink className={({ isActive }) =>
              ` ${isActive && 'border-b border-blue'
              }`} to="admin/addBooks">
              <span>Add Books</span>
            </NavLink>
            <NavLink className={({ isActive }) =>
              ` ${isActive && 'border-b border-blue'
              }`} to="/admin/allUsers">
              <span>All Users</span>
            </NavLink>
            <img
              src="/images/profile.png"
              alt=""
              className="w-10 h-12 object-contain"
              onClick={() => setIsDropDown(!isDropDown)}
            />
          </div>
        )}

        {isDropDown && (
          <div className="absolute px-4 right-1 top-15 bg-gray-800 text-white cursor-pointer">
            <ul>
              <NavLink className={({ isActive }) =>
              ` ${isActive && 'border-b border-blue'
              }`} to="/profile">
                <li 
                  onClick={() => {
                  setIsDropDown(false);
                }}>Profile</li>
              </NavLink>
              <li
                onClick={() => {
                  setIsDropDown(false);
                  logout();
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
