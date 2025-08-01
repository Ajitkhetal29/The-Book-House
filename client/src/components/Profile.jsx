import React from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Profile = () => {
  const { isLoading, user , deleteUser} = useContext(AppContext);


  return (
    <div className="flex-1 mt-15 p-2 justify-center flex bg-green-50  w-full ">
      {isLoading && (
        <p className="text-2xl text-center font-bold ">Loading..</p>
      )}

      {user ? (
        <div className="flex flex-col items-center">
          <h2 className="text-3xl text-center border-b font-bold mb-2 pb-2">
            User Profile 🧑‍💼
          </h2>

          <div className="flex px-20 rounded bg-white flex-col  p-5 ">
            <p >
              <strong>Name : </strong>
              {user.name}
            </p>
            <p className="mt-1">
              <strong>Email : </strong>
              {user.email}
            </p>
            <p className="mt-1">
              <strong>Role : </strong>
              {user.role}
            </p>
            <p className="mt-1">
              <strong>Registeration date : </strong>
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
            {user.role === "user" && (
              <div>
                <p className="mt-1">
                  <strong>Burrowed Books : </strong>
                  {user.books.length}
                </p>
                <p className="mt-1">
                  <strong>Books History : </strong>
                  {user.history.length}
                </p>
                <p className="mt-1">
                  <strong>Fine : </strong>
                  {user.fine} Rs
                </p>

                <div className="flex w-full items-center justify-center gap-3" >
                  <button className="mt-2 py-1 font-semibold px-2 rounded bg-green-600 cursor-pointer text-white">
                    Pay Fine
                  </button>
                  <button onClick={deleteUser} className="mt-2 py-1 px-2 font-semibold rounded bg-red-500 cursor-pointer text-white">
                   Delete Profile
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>No user found</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
