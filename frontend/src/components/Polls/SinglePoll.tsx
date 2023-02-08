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
      className="bg-blue-100 p-4 rounded-md cursor-pointer"
      onClick={goToPoll}
    >
      <p className="font-bold"> {title}</p>
      <p className="text-sky-700 font-semibold">{responses.length} responses</p>
      <p className="text-[0.75rem]"> {formattedDate} </p>
    </div>
  );
};
