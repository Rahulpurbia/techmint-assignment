import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../../store/formSlice";
import useTimer from "../../customHooks/useTimer";
import CustomButton from "../CustomButton/CustomButton";
import "./OrderCard.css";
import { timeToStringFormat } from "../../utils/formatTime";

export const getSecondsElapsed = (milliseconds) =>
  Math.floor((Date.now() - milliseconds) / 1000);

const OrderCard = ({ order }) => {
  const dispatch = useDispatch();
  const { hours, minutes, seconds } = useTimer(
    getSecondsElapsed(order.currentStageTime)
  );

  const handleNext = () => {
    const currentStage = order.stage;

    if (currentStage >= 1 && currentStage !== 4) {
      dispatch(
        updateOrderStatus({
          creationTime: order?.creationTime,
          stage: currentStage + 1,
        })
      );
    }
  };

  return (
    <div className={`order-card ${minutes >= 3 ? "bg-red" : ""}`}>
      <div>{order.number}</div>
      <div>{`${order.type}-${order.size}-${order.base}`}</div>
      <div>{timeToStringFormat(hours, minutes, seconds)}</div>
      {order?.stage != 4 && (
        <CustomButton
          handleClick={handleNext}
          type="button"
          label="Next"
          className="mt-30"
        />
      )}
    </div>
  );
};

export default OrderCard;
