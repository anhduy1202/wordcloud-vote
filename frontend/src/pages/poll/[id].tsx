import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { getSession } from "next-auth/react";
import React, { useEffect } from "react";

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const prisma = new PrismaClient();
//     // Check if user is authenticated
//     const session = await getSession(context);
//     const user: User | undefined = session?.user;
//     // If not, redirect to the signin page
//     if (!session) {
//       return {
//         redirect: {
//           destination: "/signin",
//           permanent: false,
//         },
//       };
//     }
//     // Get Poll Collections from user
//     const polls: Poll[] = await prisma.poll.findMany({
//       where: { ownerId: `${user?.id}` },
//       orderBy: { createdAt: "desc" },
//     });
//     return {
//       props: {
//         polls: JSON.parse(JSON.stringify(polls)),
//       },
//     };
//   }

const Poll = () => {
  useEffect(() => {
    const fetchGraph = async () => {
      //test data
      const test = {
        responses: [
          "react",
          "react",
          "react",
          "remix",
          "next.js",
          "svelte",
          "next.js",
        ],
      };
      const response = await axios.post("http://localhost:8000/cloud", test, {
        responseType: "blob",
      });
      const blob = response.data;
      var myImage: any = document.querySelector("#graph");
      const objectURL = URL.createObjectURL(blob);
      console.log(objectURL);
      myImage.src = objectURL;
    };
    fetchGraph();
  }, []);
  return (
    <section>
      <img id="graph" src="" className="object-contain" alt="graph" />
    </section>
  );
};

export default Poll;
