import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import "./App.css";
import {
  Routes,
  exemptAuthProtectionRoutes,
  exemptLayoutRoutes,
  routesConfig,
} from "./app.routes";
import { useAuthState } from "./components/providers/authstate-provider";
import { useEffect, useMemo } from "react";
import { DashboardLayout } from "./components/layout/DashboardLayout";
function App() {
  const routes = useRoutes(routesConfig);
  const authState = useAuthState();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const isExemptLayoutRoute = useMemo(() => {
    return exemptLayoutRoutes.has(pathname as Routes);
  }, [pathname]);

  useEffect(() => {
    if (!authState.isLoggedIn) {
      if (!exemptAuthProtectionRoutes.has(pathname as Routes))
        navigate(Routes.Login);
    } else {
      if (pathname === Routes.Login) {
        navigate(Routes.Home);
      }
    }
  }, [authState.isLoggedIn]);
  if (isExemptLayoutRoute) {
    return <>{routes}</>;
  } else {
    return <DashboardLayout>{routes}</DashboardLayout>;
  }
}

export default App;
