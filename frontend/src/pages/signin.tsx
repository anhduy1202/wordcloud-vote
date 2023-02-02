import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const signin = () => {
  return (
    <section>
      <button
        className="p-4 bg-blue-300"
        onClick={() =>
          signIn("github", {
            redirect: false,
            callbackUrl: "http://localhost:3000",
          })
        }
      >
        Sign In
      </button>
    </section>
  );
};

export default signin;
