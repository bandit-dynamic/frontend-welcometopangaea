import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        FacebookProvider({
           clientId: process.env.FACEBOOK_CLIENT_ID as string,
           clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
         }),
    ]
}