import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl


  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName:
        process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
    })


    const publicRoutes = ["/login"]
    const isPublicRoute = publicRoutes.includes(pathname)


    if (token && pathname === "/login") {
      console.log("✅ Usuario autenticado intentando acceder a /login, redirigiendo a /")
      return NextResponse.redirect(new URL("/", request.url))
    }

    if (!token && !isPublicRoute) {
      console.log("❌ Usuario NO autenticado intentando acceder a ruta protegida, redirigiendo a /login")
      return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("💥 Error en middleware:", error)
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}
