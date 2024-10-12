import { createContext } from "react";
import { useContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  usertype:null,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () =>{
    return useContext(AuthContext);
}



