import { User } from "@/types/user";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, {
  Dispatch,
  Fragment,
  Key,
  SetStateAction,
  useState,
} from "react";
import Loading from "../Loading/Loading";

interface userProps {
  user: User;
  isOpened: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const UserPopUp: React.FC<userProps> = (props) => {
  const { user, isOpened, setOpen } = props;
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

interface IPopUp {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
}

export const PopUp: React.FC<IPopUp> = (props) => {
  const { isOpen, setOpen, title, description } = props;
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

interface IDeletePopUp extends IPopUp {
  id: any;
}
export const DeletePopUp: React.FC<IDeletePopUp> = (props) => {
  const { isOpen, setOpen, title, description, id } = props;
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const deletePoll = async () => {
    setLoading(true);
    await axios.delete(`/api/poll/${id}`);
    setLoading(false);
    router.reload();
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>

                  <div className="mt-4 flex gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-sm font-medium text-black hover:bg-red-600 focus:outline-none"
                      onClick={async () => {
                        await deletePoll();
                        setOpen(false);
                      }}
                    >
                      {isLoading ? (
                        <Loading isLoading={isLoading} />
                      ) : (
                        "Yes, delete it"
                      )}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
