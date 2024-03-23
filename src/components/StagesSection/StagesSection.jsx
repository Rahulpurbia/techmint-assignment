import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import OrderCard from "../OrderCard/OrderCard";

const StagesSection = () => {
  const { orders } = useSelector((state) => state.form);
  const orderList = useMemo(() => {
    return {
      placed: orders.filter((order) => order.stage === 1),
      making: orders.filter((order) => order.stage === 2),
      ready: orders.filter((order) => order.stage === 3),
      picked: orders.filter((order) => order.stage === 4),
    };
  }, [orders]);
  return (
    <>
      <h2 className="mb-10">Stage Section</h2>
      <div className="dashboard-container min-height-300">
        {Object.entries(orderList).map((stageArr) => {
          return (
            <div className="text-center" key={stageArr[0]}>
              <h3 className="capitalize">{stageArr[0]} Orders</h3>
              <div className="px-10">
                {stageArr[1].map((order) => {
                  return <OrderCard key={order.creationTime} order={order} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StagesSection;
