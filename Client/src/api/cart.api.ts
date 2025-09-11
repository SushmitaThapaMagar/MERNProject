/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./index";

//* get cart
export const getCart = async () => {
  try {
    const response = await api.get("/cart");

    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};

// * add to cart
export const addToCart = async (data: {
  productId: string;
  quantity: number;
}) => {
  try {
    const response = await api.post("/cart", data);

    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
