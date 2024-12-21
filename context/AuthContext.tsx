"use client";

import { Models } from "node-appwrite";
import { createContext, useContext } from "react";
import { getCurrentUser } from "@/appwrite/appwrite.server";
import { GitHubProvider } from "./GitHubContext";

export interface AuthContextType {
  isAuth: boolean;
  user: Models.User<Models.Preferences> | null;
}

const defaultState: AuthContextType = {
  isAuth: false,
  user: null,
};

const AuthContext = createContext<AuthContextType>(defaultState);

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
  children: React.ReactNode;
  initialState: AuthContextType;
};

export const AuthProvider = ({ children, initialState }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={initialState}>
      <GitHubProvider>{children}</GitHubProvider>
    </AuthContext.Provider>
  );
};