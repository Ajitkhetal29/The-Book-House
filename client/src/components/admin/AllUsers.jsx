import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";

const AllUsers = () => {
  const { getAllUsers, isLoading, allUsers } = useContext(AppContext);

  console.log("allUsers", allUsers);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <div className="mt-6 bg-[url('/images/profile_bg.png')] bg-contain bg-center flex w-full justify-center bg-green-50">
        {isLoading && <p>Loading..</p>}

        {allUsers.length > 0 ? (
          <div className="flex  flex-col items-center ">
           <h2 className="text-3xl  border-b  font-bold mb-2 pb-2">All Users 🙎‍♂️</h2>
            {allUsers.map((user) => (
              <div key={user._id} className="flex m-1 justify-between bg-white p-5 border-b rounded w-[600px]">
                <div className="flex flex-col gap-1">
                  <h4> <strong>Name : </strong>{user.name}</h4>
                  <h6><strong>Email : </strong>{user.email}</h6>
                  <h6><strong>Sign in Date : </strong>{new Date(user.createdAt).toLocaleDateString()}</h6>
                </div>

                <div className="flex flex-col gap-1">
                    <p><strong>Burrowed Books : </strong>{user.books.length}</p>
                    <p><strong>Books History : </strong>{user.history.length}</p>
                </div>

                <div className="flex flex-col gap-1">
                    <p><strong>Fine Pending : </strong>{user.fine} Rs.</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>No such User</p>
          </div>
        )}
      </div>
    </>
  );
};

export default AllUsers;
