import NavBar from "@/components/NavBar/NavBar";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import { User } from "@/types/user";
import { MdPoll } from "react-icons/md";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const prisma = new PrismaClient();
  // Check if user is authenticated
  const session = await getSession(context);
  // If not, redirect to the signin page
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  useEffect(() => {
    const fetchGraph = async () => {
      const response = await fetch("http://127.0.0.1:8000/graph", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const blob = await response.blob();
      var myImage: any = document.querySelector("#graph");
      const objectURL = URL.createObjectURL(blob);
      console.log(objectURL);
      myImage.src = objectURL;
    };
    fetchGraph();
  }, []);

  return (
    <section className="w-[100vw] h-[100vh] flex flex-col">
      <NavBar />
      <div className="mt-4 gap-2 flex items-center justify-center">
        <MdPoll size={36} color="rgb(147 197 253)" />
        <p className="text-[1.5rem] font-bold font-mont">
          Poll Collections
        </p>
      </div>
      <img id="graph" src="" className="object-contain" alt="graph" />
    </section>
  );
}
