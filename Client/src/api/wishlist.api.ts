import api from "./index";
// get wishlist
export const getWishList = async () => {
  try {
    const response = await api.get("/wishlist");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//add to wishlist
export const addtoWishList = async (productId: string) => {
  try {
    const response = await api.post("/wishlist", { productId });
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
