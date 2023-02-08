import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getSession, useSession } from "next-auth/react";
import { Key } from "react";
import { PrismaClient } from "@prisma/client";
import { User } from "@/types/user";
import { MdPoll } from "react-icons/md";
import { Poll } from "@/types/poll";
import { SinglePoll } from "@/components/Polls/SinglePoll";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const prisma = new PrismaClient();
  // Check if user is authenticated
  const session = await getSession(context);
  const user: User | undefined = session?.user;
  // If not, redirect to the signin page
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  // Get Poll Collections from user
  const polls: Poll[] = await prisma.poll.findMany({
    where: { ownerId: `${user?.id}` },
    orderBy: { createdAt: "desc" },
  });
  return {
    props: {
      polls: JSON.parse(JSON.stringify(polls)),
    },
  };
}

export default function Home({
  polls = [],
}: InferGetServerSidePropsType<GetServerSideProps>) {
  return (
    <section>
      <div className="mt-4 gap-2 flex items-center justify-center">
        <MdPoll size={36} color="rgb(147 197 253)" />
        <p className="text-[1.5rem] font-bold font-mont">Poll Collections</p>
      </div>
      <div className="m-4">
        {polls.map((poll: Poll) => {
          return (
            <div key={poll.id as Key}>
              <SinglePoll poll={poll} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
