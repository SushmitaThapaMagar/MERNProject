//Hooks always started from use
//useEffect
//useContext

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import toast from "react-hot-toast";

export const useAuth = () => {
  if (!AuthContext) {
    toast.error("Auth Context must be use within auth provider");
  }
  //import auth context
  //useContext(authcontext)
  return useContext(AuthContext);
};

//rules to remember while working with hooks
//1. hooks must be in react component or custom hooks
//2. hooks cannot be used conditionally
