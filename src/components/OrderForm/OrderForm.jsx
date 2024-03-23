import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateForm, createOrder, resetForm } from "../../store/formSlice";
import CustomRadio from "../CustomRadio/CustomRadio";
import CustomButton from "../CustomButton/CustomButton";
import "../../styles/Dashboard.css";
import "./OrderForm.css";
import { useNavigate } from "react-router-dom";

const OrderForm = () => {
  const dispatch = useDispatch();
  const {
    details: { type, size, base },
    orders,
  } = useSelector((state) => state.form);
  const navigate=useNavigate()

  const handleChange = (e) => {
    dispatch(updateForm({ [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        type,
        size,
        base,
      })
    );
    dispatch(resetForm());
    alert("Order Created Successfully")
    navigate('/dashboard')
  };

  const diableBtn = !size | !type | !base;

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h1 className="text-center mb-20">Create Order</h1>
        <CustomRadio
          label={"Types"}
          name="type"
          options={["Veg", "Non-Veg"]}
          handleChange={handleChange}
          value={type}
        />
        <CustomRadio
          label={"Size"}
          name="size"
          options={["Large", "Medium", "Small"]}
          handleChange={handleChange}
          value={size}
        />
        <CustomRadio
          label={"Base"}
          name="base"
          options={["Thin", "Thick"]}
          handleChange={handleChange}
          value={base}
        />
        <CustomButton disabled={diableBtn} label="Create Order" />
      </form>
    </>
  );
};

export default OrderForm;
