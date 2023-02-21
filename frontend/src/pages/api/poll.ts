import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only authorized user able to create poll
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  // Create a poll
  if (req.method === "POST") {
    try {
      const { title, description, captcha } = req.body;
      if (!captcha) {
        return res.status(422).json({ message: "Unprocessable Request." });
      }
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_CAPTCHA_SECRET}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();
      console.log(captchaValidation);
      if (captchaValidation.success) {
        // Retrieve current user
        const user = await prisma.user.findUnique({
          where: { email: session?.user?.email as any },
        });

        // create poll
        await prisma.poll.create({
          data: {
            title: title as any,
            description: description as any,
            ownerId: user?.id as any,
          },
        });
        res.status(200).json({ message: "Poll created" });
      } else {
        return res.status(422).json({ message: "Unprocessable Request." });
      }
    } catch (e) {
      res.status(500).json({ message: "Something is wrong" });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
