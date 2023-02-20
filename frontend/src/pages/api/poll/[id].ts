import { Poll } from "@/types/poll";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  // Retrieve current user
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as any },
  });
  // Retrieve current poll
  const { id } = req.query;
  const poll: Poll | null = await prisma.poll.findUnique({
    where: { id: `${id}` },
    include: {
      owner: true, // have to include this to access owner object
    },
  });
  // Check if current user the owner of the poll
  if (poll?.owner?.id !== user?.id) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  // Delete poll
  if (req.method === "DELETE") {
    try {
      const poll = await prisma.poll.delete({
        where: { id } as any,
      });
      res.status(200).json(poll);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["DELETE"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
