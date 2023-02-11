import { Poll } from "@/types/poll";
import { useRouter } from "next/router";
import React from "react";

interface PollProps {
  poll: Poll;
}

export const SinglePoll: React.FC<PollProps> = (props) => {
  const { poll } = props;
  const { id, title, description, createdAt, updatedAt, responses } = poll;
  const router = useRouter();
  const date: Date = new Date(createdAt);
  const option: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", option);
  const goToPoll = () => {
    console.log(id);
    router.push(`/poll/${id}`);
  };
  return (
    <div
      className="bg-blue-100 p-4 rounded-md cursor-pointer relative md:p-8"
      onClick={goToPoll}
    >
      <p className="font-bold md:text-[1.75rem]"> {title}</p>
      <p className="text-[0.85rem] border-2 rounded-[2rem] border-btn-important px-2 py-1 absolute top-[-20%] right-[-2%] font-semibold bg-white md:text-[1rem]">{responses.length} Votes</p>
      <p className="text-[0.75rem] md:text-[1rem]"> {formattedDate} </p>
    </div>
  );
};
