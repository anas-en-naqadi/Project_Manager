import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { router } from "../router";

export const usePageTitle = () => {
  const location = useLocation();
  console.log(router.routes)
  useEffect(() => {
    const findTitle = (routes: any[], pathname: string): string | undefined => {
      for (const route of routes) {
        if (route.path === pathname) {
          return route.meta?.title;
        }
        if (route.children) {
          const childTitle = findTitle(route.children, pathname);
          if (childTitle) return childTitle;
        }
      }
      return undefined;
    };

    const title = findTitle(router.routes, location.pathname) || "Default Title"; // Fallback title
    document.title = title;
  }, [location]);
};
