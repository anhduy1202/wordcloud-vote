import { Poll } from "@/types/poll";
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
      const { title, description } = req.body;
      // Retrieve current user
      const user = await prisma.user.findUnique({
        where: { email: session?.user?.email },
      });
      await prisma.poll.create({
        data: {
          title: title,
          description: description,
          ownerId: user?.id,
        },
      });
      res.status(200).json({ message: "Poll created" });
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
