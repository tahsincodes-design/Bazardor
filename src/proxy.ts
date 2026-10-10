import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    // যে যে পেজগুলো সাইন ইন ছাড়া এক্সেস করা যাবে না
    const protectedRoutes = ["/profile", "/products", "/category"];
    const isProtectedRoute = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (!sessionCookie && isProtectedRoute) {
        const signInUrl = new URL("/signIn", request.url);
        signInUrl.searchParams.set("redirected", "true");
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export default proxy;

export const config = {
    matcher: [
        "/profile/:path*",
        "/products/:path*",
        "/category/:path*"
    ],
};