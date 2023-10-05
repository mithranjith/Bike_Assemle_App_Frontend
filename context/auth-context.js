import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { GetUser } from "@/services/api.service";
const AuthContext = React.createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    uid: "",
    token: "",
    user: {},
  });
  const [userLoading, setUserLoading] = useState(true);
  const router = useRouter();
  const setUserAuthInfo = (user) => {
    if (user.user.isAdmin) router.push("/admin/dashboard");
    else if (window.location.pathname == "/sign-in") router.push("/");
    else router.push(window.location.pathname);
    setAuthState(user);
    setUserLoading(false);
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) getUser(token);
    else Router.push("/sign-in");
  }, []);

  const getUser = async (token) => {
    let result;
    setUserLoading(true);
    try {
      result = await GetUser(token);
    } catch (e) {
      setUserLoading(false);
      return console.log(e);
    }
    if (result.success) {
      let user = {
        token: token,
        user: result.user,
      };
      setUserLoading(false);
      setUserAuthInfo(user);
    }
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    if (!authState.user._id) {
      return false;
    } else return true;
  };
  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      uid: "",
      token: "",
      user: {},
    });
    return Router.push("/sign-in");
  };
  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
        logout,
        getUser,
        userLoading,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
