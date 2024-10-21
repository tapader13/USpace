import NextAuth, { CredentialsSignin } from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';

import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    GitHub,

    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;
        console.log(email, password);

        if (!email || !password) {
          throw new CredentialsSignin(
            'please provide all required credentials'
          );
        }
        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new CredentialsSignin('user not found');
        }
        const ismatch = await bcrypt.compare(password, user.password as string);
        if (!ismatch) {
          throw new CredentialsSignin('password not match');
        }
        console.log(user);
        return {
          id: user.id,
          name: user.username,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.email) {
        session.user.id = token.sub;
        session.user.email = token.email;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
      }
      return token;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        console.log(account, 'account');
        console.log(user, 'user');
        try {
          const { email, image } = user;
          console.log(email, image);
          const alreadyUser = await db.user.findUnique({
            where: {
              email: email || '',
            },
          });
          if (alreadyUser) {
            console.log(alreadyUser, 'alreadyUser');
            await db.user.update({
              where: {
                email: email || '',
              },
              data: {
                image,
              },
            });
          }

          if (!alreadyUser) {
            return false;
          } else {
            return true;
          }
        } catch (error) {
          throw new Error('Failed to login');
        }
      }
      if (account?.provider === 'credentials') {
        return true;
      }
      return false;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
});
