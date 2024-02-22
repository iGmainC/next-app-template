import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/nodemailer';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, User } from '@prisma/client';
import { createTransport } from 'nodemailer';
import { hashPassword, verifyPassword } from '@/lib/auth';
// async function sendVerificationRequest(params: {
//   identifier: string;
//   url: string;
//   expires: Date;
//   provider: any;
//   token: string;
//   theme: any;
//   request: Request;
// }) {
//   const { identifier, url, provider, theme } = params;
//   const { host } = new URL(url);
//   // NOTE: You are not required to use `nodemailer`, use whatever you want.
//   const transport = createTransport(provider.server);
//   const result = await transport.sendMail({
//     to: identifier,
//     from: provider.from,
//     subject: `Sign in to ${host}`,
//     text: text({ url, host }),
//     html: html({ url, host, theme }),
//   });
//   const failed = result.rejected.concat(result.pending).filter(Boolean);
//   if (failed.length) {
//     throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
//   }
// }

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
// function html(params: { url: string; host: string; theme: Theme }) {
//   const { url, host, theme } = params;

//   const escapedHost = host.replace(/\./g, '&#8203;.');

//   const brandColor = theme.brandColor || '#346df1';
//   const color = {
//     background: '#f9f9f9',
//     text: '#444',
//     mainBackground: '#fff',
//     buttonBackground: brandColor,
//     buttonBorder: brandColor,
//     buttonText: theme.buttonText || '#fff',
//   };

//   return `
// <body style="background: ${color.background};">
//   <table width="100%" border="0" cellspacing="20" cellpadding="0"
//     style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
//     <tr>
//       <td align="center"
//         style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
//         Sign in to <strong>${escapedHost}</strong>
//       </td>
//     </tr>
//     <tr>
//       <td align="center" style="padding: 20px 0;">
//         <table border="0" cellspacing="0" cellpadding="0">
//           <tr>
//             <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
//                 target="_blank"
//                 style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
//                 in</a></td>
//           </tr>
//         </table>
//       </td>
//     </tr>
//     <tr>
//       <td align="center"
//         style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
//         If you did not request this email you can safely ignore it.
//       </td>
//     </tr>
//   </table>
// </body>
// `;
// }

// /** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
// function text({ url, host }: { url: string; host: string }) {
//   return `Sign in to ${host}\n${url}\n\n`;
// }

const prisma = new PrismaClient();
export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup',
  },
  providers: [
    GitHub,
    CredentialsProvider({
      async authorize(
        credentials: {
          type?: 'signIn' | 'signUp';
          phoneNumber?: string;
          password?: string;
          email?: string;
          username?: string;
          verifyCode?: string;
        },
        req,
      ) {
        let authType = credentials.type;
        switch (authType) {
          case 'signIn':
            if (!(credentials.phoneNumber && credentials.password)) return null;
            let user = await prisma.user.findFirst({
              where: {
                phoneNumber: credentials.phoneNumber,
              },
            });
            if (!user) return null;
            let isMatch = await verifyPassword(
              credentials.password,
              user.password || '',
            );
            console.log(isMatch);
            if (isMatch) {
              return user;
            } else {
              return null;
            }
            break;
          case 'signUp':
            if (
              !(
                credentials.phoneNumber &&
                credentials.password &&
                credentials.verifyCode &&
                credentials.username
              )
            )
              return null;
            return await addUser(
              credentials.phoneNumber,
              credentials.password,
              credentials.email,
              credentials.username,
            );
          default:
            return null;
        }
      },
    }),
  ],
  callbacks: {
    // async session({ session, token, user }) {
    //   // console.log('session', session);
    //   // console.log('token', token);
    //   // console.log('user', user);
    //   // Send properties to the client, like an access_token from a provider.
    //   return session;
    // },
    async jwt({ token, user, account, profile, trigger, session }) {
      // 将user的类型转换为undefined
      user = user as User;
      // 将user的类型转换为User
      if (user) {
        if ('phoneNumber' in user) {
          // 在这个代码块中，variable 的类型是 User
          token.phoneNumber = user.phoneNumber;
        }
      }
      return token;
    },
    async session({ session, token, user }) {
      // 在这个代码块中，variable 的类型是 User
      // session.phoneNumber = token.phoneNumber;
      console.log('user', user);
      if ('phoneNumber' in token) {
        // @ts-ignore
        session.user['phoneNumber'] = token.phoneNumber;
      }
      if (token.sub) {
        session.userId = token.sub;
        session.user['id'] = token.sub;
      }
      return session;
    },
  },
});
// 给密码加盐

// 手机加密码登录
async function passwordLogin(phoneNumber: string, password: string) {
  let user = prisma.user.findFirst({
    where: {
      phoneNumber: phoneNumber,
    },
  });
  if (user) {
    let isMatch = await verifyPassword(password, user.password);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
async function customLogin(
  type: 'password',
  params: { username: string; password: string },
) {
  switch (type) {
    case 'password':
      return passwordLogin(params.username, params.password);
      break;
    default:
      return null;
      break;
  }
}

async function addUser(
  phoneNumber: string,
  password: string,
  email?: string,
  username?: string,
): Promise<User | null> {
  let user = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  });
  if (user) {
    console.log('用户存在');
    return null;
  }
  user = await prisma.user.create({
    data: {
      name: username,
      phoneNumber: phoneNumber,
      password: await hashPassword(password),
      email: email,
      phoneVerified: new Date(),
    },
  });
  return user;
}
