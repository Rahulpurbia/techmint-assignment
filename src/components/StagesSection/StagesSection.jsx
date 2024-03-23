import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import OrderCard from "../OrderCard/OrderCard";

const StagesSection = () => {
  const { orders } = useSelector((state) => state.form);

  const getOrderList = (stage) => {
    const unsortedOrdersForStage = orders.filter(
      (order) => order.stage === stage
    );
    unsortedOrdersForStage.sort((a, b) => {
      console.log(a, b);
      return b.currentStageTime - a.currentStageTime;
    });
    return unsortedOrdersForStage;
  };
  const orderList = useMemo(() => {
    return {
      placed: getOrderList(1),
      making: getOrderList(2),
      ready: getOrderList(3),
      picked: getOrderList(4),
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
