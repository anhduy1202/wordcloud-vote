import { Poll } from "@/types/poll";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create a vote
  if (req.method === "POST") {
    try {
      const { content, pollId } = req.body;
      // Retrieve the poll to update the vote
      // Get this specific poll
      const poll: Poll | null = await prisma.poll.findUnique({
        where: { id: `${pollId}` },
      });
      // Update responses array 
      await prisma.poll.update({
        where: {id: poll?.id as any},
        data: {
            responses:{
                push: content
            }
        }
      })
      res.status(200).json({message: "Voted!"});
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
