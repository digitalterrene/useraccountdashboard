"use client";
import React from "react";
import { BiLockAlt } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
export default function CardLinks() {
  return (
    <div className=" w-full     lg:py-8  ">
      {/* <!-- Grid --> */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* <!-- Card --> */}
        <a
          className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
          href="#"
        >
          <div className="p-4 md:p-5">
            <div className="flex">
              <div className="mt-1">
                <BiLockAlt className="text-2xl" />
              </div>

              <div className="grow ml-5">
                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                  Privacy & personalization
                </h3>
                <p className="text-sm text-gray-500">
                  See the data in your useraccountdashboard Account and choose
                  what activity is saved to personalize your
                  useraccountdashboard experience
                </p>
                <p className="pt-4 hover:text-blue-500">
                  Manage your data & privacy
                </p>
              </div>
            </div>
          </div>
        </a>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <a
          className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
          href="#"
        >
          <div className="p-4 md:p-5">
            <div className="flex">
              <div className="mt-1">
                <BsShieldCheck className="text-2xl" />
              </div>

              <div className="grow ml-5">
                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                  You have security tips
                </h3>
                <p className="text-sm text-gray-500">
                  Security tips found in the Security Checkup
                </p>{" "}
                <p className="pt-4 hover:text-blue-500">Review security tips</p>
              </div>
            </div>
          </div>
        </a>
        {/* <!-- End Card --> */}

        {/* <!-- Card --> */}
        <a
          className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
          href="#"
        >
          <div className="p-4 md:p-5">
            <div className="flex">
              <div className="mt-1">
                <IoCheckmarkDoneOutline className="text-2xl" />
              </div>

              <div className="grow ml-5">
                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                  Privacy suggestions available
                </h3>
                <p className="text-sm text-gray-500">
                  Take the Privacy Checkup and choose the settings that are
                  right for you
                </p>{" "}
                <p className="pt-4 hover:text-blue-500">Review security tips</p>
              </div>
            </div>
          </div>
        </a>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Grid --> */}
    </div>
  );
}
