"use client";
import { apiClient } from "@/api-client";
import { LocalStorage, PublicUserPayload } from "common";
import _ from "lodash";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";

export type AuthStateProviderState = (
  | {
      user: PublicUserPayload;
      isLoggedIn: true;
    }
  | {
      user: undefined | null;
      isLoggedIn: false;
    }
) & {
  refreshState: () => Promise<PublicUserPayload | void | undefined>;
};

const fetchAuthStateFromLocal = (): Omit<
  AuthStateProviderState,
  "refreshState" | "hasPermission"
> => {
  if (typeof localStorage === "undefined")
    return { isLoggedIn: false, user: null };
  const token = localStorage.getItem(LocalStorage.UserState);
  if (!token) return { isLoggedIn: false, user: null };
  try {
    const decoded = jwtDecode<PublicUserPayload>(token);
    return { isLoggedIn: true, user: decoded };
  } catch (err: any) {
    return { isLoggedIn: false, user: null };
  }
};

const initialState: AuthStateProviderState = {
  ...(fetchAuthStateFromLocal() as AuthStateProviderState),
  async refreshState() {},
};

const AuthStateProviderContext =
  createContext<AuthStateProviderState>(initialState);

let refreshAuthState:
  | (() => Promise<PublicUserPayload | void | undefined>)
  | null = null;

export const setRefreshAuthState = (
  refreshFunction: () => Promise<PublicUserPayload | void | undefined>
) => {
  refreshAuthState = refreshFunction;
};

export const getRefreshAuthState = () => {
  if (!refreshAuthState) {
    throw new Error("refreshAuthState function is not set.");
  }
  return refreshAuthState;
};

export function AuthStateProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<
    Omit<AuthStateProviderState, "refreshState">
  >({ ..._.omit(initialState, ["refreshState"]) });

  async function handleRefreshState() {
    console.log("Refreshing Auth State");
    try {
      const resp = await apiClient.auth.me({});
      if (resp.status === 200) {
        console.log("Fetched auth state");
        setAuthState({ isLoggedIn: true, user: resp.body });
        localStorage.setItem(LocalStorage.UserState, JSON.stringify(resp.body));
        return resp.body;
      } else {
        setAuthState({ isLoggedIn: false, user: null });
        localStorage.removeItem(LocalStorage.UserState);
      }
    } catch (err: any) {}
  }

  useEffect(() => {
    handleRefreshState();
    setRefreshAuthState(handleRefreshState);
  }, []);

  const value: AuthStateProviderState = useMemo(() => {
    return {
      user: authState.user,
      isLoggedIn: authState.isLoggedIn,
      refreshState: handleRefreshState,
    } as AuthStateProviderState;
  }, [authState]);

  return (
    <AuthStateProviderContext.Provider value={value}>
      {children}
    </AuthStateProviderContext.Provider>
  );
}

export const useAuthState = () => {
  const context = useContext(AuthStateProviderContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within an AuthStateProvider");
  }
  return context;
};

export function RouteOnLogout() {
  const loc = usePathname();
  const authState = useAuthState();
  const router = useRouter();
  useEffect(() => {
    if (authState.isLoggedIn === false) {
      router.replace("/login");
    }
  }, [authState.isLoggedIn]);
  return <></>;
}

export function RouteOnLogin() {
  const loc = usePathname();
  const authState = useAuthState();
  const router = useRouter();
  useEffect(() => {
    if (authState.isLoggedIn === true) {
      router.replace("/dashboard");
    }
  }, [authState.isLoggedIn]);
  return <></>;
}
