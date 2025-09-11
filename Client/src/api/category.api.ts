import type { ICategory } from "../types/category.types";
import api from "./index";

// get all category
export const getAllCategory = async () => {
  try {
    const response = await api.get("/category");
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//post category
export const createCategory = async (data: ICategory) => {
  try {
    const response = await api.post("/category", data);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
