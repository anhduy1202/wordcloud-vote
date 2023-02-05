import NavBar from "@/components/NavBar/NavBar";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
      <img id="graph" src="" className="object-contain" alt="graph" />
    </section>
  );
}
