import { Popover, Transition } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
import ReCAPTCHA from "react-google-recaptcha";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    title: yup.string().min(5).max(50),
    about: yup.string().min(10).max(50),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

// Create Poll from form
const PollForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const recaptchaRef: React.RefObject<any> = React.createRef();

  const router = useRouter();
  const createPoll = async () => {
    setLoading(true);
    const captchaCode = await recaptchaRef.current.executeAsync();
    if (!captchaCode) {
      return;
    }
    const data = {
      title: title,
      description: description,
      captcha: captchaCode,
    };
    console.log(captchaCode);
    await axios.post("/api/poll", data);
    setLoading(false);
    router.reload();
  };

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel className="absolute left-1/2 z-10 mt-3 top-16 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
        {({ close }) => (
          <form
            className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
            onSubmit={handleSubmit(async () => {
              await createPoll();
            })}
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={`${process.env.NEXT_PUBLIC_CAPTCHA}`}
            />

            <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
              <div className="flex items-center rounded-lg p-2 transition duration-150 ease-in-out focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                <div className="w-full">
                  <p className="font-medium text-gray-900">Title</p>
                  <input
                    {...register("title")}
                    className={`w-full text-sm mt-2 focus:outline-none ${
                      errors.title ? "error-form" : ""
                    }`}
                    type="text"
                    placeholder="Text goes here"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <p className="text-red-600 mt-2">{errors.title?.message}</p>
                  <p className="mt-2 font-medium text-gray-900">
                    What's it about?
                  </p>
                  <input
                    {...register("about")}
                    className={`w-full text-sm mt-2 focus:outline-none ${
                      errors.about ? "error-form" : ""
                    }`}
                    type="text"
                    placeholder="Text goes here"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <p className="text-red-600 mt-2">{errors.about?.message}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-7 flex gap-4 items-center">
              <Popover.Button className="flex-1 p-2 px-4 rounded-md text-[0.85rem] ">
                Cancel
              </Popover.Button>
              {isLoading ? (
                <button
                  disabled
                  className="flex-1 p-2 rounded-md bg-btn-important flex justify-center text-white text-[0.85rem] "
                >
                  <Loading isLoading={isLoading} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 p-2 rounded-md bg-btn-important text-white text-[0.85rem] "
                >
                  Let's vote
                </button>
              )}
            </div>
          </form>
        )}
      </Popover.Panel>
    </Transition>
  );
};

export default PollForm;
