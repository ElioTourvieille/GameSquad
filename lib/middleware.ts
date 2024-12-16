import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    nextjsMiddlewareRedirect,
  } from "@convex-dev/auth/nextjs/server";
   
  const isSignInPage = createRouteMatcher(["/signin"]);
  const isProtectedRoute = createRouteMatcher(["/user(.*)"]);
  const isHomePage = createRouteMatcher(["/"]);
   
  export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
    if (isHomePage(request) && (await convexAuth.isAuthenticated())) {
      console.log("Utilisateur authentifié sur /, redirection vers /user");
      return nextjsMiddlewareRedirect(request, "/user");
    }
    if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
      return nextjsMiddlewareRedirect(request, "/user");
    }
    if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
      return nextjsMiddlewareRedirect(request, "/signin");
    }
  });
   
  export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  };