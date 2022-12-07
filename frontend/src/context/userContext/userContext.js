import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { UserReducer } from "./userReducer";
const userContext = createContext();
export const useUser = () => {
  return useContext(userContext);
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, {
    user: JSON.parse(localStorage.getItem("user") || null) || [],
    // likedVideos: [],
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuth, setIsAuth] = useState(
    JSON.parse(localStorage.getItem("isAuth")) || false
  );

  return (
    <userContext.Provider
      value={{
        state,
        dispatch,
        token,
        setToken,
        isAuth,
        setIsAuth,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
