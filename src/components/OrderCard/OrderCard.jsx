import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deliverOrder, updateOrderStatus } from "../../store/formSlice";
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

  const isDelayed = useCallback(
    (size, minutes) => {
      let isDelayed =
        (size === "Large" && minutes >= 5) ||
        (size === "Medium" && minutes >= 4) ||
        (size === "Small" && minutes >= 3);

      return isDelayed;
    },
    [minutes, order.size]
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
    } else {
      dispatch(deliverOrder(order?.creationTime));
    }
  };

  return (
    <div
      className={`order-card ${isDelayed(order.size, minutes) ? "bg-red" : ""}`}
    >
      <div>Order {order.number}</div>
      <div>{`${order.type}-${order.size}-${order.base}`}</div>
      <div>{timeToStringFormat(hours, minutes, seconds)}</div>
      {
        <CustomButton
          handleClick={handleNext}
          type="button"
          label={order.stage === 4 ? "Mark Delivered" : "Next"}
          className="mt-30"
        />
      }
    </div>
  );
};

export default OrderCard;
