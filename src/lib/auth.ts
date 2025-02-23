import NextAuth from "next-auth";
//simport { NextAuthOptions } from "next-auth";

// const config: NextAuthOptions = {
//   pages: {
//     signIn: "/login",
//   },
//   providers: [],
// };

export const { auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized: ({ request }) => {
      const isTryingToAccessApp = request.nextUrl.pathname.includes("/app");

      return !isTryingToAccessApp;
    },
  },
});
