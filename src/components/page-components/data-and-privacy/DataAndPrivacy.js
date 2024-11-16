"use client";
import { dashboards } from "@/assets/data";
import { useAuthContext } from "@/context/AuthContext";
import React from "react";
import { HiOutlineChevronRight } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import useNavigation from "../../../../utils/handleNavigate";

export default function DataAndPrivacy() {
  const { user } = useAuthContext();
  const { handleQuickNavigate } = useNavigation();
  return (
    <div className="p-10 space-y-10 w-full px-6">
      <div className="lg:flex flex-wrap justify-between gap-4 ">
        <div className=" lg:w-7/12">
          <p className="text-xl font-bold text-gray-800  mb-4">Privacy First</p>
          <p>
            Key privacy options to help you choose the data saved in your
            account, the ads you see, info you share with others, and mor{" "}
          </p>
        </div>
        {/* image replacement */}
        <div
          id="cookies-simple-with-icon-and-dismiss-button"
          className=" lg:w-4/12  py-6"
        >
          {/* <!-- Card --> */}
          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex gap-x-4">
              <IoNotificationsOutline className="text-green-600 text-3xl" />

              <p className="text-sm text-gray-800 dark:text-gray-200">
                Always be informed of all activities all activities.{" "}
                <a
                  className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                  href="#"
                >
                  {" "}
                  Enable here
                </a>
              </p>

              <div>
                <button
                  type="button"
                  className="inline-flex rounded-full p-2 text-gray-500 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-600  dark:hover:bg-gray-600 dark:text-gray-400"
                  data-hs-remove-element="#cookies-simple-icon-and-with-dismiss-button"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg
                    className="h-3 w-3"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* <!-- End Card --> */}
        </div>
        {/* image replacement ends here */}
      </div>
      <div className="grid w-full gap-4 sm:gap-6">
        {/* <!-- Card --> */}
        <div className="group lg:flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800">
          <div className="p-4 md:p-5">
            <div className="lg:flex">
              <div className="grow space-y-3 ml-5">
                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                  Privacy suggestions available
                </h3>
                <p className="text-sm text-gray-500">
                  Take the Privacy Checkup and choose the settings that are
                  right for you
                </p>
                <div className="flex -ml-8 mt-6 w-auto max-w-[400px] p-3 rounded-md hover:bg-gray-100   cursor-pointer ">
                  <div className="ml-5  ">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Review Suggestions
                    </h3>
                    <p className="mt-1 text-black ">4 Suggestions Found</p>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      Please consider implementing these suggestions. Anything
                      to keep your data safe
                    </p>
                  </div>
                </div>
              </div>
              <img
                src="https://img.freepik.com/free-vector/data-protection-law-illustration-concept_114360-971.jpg?size=626&ext=jpg&ga=GA1.1.333512076.1694862058&semt=sph"
                className="  mb-4  w-96 rounded-full"
                alt="Avatar"
              />
            </div>
          </div>
        </div>
        {/* <!-- Card --> */}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid w-full gap-4 sm:gap-6">
          {/* <!-- Card --> */}
          <div className="group flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800">
            <div className="p-4 md:p-5">
              <div className="flex">
                <div className="grow space-y-3 ml-5">
                  <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                    Personalized ads
                  </h3>
                  <p className="text-sm text-gray-500">
                    You can choose whether the ads you see on the
                    useraccountdashboard ecosystem and partner sites are
                    personalized
                  </p>
                </div>
              </div>
            </div>
            <div className="p-8">
              {" "}
              {/* <!-- Card --> */}
              <a
                onClick={() =>
                  user?._id &&
                  handleQuickNavigate("data-and-privacy/my-ad-center", {
                    _id: user?._id,
                    token: user?.token,
                  })
                }
                className="group gap-6 cursor-pointer flex gap-y-6 w-full h-full hover:bg-gray-100 rounded-lg p-5 transition-all dark:hover:bg-white/[.075]"
              >
                <div className="w-16">
                  <img src="https://cdn-icons-png.flaticon.com/128/1379/1379940.png" />
                </div>

                <div>
                  <div>
                    <h3 className="block font-bold text-gray-800 dark:text-white">
                      My Ad Center
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Personalized ads in the useraccountdashboard ecosystem
                    </p>
                  </div>

                  <p className="mt-3 inline-flex items-center gap-x-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                    View
                    <svg
                      className="w-2.5 h-2.5 transition ease-in-out group-hover:translate-x-1"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                        fill="currentColor"
                      />
                    </svg>
                  </p>
                </div>
              </a>
              {/* <!-- End Card --> */}
            </div>
            <div className="grid lggrid-cols-2 w-full gap-2">
              <div className="p-8  ">
                {" "}
                {/* <!-- Card --> */}
                <a
                  onClick={() =>
                    user?._id &&
                    handleQuickNavigate("data-and-privacy/ad-revenue", {
                      _id: user?._id,
                      token: user?.token,
                    })
                  }
                  className="group gap-6 cursor-pointer flex border gap-y-6 w-full h-full hover:bg-gray-100 rounded-lg p-5 transition-all dark:hover:bg-white/[.075]"
                >
                  <div className="w-16">
                    <img src="https://cdn-icons-png.flaticon.com/128/10272/10272685.png" />
                  </div>

                  <div>
                    <div>
                      <h3 className="block font-bold text-gray-800 dark:text-white">
                        Ad Revenue
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Get paid to watch Ads
                      </p>
                    </div>

                    <p className="mt-3 inline-flex items-center gap-x-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                      Learn How
                      <svg
                        className="w-2.5 h-2.5 transition ease-in-out group-hover:translate-x-1"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                          fill="currentColor"
                        />
                      </svg>
                    </p>
                  </div>
                </a>
                {/* <!-- End Card --> */}
              </div>
            </div>
          </div>
          {/* <!-- Card --> */}
        </div>
        <div className="grid w-full gap-4 sm:gap-6">
          <div className="p-4 md:p-5">
            <div className="flex">
              <div className="grow space-y-3">
                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                  Data from apps and services you use
                </h3>
                <p className="text-sm text-gray-500">
                  Your content and preferences related to the to the
                  useraccountdashboard ecosystem you use and third-party apps
                  with access to your account
                </p>
              </div>
            </div>
          </div>
          {/* <!-- Card --> */}
          <div className="group  flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800">
            <div className="p-4 md:p-5">
              <div className="flex">
                <div className="grow space-y-3 ml-5">
                  <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                    Apps and services
                  </h3>
                  <p className="text-sm text-gray-500">
                    Content saved from the useraccountdashboard ecosystem
                    services
                  </p>
                </div>
              </div>
            </div>
            <div className=" border-t items-center p-10 py-3 gap-6  grid grid-cols-3   ">
              {dashboards &&
                dashboards.map(({ name, icon }, i) => (
                  <button
                    type="button"
                    class="py-2 capitalize  inline-flex justify-start items-center hover:bg-gray-200 px-2 -ml-2 gap-2 rounded-md  border-transparent font-semibold border hover:bg-slate-50  border-gray-300 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    <img src={icon} className="w-6" />
                    {name}
                  </button>
                ))}
            </div>

            <a
              onClick={() =>
                user?._id &&
                handleQuickNavigate("data-and-privacy/apps-and-services", {
                  _id: user?._id,
                  token: user?.token,
                })
              }
              className="p-2 h-16 cursor-pointer border-t items-center px-10 flex   hover:bg-slate-50"
            >
              <p className=" ">Configure according to your preferrences</p>

              <div className="flex ml-auto gap-2">
                <div>
                  <HiOutlineChevronRight className="text-2xl" />
                </div>
              </div>
            </a>
          </div>
          {/* <!-- Card --> */}
        </div>
      </div>
    </div>
  );
}
