import React, { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const AdminDashboard = () => {
  const { isLoading, navigate, dashboradDetails, setOverallDetails } =
    useContext(AppContext);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    setOverallDetails()
  }, []);

  return (
    <>
      {isLoading && (
        <p className="text-2xl text-center font-bold ">Loading..</p>
      )}

      {dashboradDetails ? (
        <div className="flex-1 bg-[url('/images/dashboard_bg.jpg')] bg-cover bg-center  shadow-md rounded-lg p-6 bg-green-50 min-h-full">
          <h2 className="text-3xl flex justify-center font-bold mb-6">
            Welcome Admin 👋
          </h2>
          {dashboradDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Total Books"
                value={dashboradDetails.totalBooksCount}
                bg="bg-blue-100"
              />
              <StatCard
                title="Borrowed Books"
                value={dashboradDetails.burrowdBooksCount}
                bg="bg-yellow-100"
              />
              <StatCard
                title="Available Books"
                value={dashboradDetails.availableBooksCount}
                bg="bg-green-100"
              />
              <StatCard
                title="Total Users"
                value={dashboradDetails.totalUsersCount}
                bg="bg-purple-100"
              />
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const StatCard = ({ title, value, bg }) => (
  <div className={`${bg} p-4 rounded-xl shadow`}>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-3xl">{value}</p>
  </div>
);

export default AdminDashboard;
