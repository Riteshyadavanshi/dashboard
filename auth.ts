import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/form-schema/login.schema";
import { getUserByEmail } from "./lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const isValid = LoginSchema.safeParse(credentials);
        if (isValid.success) {
          const { email, password } = isValid.data;
          const isUser = await getUserByEmail(email);
          if (!isUser || !isUser.password) {
            return null;
          }
          if (isUser.password === password) {
            return isUser;
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
});
