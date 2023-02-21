import { User } from "@/types/user";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface voteProps {
  currentUser: User;
  pollId: string;
}

const schema = yup
  .object({
    vote: yup
      .string()
      .min(2)
      .max(10)
      .matches(/^[a-zA-Z0-9]*$/),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

// We need poll id to send to the api
const Vote: React.FC<voteProps> = (props) => {
  const { currentUser, pollId } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [vote, setVote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const nextCookies = new Cookies();
  const router = useRouter();
  const submitVote = async () => {
    setLoading(true);
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
          onSubmit={handleSubmit(() => submitVote())}
        >
          <input
            {...register("vote")}
            className={`bg-white rounded-md p-2 text-center outline-none ${
              errors.vote ? "error-form" : ""
            }`}
            type="text"
            placeholder="Enter your vote here"
            onChange={(e) => setVote(e.target.value)}
          />
          <p className="mt-2 text-red-600">{errors.vote?.message}</p>
          <div className="flex mt-4 w-full justify-center">
            <button
              type="submit"
              className="p-2 px-6 flex justify-center rounded-md bg-btn-important text-white "
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
