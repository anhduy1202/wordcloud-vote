import React from "react";
import { signIn, useSession } from "next-auth/react";
import { BsGithub } from "react-icons/bs";

const signin = () => {
  return (
    <section className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
      <div className="m-6 text-center p-8 rounded-xl bg-blue-100 flex flex-col items-center">
        <p className="text-[2.5rem] font-cloud text-blue-300">WordCloud Vote</p>
        <p className="font-mont text-[1.25rem] font-medium">
          Form an amazing word cloud from your votes
        </p>
        <button
          className="flex items-center rounded-md mt-12 p-4 bg-blue-300 text-[1.15rem] font-semibold font-mont"
          onClick={() =>
            signIn("github", {
              redirect: false,
              callbackUrl: "http://localhost:3000",
            })
          }
        >
          Sign In with Github
          <BsGithub size={24} className="ml-4" />
        </button>
      </div>
    </section>
  );
};

export default signin;
