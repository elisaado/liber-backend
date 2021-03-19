import { Request, Response } from "express";
import googleOAuth2Client from "../services/googleAuthService";
import { googleOAuth2ClientID } from "../../config.json";
import debug from 'debug';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

const log = debug('googleAuthenticationHandler');

export async function googleAuthenticationHandler(req: Request, res: Response) {
  const idToken = req.headers.authorization?.split(" ")[1];
  if (!idToken) {
    return res.json({
      ok: false,
      error: "No idToken supplied",
    })
  }

  return googleOAuth2Client.verifyIdToken({ idToken, audience: googleOAuth2ClientID })
    .then(ticket => ticket.getPayload())
    .then(async payload => {
      const user = await prisma.user.findUnique({ where: { googleId: payload?.sub } });
      if (user) return user;

      return await prisma.user.create({ data: { email: payload?.email || "", name: payload?.given_name || payload?.name || "", googleId: payload?.sub || "" } })
    })
    .then(user => {
      res.json({
        ok: true,
        data: {
          user
        }
      })
    })
    .catch(() => {
      return res.json({
        ok: false,
        error: "Invalid idToken supplied",
      })
    });
}
