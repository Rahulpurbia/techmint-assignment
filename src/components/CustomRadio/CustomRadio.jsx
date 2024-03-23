import React from "react";
import "./CustomRadio.css";

const CustomRadio = ({ label, name, options = [], handleChange, value }) => {
  return (
    <div>
      <div className="radio-label">{label}</div>
      <div className="radio-options">
        {options.map((option, index) => {
          return (
            <label key={index} className="radio-option">
              <input
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={handleChange}
              />
              <span> {option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CustomRadio;
