import React from "react";
import OrderForm from "../../components/OrderForm/OrderForm";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <CustomButton
        handleClick={() => navigate("/dashboard")}
        label="Admin Dashboard"
        className="mb-20 mt-20"
      />
      <OrderForm />
    </>
  );
};

export default Homepage;
