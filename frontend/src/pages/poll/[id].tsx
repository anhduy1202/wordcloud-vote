import Vote from "@/components/Polls/Vote";
import { PopUp } from "@/components/Popup/Popup";
import { Poll } from "@/types/poll";
import { User } from "@/types/user";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { AiFillCloud, AiOutlineLink } from "react-icons/ai";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context?.params?.id;
  const prisma = new PrismaClient();
  let user;
  // Check if user is authenticated
  const session = await getSession(context);
  // Get this specific poll
  const poll: Poll | null = await prisma.poll.findUnique({
    where: { id: `${id}` },
    include: {
      owner: true, // have to include this to access owner object
    },
  });
  // If user logged in, return current user info
  if (session) {
    user = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });
  } else {
    user = {};
  }

  return {
    props: {
      poll: JSON.parse(JSON.stringify(poll)),
      currentUser: JSON.parse(JSON.stringify(user)),
    },
  };
}

const Poll = ({
  poll,
  currentUser,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  const { id, title, description, createdAt, owner, responses } = poll;
  const [isOwner, setOwner] = useState(false);
  const [isVoted, setVoted] = useState(false);
  const [cloudLoading, setCloudLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const nextCookies = new Cookies();
  useEffect(() => {
    const fetchGraph = async () => {
      setCloudLoading(true);
      const data = {
        responses: responses,
      };
      const response = await axios.post("http://localhost:8000/cloud", data, {
        responseType: "blob",
      });
      setCloudLoading(false);
      const blob = response.data;
      var myImage: any = document.querySelector("#graph");
      const objectURL = URL.createObjectURL(blob);
      myImage.src = objectURL;
    };
    // Check if user already voted yet by matching cookie, if not then dont show the wordcloud
    let voteCookie = nextCookies.get("voted");
    if (voteCookie != undefined) {
      let cookieArr = voteCookie.split(",");
      if (cookieArr.includes(id)) {
        setVoted(true);
        responses.length > 0 && fetchGraph();
      } else {
        setVoted(false);
      }
    } else {
      setVoted(false);
    }

    // check owner
    if (currentUser.id == owner.id) {
      setOwner(true);
      setVoted(true);
      responses.length > 0 && fetchGraph();
    } else {
      setOwner(false);
    }
  }, []);
  return (
    <>
      <button
        className="flex items-center justify-center mt-8"
        onClick={() => {
          setOpen(true);
          navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_ROOT_URL}/poll/${poll.id}`
          );
        }}
      >
        <p className="bg-gray-200 flex  p-2 rounded-lg">
          <AiOutlineLink size={24} className="mr-2" />
          Copy link
        </p>
        <PopUp title="Link Copied" isOpen={isOpen} setOpen={setOpen} />
      </button>
      <section className="mt-8 flex items-center flex-col bg-sky-100 p-4 mx-4 rounded-[1rem]">
        <p className="">
          by <span className="font-bold"> {owner.name}</span>
        </p>
        <p className="text-[1.25rem] font-bold font-mont text-center">
          {title}
        </p>
        <p> {description} </p>
        {/* Can only vote if you're not the owner and you haven't voted */}
        {!isOwner && !isVoted && <Vote currentUser={currentUser} pollId={id} />}
      </section>
      {/* Only owner or people who voted able to see the graph */}
      {(isOwner || isVoted) && (
        <div className="mt-10 flex flex-col items-center">
          {cloudLoading ? (
            <AiFillCloud
              size={64}
              color="rgb(147 197 253)"
              className="animate-bounce"
            />
          ) : (
            <p className="font-mont text-[1.5rem] font-bold"> Results </p>
          )}
          {responses.length > 0 ? (
            <img id="graph" src="" className="p-4 object-contain" alt="" />
          ) : (
            <p> No votes yet </p>
          )}
        </div>
      )}
    </>
  );
};

export default Poll;
