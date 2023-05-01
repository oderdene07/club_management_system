import { apiClient } from "@/api/apiClient";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "@firebase/auth";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(user
        ? {
            isAuthenticated: true,
            isLoading: false,
            user,
          }
        : {
            isLoading: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({ undefined });

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    const token = localStorage.getItem("token");

    if (token) {
      apiClient.defaults.headers.common["Authorization"] = token;
      const response = await apiClient.get("/member");

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: response?.data,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (email, password) => {
    try {
      await apiClient.post("/login", {
        email,
        password,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err?.response?.data?.message);
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      window.sessionStorage.setItem("authenticated", true);
      localStorage.setItem("token", token);

      apiClient.defaults.headers.common["Authorization"] = token;
      const response = await apiClient.get("/member");

      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: response?.data,
      });
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  };

  const signUp = async (email, first_name, last_name, password) => {
    let response = {};
    try {
      response = await apiClient.post("/register", {
        email,
        first_name,
        last_name,
        password,
      });
    } catch (err) {
      throw new Error(err.response.data.message);
    }
    console.log(response);
  };

  const signOut = () => {
    try {
      window.sessionStorage.removeItem("authenticated");
      window.localStorage.removeItem("token");
    } catch (err) {
      console.error(err);
    }

    apiClient.defaults.headers.common["Authorization"] = null;

    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  };

  const refresh = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      apiClient.defaults.headers.common["Authorization"] = token;
      const response = await apiClient.get("/member");

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: response?.data,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => useContext(AuthContext);
