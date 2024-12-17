"use client";

import { Models } from "node-appwrite";
import { createContext, useContext } from "react";
import { getCurrentUser } from "@/appwrite/appwrite.server";

const defaultState: AuthContextType = {
  isAuth: false,
  user: null,
};

const AuthContext = createContext<AuthContextType>(defaultState);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children, initialState }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={initialState}>
      {children}
    </AuthContext.Provider>
  );
};

export type AuthContextType = {
  isAuth: boolean;
  user: Models.User<Models.Preferences> | null;
};

type AuthProviderProps = {
  children: React.ReactNode;
  initialState: AuthContextType;
};
