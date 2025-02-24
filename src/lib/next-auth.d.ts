import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userId: string;
  }
}

//this file is to extend the JWT type to include the userId
//this is needed to pass the user id
//around the app (exposed to the client)
