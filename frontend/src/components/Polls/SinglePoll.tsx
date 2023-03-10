import { Poll } from "@/types/poll";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { DeletePopUp } from "../Popup/Popup";

interface PollProps {
  poll: Poll;
}

export const SinglePoll: React.FC<PollProps> = (props) => {
  const { poll } = props;
  const { id, title, description, createdAt, responses } = poll;
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const date: Date = new Date(createdAt);
  const option: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", option);

  return (
    <div className="bg-blue-100 p-4 rounded-md cursor-pointer relative md:p-8 my-14">
      <div className="" onClick={() => router.push(`/poll/${id}`)}>
        <p className="font-bold md:text-[1.75rem]"> {title}</p>
        <p className="text-[0.85rem] border-2 rounded-[2rem] border-btn-important px-2 py-1 absolute top-[-20%] right-[-2%] font-semibold bg-white md:text-[1rem]">
          {responses.length} Votes
        </p>
        <p className="text-[0.75rem] md:text-[1rem]"> {formattedDate} </p>
      </div>
      <MdOutlineCancel
        size={32}
        className="absolute right-[-3%] top-[-32%] text-black hover:text-red-500"
        onClick={() => setOpen(true)}
      />
      <DeletePopUp
        isOpen={isOpen}
        setOpen={setOpen}
        id={id}
        title="Delete this poll?"
        description="This action can't be undone"
      />
    </div>
  );
};
