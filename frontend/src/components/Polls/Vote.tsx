import { User } from "@/types/user";
import axios from "axios";
import React, { useState } from "react";
import { Cookies } from "react-cookie";

interface voteProps {
  currentUser: User;
  pollId: string;
}

// We need poll id to send to the api
const Vote: React.FC<voteProps> = (props) => {
  const { currentUser, pollId } = props;
  const [vote, setVote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const nextCookies = new Cookies();
  const submitVote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const req = {
      content: vote.toLowerCase(),
      pollId: pollId,
    };
    const data = await axios.post("/api/vote", req);
    nextCookies.set("voted", "true");
    setSubmitted(true);
  };
  return (
    <>
      {!submitted && (
        <form
          className="flex flex-col items-center mt-8"
          onSubmit={(e) => submitVote(e)}
        >
          <p className="text-[1rem]">Enter your vote </p>
          <input
            className="bg-blue-300 text-center"
            type="text"
            onChange={(e) => setVote(e.target.value)}
          />
          <button type="submit"> Vote </button>
        </form>
      )}
    </>
  );
};

export default Vote;
