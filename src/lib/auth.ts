import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { authSchema } from "./validations";
import { NextResponse } from "next/server";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        //validation
        const validatedFormData = authSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          return null;
        }

        //runs on login
        const { email, password } = validatedFormData.data;

        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        if (!user) {
          console.log("User not found");
          return null;
        }
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (!passwordMatch) {
          console.log("Invalid credentials");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    //runs on every request with middleware
    authorized: ({ auth, request }) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");
      const isLoggedIn = Boolean(auth?.user);

      console.log("isTryingToAccessApp", isTryingToAccessApp);
      console.log("isLoggedIn", isLoggedIn);

      if (isTryingToAccessApp && !isLoggedIn) {
        return false;
      }
      if (isTryingToAccessApp && isLoggedIn) {
        return true;
      }
      if (isLoggedIn && !isTryingToAccessApp) {
        console.log("redirecting to dashboard");
        //redirect to dashboard
        return NextResponse.redirect(
          new URL("/app/dashboard", request.nextUrl)
        );
      }
      if (!isLoggedIn && !isTryingToAccessApp) {
        return true;
      }

      return false;
    },
    // thats how to pass user id around the app (exposed to the client)
    jwt: ({ token, user }) => {
      if (user) {
        if (user.id) {
          token.userId = user.id;
        }
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
});
