import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { getSupabaseServerClient } from "@/lib/supabase";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().toLowerCase().trim();
        const password = credentials?.password?.toString() ?? "";

        if (!email || !password) {
          return null;
        }

        const supabase = getSupabaseServerClient();

        // Adjust table/column names to match your schema.
        const { data: user, error } = await supabase
          .from("users")
          .select("id, email, password_hash, name")
          .eq("email", email)
          .maybeSingle();

        if (error || !user || !user.password_hash) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password_hash as string);

        if (!isValid) {
          return null;
        }

        return {
          id: String(user.id),
          email: user.email as string,
          name: (user as any).name ?? (user.email as string),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
