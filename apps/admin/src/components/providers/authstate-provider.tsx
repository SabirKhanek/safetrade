import { apiClient } from "@/api-client";
import {
  LocalStorage,
  PermissionsType,
  UserPayload,
  hasPermission,
} from "common";
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

export type AuthStateProviderState = (
  | {
      user: UserPayload;
      isLoggedIn: true;
    }
  | {
      user: undefined | null;
      isLoggedIn: false;
    }
) & {
  refreshState: () => Promise<UserPayload | void | undefined>;
  hasPermission: (permission: PermissionsType) => boolean;
};

const fetchAuthStateFromLocal = (): Omit<
  AuthStateProviderState,
  "refreshState" | "hasPermission"
> => {
  const token = localStorage.getItem(LocalStorage.SystemUserState);
  if (!token) return { isLoggedIn: false, user: null };
  try {
    const decoded = jwtDecode<UserPayload>(token);
    return { isLoggedIn: true, user: decoded };
  } catch (err: any) {
    return { isLoggedIn: false, user: null };
  }
};

const initialState: AuthStateProviderState = {
  ...(fetchAuthStateFromLocal() as AuthStateProviderState),
  async refreshState() {},
  hasPermission: () => false,
};

const AuthStateProviderContext =
  createContext<AuthStateProviderState>(initialState);

let refreshAuthState: (() => Promise<UserPayload | void | undefined>) | null =
  null;

export const setRefreshAuthState = (
  refreshFunction: () => Promise<UserPayload | void | undefined>
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
    Omit<AuthStateProviderState, "refreshState" | "hasPermission">
  >({ ..._.omit(initialState, ["refreshState", "hasPermission"]) });

  async function handleRefreshState() {
    console.log("Refreshing Auth State");
    const resp = await apiClient.system_auth.getAuthUser({});
    if (resp.status === 200) {
      console.log("Fetched auth state");
      setAuthState({ isLoggedIn: true, user: resp.body.user });
      localStorage.setItem(LocalStorage.SystemUserState, resp.body.token);
      return resp.body.user;
    } else {
      setAuthState({ isLoggedIn: false, user: null });
      localStorage.removeItem(LocalStorage.SystemUserState);
    }
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
      hasPermission: (permission: PermissionsType) =>
        authState.user ? hasPermission(authState.user, permission) : false,
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
