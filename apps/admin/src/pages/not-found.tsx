/**
 * v0 by Vercel.
 * @see https://v0.dev/t/X17FXoWcNDF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { Routes } from "@/app.routes";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-foreground">Page not found</p>
      <p className="my-4 text-foreground/60">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link to={Routes.Home} className="mt-6 text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  );
}
