import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "../../store/formSlice";
import useTimer from "../../customHooks/useTimer";
import { getSecondsElapsed } from "../OrderCard/OrderCard";
import CustomButton from "../CustomButton/CustomButton";
import { timeToStringFormat } from "../../utils/formatTime";

const DashboardTable = () => {
  const { orders } = useSelector((state) => state.form);

  return (
    <div>
      <h2>Main Section</h2>
      <table className="w-100 text-center min-height-300">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Stage</th>
            <th>Total time spent (time from order placed)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <TableRow order={order} key={order.creationTime} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;

const TableRow = ({ order }) => {
  const dispatch = useDispatch();
  const handleCancel = () => {
    alert(`This item will be cancelled with order number ${order.number}`);
    dispatch(cancelOrder(order.creationTime));
  };
  const { hours, minutes, seconds } = useTimer(
    getSecondsElapsed(order.creationTime)
  );

  const stages = [
    "Order Placed",
    "Order Making",
    "Order Ready",
    "Order Picked",
  ];
  return (
    <tr>
      <td>{order.number}</td>
      <td>{stages[Number(order.stage) - 1]}</td>
      <td>{timeToStringFormat(hours, minutes, seconds)}</td>
      <td>
        {order.stage <= 2 && (
          <CustomButton
            handleClick={handleCancel}
            type="button"
            label="Cancel"
            vairant="danger"
          />
        )}
      </td>
    </tr>
  );
};
