import React from "react";
import "./CustomButton.css";

const CustomButton = ({
  type = "submit",
  handleClick = () => {},
  label = "Submit",
  className = "",
  disabled = false,
  vairant = "success",
}) => {
  return (
    <button
      className={`custom-button ${className} ${disabled ? "disabled-btn" : ""}`}
      disabled={disabled}
      type={type}
      onClick={handleClick}
      style={vairant === "danger" ? { backgroundColor: "red" } : {}}
    >
      {label}
    </button>
  );
};

export default CustomButton;
