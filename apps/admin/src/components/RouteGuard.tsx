import React from "react";
import { Routes } from "@/app.routes";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "./providers/authstate-provider";
import { PermissionsType } from "common";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface RouteGuardProps {
  requiredPermissions: Set<PermissionsType>;
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({
  requiredPermissions,
  children,
}) => {
  const { isLoggedIn, hasPermission } = useAuthState();
  const location = useLocation();

  if (!isLoggedIn) {
    if (!(location.pathname === Routes.Login)) {
      return <Navigate to={Routes.Login} state={{ from: location }} />;
    }
  }

  const missingPermissions = Array.from(requiredPermissions).filter(
    (permission) => !hasPermission(permission)
  );


  if (missingPermissions.length > 0) {
    return (
      <div className="space-y-4 p-4 pt-6 md:p-8">
        <Alert className="">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Access Denied</AlertTitle>
          <AlertDescription>
            You are missing the following permissions:
            <ul className="ml-6 list-disc [&>li]:mt-2">
              {missingPermissions.map((permission) => (
                <li key={permission}>{permission}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteGuard;
