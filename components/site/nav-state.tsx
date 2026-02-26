"use client";

import { createContext, useContext } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

type NavState = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const NavStateContext = createContext<NavState | null>(null);

type NavStateProviderProps = NavState & {
  children: ReactNode;
};

export function NavStateProvider({ children, menuOpen, setMenuOpen }: NavStateProviderProps) {
  return (
    <NavStateContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </NavStateContext.Provider>
  );
}

export function useNavState() {
  const context = useContext(NavStateContext);
  if (!context) {
    throw new Error("useNavState must be used within NavStateProvider.");
  }

  return context;
}
