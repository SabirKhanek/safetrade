import { lazy, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { Permissions, PermissionsType } from "common";
import RouteGuard from "./components/RouteGuard";
import { Loading } from "./components/loading";

export enum Routes {
  Home = "/",
  Login = "/login",
  NotFound = "/not-found",
  UserControl = "/user-control",
  AuditLogs = "/audit-logs",
  AccessControl = "/accesss-ctrl",
  UserAccessControl = Routes.AccessControl + "/user/:userId",
}

export const exemptLayoutRoutes = new Set<Routes>([
  Routes.Login,
  Routes.NotFound,
]);

export const exemptAuthProtectionRoutes = new Set<Routes>([Routes.Login]);

export const routePermissions: Record<Routes, Set<PermissionsType>> = {
  [Routes.Home]: new Set([]),
  [Routes.Login]: new Set([]),
  [Routes.UserAccessControl]: new Set([
    Permissions.ReadUserPermissions,
    Permissions.UpdateUserPermissions,
  ]),
  [Routes.AccessControl]: new Set([
    Permissions.ReadGroupPermissions,
    Permissions.UpdateGroupPermissions,
  ]),
  [Routes.NotFound]: new Set([]),
  [Routes.AuditLogs]: new Set([Permissions.ReadAuditTrails]),
  [Routes.UserControl]: new Set([Permissions.ListUsers, Permissions.AddUsers]),
};

export const buildRouteObject = (routes: RouteObject[]): RouteObject[] => {
  return routes.map((r) => ({
    path: r.path,
    element: (
      <Suspense fallback={<Loading></Loading>}>
        <RouteGuard
          requiredPermissions={
            routePermissions[r.path as Routes] || new Set([])
          }
        >
          {r.element}
        </RouteGuard>
      </Suspense>
    ),
  }));
};
function loadable(
  importFunc: () => Promise<any>,
  selector: (module: any) => any
) {
  return lazy(() =>
    importFunc().then((module) => ({
      default: selector(module),
    }))
  );
}
// Dynamically import pages
const HomePage = loadable(
  () => import("./pages"),
  (module) => module.HomePage
);
const Login = loadable(
  () => import("./pages/login"),
  (module) => module.Login
);
const NotFound = loadable(
  () => import("./pages/not-found"),
  (module) => module.NotFound
);
const ManageUsersPage = loadable(
  () => import("./pages/user-control/manage-users"),
  (module) => module.ManageUsersPage
);
const AuditLogsPage = loadable(
  () => import("./pages/audit/audit-logs"),
  (module) => module.AuditLogsPage
);
const AccessControlPage = loadable(
  () => import("./pages/access-control"),
  (module) => module.AccessControlPage
);

export const routesConfig: RouteObject[] = buildRouteObject([
  { path: Routes.Home, element: <HomePage /> },
  { path: Routes.Login, element: <Login /> },
  { path: Routes.NotFound, element: <NotFound /> },
  { path: Routes.UserControl, element: <ManageUsersPage /> },
  { path: Routes.AuditLogs, element: <AuditLogsPage /> },
  { path: Routes.AccessControl, element: <AccessControlPage /> },
  { path: "*", element: <Navigate to={Routes.NotFound} replace /> },
]);
