import React from "react";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import ConnectedFavoritesPage from "../../../Components/Pages/Dashboard/Favorites";

const FavoritesPage = () => {
  return (
    <div>
      <DashboardLayout>
        <ConnectedFavoritesPage />
      </DashboardLayout>
    </div>
  );
};

export default FavoritesPage;
