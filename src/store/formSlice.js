import { createSlice } from "@reduxjs/toolkit";
import { makeAtLeastThreeDigits } from "../utils/makeAtLeastThreeDigits";

const setOrdersToLocalStore = (state) => {
  localStorage.setItem("orders", JSON.stringify(state.orders));
};

const setLastOrderNumber = (state) => {
  localStorage.setItem(
    "lastOrderNumber",
    JSON.stringify(state.lastOrderNumber)
  );
};

const setOrdersDelivered = (state) => {
  localStorage.setItem(
    "ordersDelivered",
    JSON.stringify(state.ordersDelivered)
  );
};
const getOrdersFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("orders"));
};
const getLastOrderNumber = () => {
  return JSON.parse(localStorage.getItem("lastOrderNumber"));
};
const getOrdersDelivered = () => {
  return JSON.parse(localStorage.getItem("ordersDelivered"));
};

const initialState = {
  details: {
    type: "",
    size: "",
    base: "",
    creationTime: "",
    currentStageTime: "",
    stage: "",
    number: 0,
  },
  ordersDelivered:getOrdersDelivered()||0,
  lastOrderNumber: getLastOrderNumber() || 0,
  orders: getOrdersFromLocalStorage() || [],
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      state.details = { ...state.details, ...action.payload };
    },
    createOrder: (state, action) => {
      const updatedOrder = {
        ...action.payload,
        number: makeAtLeastThreeDigits(state.lastOrderNumber + 1),
        creationTime: Date.now(),
        stage: 1,
        currentStageTime: Date.now(),
      };
      state.lastOrderNumber = state.lastOrderNumber + 1;
      state.orders = [...state.orders, updatedOrder];
      setOrdersToLocalStore(state);
      setLastOrderNumber(state);
    },
    cancelOrder: (state, action) => {
      state.orders = state.orders.filter((item, index) => {
        return item.creationTime !== action.payload;
      });
      setOrdersToLocalStore(state);
    },
    deliverOrder: (state, action) => {
      state.orders = state.orders.filter((item, index) => {
        return item.creationTime !== action.payload;
      });
      state.ordersDelivered=state.ordersDelivered+1;
      setOrdersToLocalStore(state);
      setOrdersDelivered(state)
    },
    resetForm: (state) => {
      state.details = initialState.details;
    },
    updateOrderStatus: (state, action) => {
      const elementIndex = state.orders.findIndex(
        (order) => order.creationTime === action.payload.creationTime
      );
      const element = {
        ...state.orders[elementIndex],
        stage: action.payload.stage,
        currentStageTime: Date.now(),
      };
      state.orders[elementIndex] = element;
      setOrdersToLocalStore(state);
    },
  },
});

export const {
  updateForm,
  resetForm,
  createOrder,
  cancelOrder,
  updateOrderStatus,
  deliverOrder
} = formSlice.actions;

export default formSlice.reducer;
