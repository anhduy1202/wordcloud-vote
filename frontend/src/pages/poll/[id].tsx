import { Poll } from "@/types/poll";
import { User } from "@/types/user";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

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
  const [isOwner, setOwner] = useState(false);
  const { title, description, createdAt, owner, responses } = poll;
  useEffect(() => {
    // check owner
    if (currentUser.id == owner.id) {
      setOwner(true);
    } else {
      setOwner(false);
    }
    const fetchGraph = async () => {
      const data = {
        responses: responses,
      };
      const response = await axios.post("http://localhost:8000/cloud", data, {
        responseType: "blob",
      });
      const blob = response.data;
      var myImage: any = document.querySelector("#graph");
      const objectURL = URL.createObjectURL(blob);
      myImage.src = objectURL;
    };
    fetchGraph();
  }, []);
  return (
    <section className="mt-8 flex items-center flex-col">
      <p className="text-[1.25rem] font-bold font-mont">{title} </p>
      <p>
        Made by <span className="font-bold"> {owner.name}</span>
      </p>
      <p> {isOwner ? "is owner" : "not owner"} </p>
      <img id="graph" src="" className="object-contain" alt="graph" />
    </section>
  );
};

export default Poll;
