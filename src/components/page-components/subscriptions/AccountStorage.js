"use client";
import { useAuthContext } from "@/context/AuthContext";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { account_server } from "../../../../utils/urls";
import "react-toastify/dist/ReactToastify.css";

export default function AccountStorage({ account_storage }) {
  const [selectedPackage, setSelectedPackage] = useState(
    account_storage || "essential"
  );
  const { user } = useAuthContext();

  const handleSubmit = async () => {
    const id = toast.loading("Updating information...");

    const res = await fetch(
      `${account_server}/update-set-single-data-strings/subscriptions/_id/${user?._id}/`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${user?.token}`,
          useraccountdashboard_account_user_id: `${user?._id}`,
          "Content-Type": "application/json",
        },
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify({
          key_to_update: "account_storage",
          value_to_update: selectedPackage,
        }),
      }
    );
    const json = await res.json();
    if (res.ok) {
      toast.update(id, {
        render: "Successfully updated account information",
        type: "success",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        toast.dismiss();
        location.reload();
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
    }, 6000);
  };

  const handleActivateClick = () => {
    if (selectedPackage !== account_storage) {
      // Only call handleSubmit if the selected package is different from the current package
      handleSubmit();
    }
  };
  const handlePackageClick = (packageType) => {
    setSelectedPackage(packageType);
  };
  return (
    <div className="pt-5    bg-gray-200" id="pricing">
      <ToastContainer />

      {/* Modal ends here */}
      <div className="mx-auto pb-20 mt-4   px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-indigo-400">
            Pricing
          </h1>
          <p className="mt-2 text-4xl font-bold tracking-tight   sm:text-5xl">
            Whether it's just you, or your entire team - we've got you covered.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-700">
          Choose the subscription package that works best
        </p>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {/* <!-- First Product --> */}
          <div
            onClick={() => handlePackageClick("free")}
            className={` ${
              selectedPackage === "free" ? "ring-indigo-500 ring-2" : ""
            } bg-white/5  cursor-pointer  rounded-3xl p-8 xl:p-10`}
          >
            <div className="flex items-center justify-between gap-x-4">
              <h2 id="free" className="text-lg font-semibold leading-8  ">
                Free
                <span className="text-xs text-green-500 ml-8">
                  {account_storage === "free" && "selected"}
                </span>
              </h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-700">
              Best suited for individuals
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight ">
                $ 0 / month
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-700"></span>
            </p>
            <p
              data-hs-overlay="#hs-task-created-alert"
              aria-describedby="free"
              onClick={handleActivateClick}
              className={` ${
                "free" === account_storage
                  ? "bg-indigo-500 hover:bg-indigo-400 text-white focus-visible:outline-indigo-500"
                  : "bg-white/10 border-gray-700"
              }  hover:bg-white/20  border  mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 `}
            >
              {"free" === account_storage ? "Active" : "Activate"}
            </p>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-700 xl:mt-10"
            >
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                5G storage
              </li>
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Secure
              </li>
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Support
              </li>
            </ul>
          </div>

          {/* <!-- Second Product --> */}
          <div
            onClick={() => handlePackageClick("essential")}
            className={` ${
              selectedPackage === "essential" ? "ring-indigo-500 ring-2" : ""
            } bg-white/5  cursor-pointer  rounded-3xl p-8 xl:p-10`}
          >
            <div className="flex items-baseline justify-between gap-x-4">
              <h2 id="product2" className="text-lg font-semibold leading-8 ">
                Essential
                <span className="text-xs text-green-500 ml-8">
                  {account_storage === "essential" && "selected"}
                </span>
              </h2>
              <p className="rounded-full bg-indigo-500 px-2.5 text-white py-1 text-xs font-semibold leading-5 ">
                Most popular
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-700">
              The most popular choice for professionals
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight ">
                $ 5 / month
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-700"></span>
            </p>
            <a
              data-hs-overlay="#hs-task-created-alert"
              aria-describedby="essential"
              onClick={handleActivateClick}
              className={` ${
                "essential" === account_storage
                  ? "bg-indigo-500 hover:bg-indigo-400 text-white focus-visible:outline-indigo-500"
                  : "bg-white/10 border-gray-700"
              }  hover:bg-white/20  border  mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 `}
            >
              {"essential" === account_storage ? "Active" : "Activate"}
            </a>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-700 xl:mt-10"
            >
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                25G Storage
              </li>
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                5 useraccountdashboard Professional Emails
              </li>
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                5 useraccountdashboard Domain Names
              </li>{" "}
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Enhanced Security
              </li>
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                24/7 Live Support
              </li>
            </ul>
          </div>
          {/* 
      <!-- Third Product --> */}
          <div
            onClick={() => handlePackageClick("enterprise")}
            className={` ${
              selectedPackage === "enterprise" ? "ring-indigo-500 ring-2" : ""
            } bg-white/5  cursor-pointer  rounded-3xl p-8 xl:p-10`}
          >
            <div className="flex items-center justify-between gap-x-4">
              <h2 id="product3" className="text-lg font-semibold leading-8 ">
                Enterprise
                <span className="text-xs text-green-500 ml-8">
                  {account_storage === "enterprise" && "selected"}
                </span>
              </h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-gray-700">
              The package depends on usage
            </p>
            <p className="mt-6 flex items-baseline gap-x-1">
              <span className="text-4xl font-bold tracking-tight ">
                $ 50 / unit
              </span>
              <span className="text-sm font-semibold leading-6 text-gray-700"></span>
            </p>
            <a
              data-hs-overlay="#hs-task-created-alert"
              aria-describedby="enterprise"
              onClick={handleActivateClick}
              className={` ${
                "enterprise" === account_storage
                  ? "bg-indigo-500 hover:bg-indigo-400 text-white focus-visible:outline-indigo-500"
                  : "bg-white/10 border-gray-700"
              }  hover:bg-white/20  border  mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 `}
            >
              {"enterprise" === account_storage ? "Active" : "Activate"}
            </a>
            <ul
              role="list"
              className="mt-8 space-y-3 text-sm leading-6 text-gray-700 xl:mt-10"
            >
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Unlimited Storage
              </li>
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Unlimited useraccountdashboard Professional Emails
              </li>
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Unlimited useraccountdashboard Domain Names
              </li>{" "}
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Enhanced Security
              </li>
              <li className="flex gap-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-6 w-5 flex-none "
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                24/7 Live Support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
