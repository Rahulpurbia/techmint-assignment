import React from "react";
import StagesSection from "../../components/StagesSection/StagesSection";
import DashboardTable from "../../components/DashboardTable/DashboardTable";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <CustomButton
        handleClick={() => navigate("/", { replace: true })}
        className="mb-20 mt-20"
        label="Go Back"
      />
      <StagesSection />
      <DashboardTable />
    </>
  );
};

export default AdminDashboard;
