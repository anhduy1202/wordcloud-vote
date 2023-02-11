import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getSession, useSession } from "next-auth/react";
import { Key } from "react";
import { PrismaClient } from "@prisma/client";
import { User } from "@/types/user";
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
    <section className="md:mx-[16rem]">
      <div className="my-10 flex flex-col ml-4">
        <p className="text-[1.5rem] font-bold font-mont md:text-[2.5rem]">Your Collections</p>
        <p className="text-[#adb5bd] md:text-[1.5rem]"> Below are the polls created by you </p>
      </div>
      <div className="m-4 md:my-4">
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
