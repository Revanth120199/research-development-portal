import { auth } from "@/auth"
import { NextResponse } from "next/server"

const protectedPrefixes = ["/dashboard", "/projects", "/research", "/reports", "/team", "/settings"]
const publicRoutes = ["/login"]

export default auth((req) => {
  const session = req.auth
  const path = req.nextUrl.pathname

  const isProtected = protectedPrefixes.some((p) => path.startsWith(p))
  const isPublic = publicRoutes.some((p) => path.startsWith(p))

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  if (isPublic && session) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|.*\\.svg$|.*\\.ico$).*)"],
}
