import type { IBrand } from "../types/brand.types";
import api from "./index";

//post category
export const createBrand = async (data: IBrand) => {
  try {
    const response = await api.post("/brand", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
