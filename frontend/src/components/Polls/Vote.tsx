import { User } from "@/types/user";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Cookies } from "react-cookie";
import Loading from "../Loading/Loading";

interface voteProps {
  currentUser: User;
  pollId: string;
}

// We need poll id to send to the api
const Vote: React.FC<voteProps> = (props) => {
  const { currentUser, pollId } = props;
  const [vote, setVote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const nextCookies = new Cookies();
  const router = useRouter();
  const submitVote = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const req = {
      content: vote.toLowerCase(),
      pollId: pollId,
    };
    await axios.post("/api/vote", req);
    // Append cookie with new poll id
    let currentCookie = nextCookies.get("voted");
    if (currentCookie == undefined) {
      nextCookies.set("voted", pollId);
    } else {
      let newCookie = currentCookie + "," + pollId;
      nextCookies.set("voted", newCookie);
    }
    setLoading(false);
    setSubmitted(true);
    router.reload();
  };
  return (
    <>
      {!submitted && (
        <form
          className="flex flex-col items-center mt-8"
          onSubmit={(e) => submitVote(e)}
        >
          <input
            className="bg-white rounded-md p-2 text-center"
            type="text"
            placeholder="Enter your vote here"
            onChange={(e) => setVote(e.target.value)}
          />
          <div className="flex mt-4 w-full gap-2">
            <button
              type="submit"
              className="flex-1 p-2 flex justify-center rounded-md bg-btn-important text-white "
            >
              {isLoading ? <Loading isLoading={isLoading} /> : "Vote"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Vote;
