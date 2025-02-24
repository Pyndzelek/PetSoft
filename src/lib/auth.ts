import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";

export const { auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        //runs on login
        const { email, password } = credentials;

        const userDB = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!userDB) {
          console.log("User not found");
          return null;
        }
        const passwordMatch = await bcrypt.compare(
          password,
          userDB.hashedPassword
        );
        if (!passwordMatch) {
          console.log("Invalid credentials");
          return null;
        }

        return userDB;
      },
    }),
  ],
  callbacks: {
    //runs on every request with middleware
    authorized: ({ auth, request }) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");
      const isLoggedIn = Boolean(auth?.user);

      if (isTryingToAccessApp && !isLoggedIn) {
        return false;
      }
      if (isTryingToAccessApp && isLoggedIn) {
        return true;
      }
      if (isLoggedIn && !isTryingToAccessApp) {
        //redirect to dashboard
        return Response.redirect(new URL("/app/dashboard", request.nextUrl));
      }
      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }

      return false;
    },
  },
});
