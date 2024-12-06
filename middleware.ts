import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(); // No `publicRoutes` directly here

export const config = {
  matcher: [
    "/",                     // Public route
    "/api/webhooks/clerk",   // Public route
    "/api/webhooks/stripe",  // Public route
    "/(api|trpc)(.*)",       // All API and tRPC routes
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
