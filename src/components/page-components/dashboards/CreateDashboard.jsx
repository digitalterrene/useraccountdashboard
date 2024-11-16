"use client";
import { useAuthContext } from "@/context/AuthContext";
import { Checkbox } from "@material-tailwind/react";
import React, { useState } from "react";
import { HiOutlineMail, HiOutlineVideoCamera } from "react-icons/hi";
import {
  IoFingerPrintSharp,
  IoKeyOutline,
  IoScanOutline,
} from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { account_server } from "../../../../utils/urls";
import { useRouter } from "next/navigation";

export default function CreateDashboard({ dashboard }) {
  const { user: local_user } = useAuthContext();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    user_id: local_user?._id,
    dashboard_type: dashboard,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Creating new dashboard...");
    const response = await fetch(`${account_server}/upsert-new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(inputs),
    });
    const json = await response.json();
    if (response.ok) {
      toast.update(id, {
        render: "Successfully created dashboard",
        type: "success",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        const authenticationStatus = json?._id ? "logged-in" : "not-logged-in";
        const authenticationToken = json?.token
          ? `${json?.token}`
          : "No auth token provided";
        router.push(
          `/${local_user?._id}/${dashboard}/?authenticationStatus=${authenticationStatus}&&authenticationToken=${authenticationToken}`
        );
        // dispatch({ type: "LOGIN", payload: json });
        //location.reload();
      }, 2000);
    } else {
      toast.update(id, {
        render: `${json.error}`,
        type: "error",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setTimeout(() => {
      toast.dismiss();
    }, 5000);
  };
  return (
    <div className="flex p-4 py-10 gap-6 w-full items-start">
      <ToastContainer />
      {/* <!-- Form --> */}
      <form onSubmit={handleSubmit} className="w-1/3">
        <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
          <div className="p-4 sm:p-7 flex flex-col bg-white border rounded-2xl shadow-lg dark:bg-slate-900">
            <div className="text-center">
              <h1 className="block text-xl capitalize font-bold text-gray-800 dark:text-white">
                Create a new {dashboard} dashboard
              </h1>
            </div>

            <div className="mt-5">
              <button
                type="button"
                className="w-full font-semibold text-gray-600 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm   rounded-lg border border-gray-200 bg-white  shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1487/1487835.png"
                  className="w-8 h-8"
                />
                Auto-Create One
              </button>

              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-700 dark:after:border-gray-700">
                Or
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  {/* <!-- Floating Input --> */}
                  <div className="relative">
                    <input
                      type="text"
                      value={inputs?.name}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          name: e.target.value,
                        }))
                      }
                      required
                      id="hs-hero-signup-form-floating-input-first-name"
                      className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                      placeholder="Name"
                    />
                    <label
                      htmlFor="hs-hero-signup-form-floating-input-first-name"
                      className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Name
                    </label>
                  </div>
                  {/* <!-- End Floating Input --> */}
                </div>
                <div>
                  {/* <!-- Floating Input --> */}
                  <div className="relative">
                    <input
                      type="text"
                      value={inputs?.extension}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          extension: e.target.value,
                        }))
                      }
                      id="hs-hero-signup-form-floating-input-last-name"
                      className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                      placeholder="Extenstion (optional)"
                    />
                    <label
                      htmlFor="hs-hero-signup-form-floating-input-last-name"
                      className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Extension
                    </label>
                  </div>
                  {/* <!-- End Floating Input --> */}
                </div>
                <div>
                  {/* <!-- Floating Input --> */}
                  <div className="relative">
                    <input
                      type="email"
                      value={inputs?.email}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          email: e.target.value,
                        }))
                      }
                      required
                      id="hs-hero-signup-form-floating-input-email"
                      className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                      placeholder="you@email.com"
                    />
                    <label
                      htmlFor="hs-hero-signup-form-floating-input-email"
                      className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Email
                    </label>
                  </div>
                  {/* <!-- End Floating Input --> */}
                </div>
                <div>
                  {/* <!-- Floating Input --> */}
                  <div className="relative">
                    <input
                      type="text"
                      value={inputs?.username}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          username: e.target.value,
                        }))
                      }
                      required
                      id="hs-hero-signup-form-floating-input-company-name"
                      className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                      placeholder="Username"
                    />
                    <label
                      htmlFor="hs-hero-signup-form-floating-input-company-name"
                      className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Username
                    </label>
                  </div>
                  {/* <!-- End Floating Input --> */}
                </div>
                <div className="relative col-span-full">
                  {/* <!-- Floating Input --> */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={inputs?.access_key}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          access_key: e.target.value,
                        }))
                      }
                      required
                      id="hs-hero-signup-form-floating-input-new-password"
                      className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                      placeholder="********"
                    />
                    <label
                      htmlFor="hs-hero-signup-form-floating-input-new-password"
                      className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Access Key
                    </label>
                  </div>
                  {/* <!-- End Floating Input --> */}
                </div>
                <div className="col-span-full">
                  {/* <!-- Floating Input --> */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={inputs?.security_key}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          security_key: e.target.value,
                        }))
                      }
                      required
                      id="hs-hero-signup-form-floating-input-current-password"
                      className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                      placeholder="********"
                    />
                    <label
                      htmlFor="hs-hero-signup-form-floating-input-current-password"
                      className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Security Key
                    </label>
                  </div>
                  {/* <!-- End Floating Input --> */}
                </div>
                <div className="col-span-full">
                  {/* <!-- Floating Input --> */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={inputs?.password}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          password: e.target.value,
                        }))
                      }
                      required
                      id="hs-hero-signup-form-floating-input-current-password"
                      className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                      placeholder="********"
                    />
                    <label
                      htmlFor="hs-hero-signup-form-floating-input-current-password"
                      className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                    >
                      Password
                    </label>
                  </div>
                  {/* <!-- End Floating Input --> */}
                </div>
              </div>

              <div className="mt-5 flex items-center">
                <div className=" ">
                  <Checkbox
                    onChange={(e) =>
                      e.target.checked === true
                        ? setShowPassword(true)
                        : setShowPassword(false)
                    }
                    color="blue"
                    label="Show Sensitive Data"
                  />
                </div>
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <!-- End Form --> */}
      <div className="grid w-2/3 pt-8 gap-12 border-b pb-6 ">
        <div className="">
          <h4 className="text-xl text-gray-800 font-bold capitalize  dark:text-white">
            Additional Information
          </h4>
          <p className="mt-3 text-gray-800 dark:text-gray-400">
            Your entities dashboard is currently configured to the following
            credentials. You can update them at anytime.
          </p>
        </div>

        <div className=" items-start lg:space-y-0  gap-4 lg:flex flex-wrap ">
          {/* <!-- Icon Block --> */}

          <div className="flex w-auto max-w-[400px] p-3 rounded-md hover:bg-gray-100   cursor-pointer ">
            <div className="   pt-1 text-2xl">
              {" "}
              <HiOutlineMail />
            </div>

            <div className="ml-5  ">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Professional Email
              </h3>
              <p className="mt-1 text-black ">email@res.org</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                This email is primarily for use in the useraccountdashboard
                ecosystem
              </p>
            </div>
          </div>
          {/* <!-- End Icon Block --> */}

          {/* <!-- Icon Block --> */}
          <div className="flex w-auto max-w-[400px] p-3 rounded-md hover:bg-gray-100   cursor-pointer ">
            <div className="   pt-1 text-2xl">
              {" "}
              <IoKeyOutline />
            </div>

            <div className="ml-5  ">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Access Key
              </h3>
              <p className="mt-1 text-black ">00!9</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                An access key is unique to every user and is used to identify
                users
              </p>
            </div>
          </div>
          {/* <!-- End Icon Block --> */}

          {/* <!-- Icon Block --> */}
          <div className="flex w-auto max-w-[400px] p-3 rounded-md hover:bg-gray-100   cursor-pointer ">
            <div className="   pt-1 text-2xl">
              {" "}
              <IoScanOutline />
            </div>

            <div className="ml-5  ">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Identification
              </h3>
              <p className="mt-1 text-black ">5686 8094 3489</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                This is the ID of the main dashboard associated with this
                account as a 'child' profile
              </p>
            </div>
          </div>
          {/* <!-- End Icon Block --> */}
          {/* <!-- Icon Block --> */}
          <div className="flex w-auto max-w-[400px] p-3 rounded-md hover:bg-gray-100   cursor-pointer ">
            <div className="   pt-1 text-2xl">
              {" "}
              <HiOutlineVideoCamera />
            </div>

            <div className="ml-5  ">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Conference ID
              </h3>
              <p className="mt-1 text-black ">5686 8094 3489</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                This is the Conference ID of the main dashboard associated with
                this account as a 'child' profile
              </p>
            </div>
          </div>
          {/* <!-- End Icon Block --> */}
          {/* <!-- Icon Block --> */}
          <div className="flex w-auto max-w-[400px] p-3 rounded-md hover:bg-gray-100   cursor-pointer ">
            <div className="   pt-1 text-2xl">
              {" "}
              <IoFingerPrintSharp />
            </div>

            <div className="ml-5  ">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Security Key
              </h3>
              <p className="mt-1 text-black ">****</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                This secret key contains biometric data that is used to check
                the authenticity of a user
              </p>
            </div>
          </div>
          {/* <!-- End Icon Block --> */}
        </div>
      </div>
    </div>
  );
}
