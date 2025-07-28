// /* eslint-disable @typescript-eslint/no-explicit-any */

// import type { ILogin, IRegister } from "../../types/auth.types";

// export const login = async (data: ILogin) => {
//   try {
//     const response = await api.post("/auth/login", data);

//     return response.data.data;
//   } catch (error: any) {
//     throw error.data;
//   }
// };

// export const register = async (data: Omit<IRegister, "confirm_password">) => {
//   try {
//     const response = await api.post("/auth/register", data);
//     return response.data.data;
//   } catch (error: any) {
//     throw error.data;
//   }
// };
