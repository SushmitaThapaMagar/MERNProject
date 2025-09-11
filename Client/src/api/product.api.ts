import api from "./index";

// post product

export const create_product = async (data: FormData) => {
  console.log(data);
  try {
    const response = await api.post("/product", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//get featured
export const getFeaturedProducts = async () => {
  try {
    const response = await api.get("/product/featured");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//getallpordutcs
export const getAllProducts = async () => {
  try {
    const response = await api.get("/product");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//* get by id
export const getProductById = async (id: string) => {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//get most sales
// export const mostSale = async () => {
//   try {
//   } catch (error) {}
// };

//get summer sales
// export const summerSale = async () => {
//   try {
//   } catch (error) {}
// };
