import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Preload the target route as soon as the user hovers/taps a link,
    // so navigating to /grupo is instant.
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  return router;
};
