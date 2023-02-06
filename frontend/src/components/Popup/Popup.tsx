import { User } from "@/types/user";
import { signOut } from "next-auth/react";
import React, { Dispatch, SetStateAction } from "react";

interface userProps {
  user: User;
  isOpened: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const UserPopUp: React.FC<userProps> = (props) => {
  const { user, isOpened } = props;
  const { name } = user;
  return (
    <>
      {isOpened && (
        <div className="rounded-md absolute top-20 right-8 bg-blue-200 p-2 font-mont">
          <div className="border-b-2 border-blue-400 mb-2">
            Signed in as <p className="font-semibold"> {name} </p>
          </div>
          <div className="flex flex-col items-start">
            <button onClick={() => signOut()}> Sign out</button>
          </div>
        </div>
      )}
    </>
  );
};
