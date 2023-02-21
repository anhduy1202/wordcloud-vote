import React, { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { BsGithub } from "react-icons/bs";
import { AiFillCloud, AiOutlineLoading3Quarters } from "react-icons/ai";
import { GetServerSidePropsContext } from "next";
import Loading from "@/components/Loading/Loading";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Check if user is authenticated
  const session = await getSession(context);
  // If user already signed in, move them to homepage
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const signin = () => {
  const [isClicked, setClick] = useState(false);
  return (
    <section className="overflow-hidden bg-blue-100 w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <AiFillCloud
        className="animate-bounce absolute top-24"
        size={148}
        color="white"
      />
      <div className="m-6 text-center p-8 rounded-xl bg-blue-50 flex flex-col items-center">
        <p className="text-[2.5rem] font-cloud text-blue-300">WordCloud Vote</p>
        <p className="font-mont text-[1.25rem] font-medium">
          Form an amazing word cloud from your votes
        </p>
        <button
          className="flex items-center rounded-md mt-12 p-4 bg-blue-300 text-[1.15rem] font-semibold font-mont"
          onClick={() => {
            setClick(true);
            signIn("github", {
              redirect: false,
              callbackUrl: "https://wordcloud-vote.vercel.app/",
            });
          }}
        >
          {isClicked ? (
            <Loading isLoading={isClicked} />
          ) : (
            <>
              Sign In with Github
              <BsGithub size={24} className="ml-4" />
            </>
          )}
        </button>
      </div>
      <p className="mt-4 text-[1rem]">
        Designed and made with 💙 by
        <a href="https://github.com/anhduy1202" className="font-bold">
          {' Daniel Truong'}
        </a>
      </p>
    </section>
  );
};

export default signin;
