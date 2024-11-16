"use client";
import { useAuthContext } from "@/context/AuthContext";
import React from "react";
import { BsArrowRight, BsChevronRight } from "react-icons/bs";
import { HiOutlineChevronRight } from "react-icons/hi";
import { MdOutlineCreditCardOff } from "react-icons/md";
import useNavigation from "../../../../utils/handleNavigate";
export default function Subscriptions() {
  const { user } = useAuthContext();
  const { handleQuickNavigate } = useNavigation();
  return (
    <div className="lg:p-10 space-y-10 w-full lg:px-6">
      <div className="lg:flex flex-wrap justify-between gap-4 ">
        <div className=" lg:w-7/12">
          <p className="text-xl font-bold text-gray-800  mb-4">
            useraccountdashboard Ecosystem
          </p>
          <p>
            You have access by defualt post creating a useraccountdashboard
            Account to all products in the ecosystem{" "}
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
              <MdOutlineCreditCardOff className="text-red-400 text-3xl" />

              <p className="text-sm text-gray-800 dark:text-gray-200">
                No credit card required to{" "}
                <a
                  className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                  href="#"
                >
                  {" "}
                  Get started
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
      {/* <!-- Features --> */}
      <div className="max-w-[85rem]   py-10   pt-0  ">
        {/* <!-- Tab Nav --> */}
        <nav
          className="lg:max-w-6xl   grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-4"
          aria-label="Tabs"
          role="tablist"
        >
          <button
            type="button"
            className="hs-tab-active:bg-gray-100 hs-tab-active:hover:border-transparent text-center md:text-left hover:bg-gray-100 p-3 md:p-5 w-fit rounded-xl dark:hs-tab-active:bg-white/[.05] dark:hover:bg-gray-700 active"
            id="tabs-with-card-item-1"
            data-hs-tab="#tabs-with-card-1"
            aria-controls="tabs-with-card-1"
            role="tab"
          >
            <span className="md:flex">
              <div>
                <img
                  className="w-20 lg:w-40"
                  src="https://cdn-icons-png.flaticon.com/128/10147/10147342.png"
                />
              </div>
              <span className="md:grow md:ml-5">
                <span className="hs-tab-active:text-blue-600 block font-semibold text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                  Free
                </span>
                <span className="hidden lg:block mt-2 text-gray-800 dark:text-gray-200">
                  These products are free of charge. However under rare
                  circustances, based on other factors like usage, you may hve
                  to upgrade your subscription
                </span>
              </span>
            </span>
          </button>

          <button
            type="button"
            className="hs-tab-active:bg-gray-100 hs-tab-active:hover:border-transparent text-center md:text-left hover:bg-gray-100 p-3 md:p-5 w-fit rounded-xl dark:hs-tab-active:bg-white/[.05] dark:hover:bg-gray-700 active"
            id="tabs-with-card-item-2"
            data-hs-tab="#tabs-with-card-2"
            aria-controls="tabs-with-card-2"
            role="tab"
          >
            <span className="md:flex">
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10016/10016918.png"
                  className="w-20 lg:w-40"
                />
              </div>
              <span className="md:grow md:ml-5">
                <span className="hs-tab-active:text-blue-600 block font-semibold text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                  Subscriptions
                </span>
                <span className="hidden lg:block mt-2 text-gray-800 dark:text-gray-200">
                  These services works on a subscription basis and you would be
                  obliged to manage your account in order to enjoy all the perks
                </span>
              </span>
            </span>
          </button>

          <button
            type="button"
            className="hs-tab-active:bg-gray-100 hs-tab-active:hover:border-transparent text-center md:text-left hover:bg-gray-100 p-3 md:p-5 w-fit rounded-xl dark:hs-tab-active:bg-white/[.05] dark:hover:bg-gray-700 active"
            id="tabs-with-card-item-3"
            data-hs-tab="#tabs-with-card-3"
            aria-controls="tabs-with-card-3"
            role="tab"
          >
            <span className="md:flex">
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9783/9783157.png"
                  className="w-20 lg:w-40"
                />
              </div>
              <span className="md:grow md:ml-5">
                <span className="hs-tab-active:text-blue-600 block font-semibold text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">
                  Service fees
                </span>
                <span className="hidden lg:block mt-2 text-gray-800 dark:text-gray-200">
                  These services are not on a subscription basis, but requires
                  you pay pay for consuming them after consumption
                </span>
              </span>
            </span>
          </button>
        </nav>
        {/* <!-- End Tab Nav --> */}

        {/* <!-- Tab Content --> */}
        <div className="mt-12 md:mt-16">
          <div
            id="tabs-with-card-1"
            role="tabpanel"
            aria-labelledby="tabs-with-card-item-1"
          >
            {/* <!-- Card Section --> */}
            <div className="  py-10    border-b lg:py-14 mx-auto">
              {/* <!-- Grid --> */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* <!-- Card --> */}
                <a
                  className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
                  href="#"
                >
                  <div className="p-4 md:p-5">
                    <div className="flex">
                      <div>
                        <img
                          className="w-14"
                          src="https://cdn-icons-png.flaticon.com/128/2922/2922461.png"
                        />
                      </div>

                      <div className="grow ml-5">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                          useraccountdashboard Home
                        </h3>
                        <p className="text-sm text-gray-500  ">
                          The idea package for those in the ecosystem for
                          non-commercial reasons
                          <BsArrowRight className=" hover:text-blue-500 -mt-4  ml-auto" />
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
                      <div>
                        <img
                          className="w-12 mt-1"
                          src="https://cdn-icons-png.flaticon.com/128/3518/3518585.png"
                        />
                      </div>

                      <div className="grow ml-5">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                          useraccountdashboard Server
                        </h3>
                        <p className="text-sm text-gray-500  ">
                          Connecting you to the internet and the
                          internet-of-things
                          <BsArrowRight className=" hover:text-blue-500 -mt-4  ml-auto" />
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
                      <div>
                        <img
                          className="w-12 mt-2"
                          src="https://cdn-icons-png.flaticon.com/128/4207/4207230.png"
                        />
                      </div>

                      <div className="grow ml-5">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                          Verse
                        </h3>
                        <p className="text-sm text-gray-500  ">
                          The wrapper for the entire ecosystem, allowing you to
                          integrate seamlessly
                          <BsArrowRight className=" hover:text-blue-500 -mt-4  ml-auto" />
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
                      <div>
                        <img
                          className="w-12  "
                          src="https://cdn-icons-png.flaticon.com/128/8695/8695341.png"
                        />
                      </div>

                      <div className="grow ml-5">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                          useraccountdashboard Entities
                        </h3>
                        <p className="text-sm text-gray-500  ">
                          Account creation and credibility checking in the
                          Rodlip Ecosystem
                          <BsArrowRight className=" hover:text-blue-500 -mt-4  ml-auto" />
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
                {/* <!-- End Card --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Card Section --> */}
          </div>

          <div
            id="tabs-with-card-2"
            className="hidden"
            role="tabpanel"
            aria-labelledby="tabs-with-card-item-2"
          >
            {/* <!-- Card Section --> */}
            <div className="  py-10    border-b lg:py-14 mx-auto">
              {/* <!-- Grid --> */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* <!-- Card --> */}
                <a
                  className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
                  href="#"
                >
                  <div className="p-4 md:p-5">
                    <div className="flex">
                      <div>
                        <img
                          className="w-14"
                          src="https://cdn-icons-png.flaticon.com/128/639/639394.png"
                        />
                      </div>

                      <div className="grow ml-5">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                          useraccountdashboard Office
                        </h3>
                        <p className="text-sm text-gray-500  ">
                          A highly integrated productivy software platform for
                          SMEs
                          <BsArrowRight className=" hover:text-blue-500 -mt-4  ml-auto" />
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
                      <div>
                        <img
                          className="w-12 mt-1"
                          src="https://cdn-icons-png.flaticon.com/128/3518/3518585.png"
                        />
                      </div>

                      <div className="grow ml-5">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                          useraccountdashboard College
                        </h3>
                        <p className="text-sm text-gray-500  ">
                          An Office equivalent to the education sector
                          <BsArrowRight className=" hover:text-blue-500 -mt-4  ml-auto" />
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
                      <div>
                        <img
                          className="w-12 mt-2"
                          src="https://cdn-icons-png.flaticon.com/128/679/679744.png"
                        />
                      </div>

                      <div className="grow ml-5">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                          useraccountdashboard Stores
                        </h3>
                        <p className="text-sm text-gray-500  ">
                          Allowing SMEs to add another distribution channel
                          <BsArrowRight className=" hover:text-blue-500 -mt-4  ml-auto" />
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
                      <div>
                        <img
                          className="w-12  "
                          src="https://cdn-icons-png.flaticon.com/128/1086/1086916.png"
                        />
                      </div>

                      <div className="grow ml-5">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                          useraccountdashboard Sites
                        </h3>
                        <p className="text-sm text-gray-500  ">
                          Website creation for people, oganizations, departments
                          and offices
                          <BsArrowRight className=" hover:text-blue-500 -mt-4  ml-auto" />
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
                {/* <!-- End Card --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Card Section --> */}
          </div>

          <div
            id="tabs-with-card-3"
            className="hidden px-0"
            role="tabpanel"
            aria-labelledby="tabs-with-card-item-3"
          >
            {/* <!-- Card Section --> */}
            <div className="  py-10    border-b lg:py-14 mx-auto">
              {/* <!-- Grid --> */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* <!-- Card --> */}
                <a
                  className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
                  href="#"
                >
                  <div className="p-4 md:p-5">
                    <div className="flex">
                      <div>
                        <img
                          className="w-10"
                          src="https://cdn-icons-png.flaticon.com/128/679/679744.png"
                        />
                      </div>

                      <div className="grow ml-5">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                          useraccountdashboard Insurance
                        </h3>
                        <p className="text-sm text-gray-500  ">
                          Top-notch insurance packages the whole industry
                          <BsArrowRight className=" hover:text-blue-500 -mt-4  ml-auto" />
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
                      <div>
                        <img
                          className="w-12 mt-2"
                          src="https://cdn-icons-png.flaticon.com/128/819/819865.png"
                        />
                      </div>

                      <div className="grow ml-5">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                          useraccountdashboard Locations
                        </h3>
                        <p className="text-sm text-gray-500  ">
                          Integrate locations into your marketing and
                          advertising
                          <BsArrowRight className=" hover:text-blue-500 -mt-4  ml-auto" />
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
                      <div>
                        <img
                          className="w-12 mt-2"
                          src="https://cdn-icons-png.flaticon.com/128/2907/2907972.png"
                        />
                      </div>

                      <div className="grow ml-5">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                          useraccountdashboard Advertising
                        </h3>
                        <p className="text-sm text-gray-500  ">
                          Advertise your brand and products to the global
                          audience.
                          <BsArrowRight className=" hover:text-blue-500 -mt-4  ml-auto" />
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
                {/* <!-- End Card --> */}
              </div>
              {/* <!-- End Grid --> */}
            </div>
            {/* <!-- End Card Section --> */}
          </div>
        </div>
        {/* <!-- End Tab Content --> */}
      </div>
      {/* <!-- End Features --> */}
      <div className="grid lg:grid-cols-2 lg:w-full gap-4 sm:gap-6">
        {/* <!-- Card --> */}
        <a
          onClick={() =>
            user?._id &&
            handleQuickNavigate("subscriptions/manage/payment-methods", {
              _id: user?._id,
              token: user?.token,
            })
          }
          className="group cursor-pointer flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
        >
          <div className="p-4 md:p-5">
            <div className="flex">
              <div className="grow space-y-3 ml-5">
                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                  Payment methods
                </h3>
                <p className="text-sm text-gray-500">
                  Payment methods are saved in your useraccountdashboard Account
                  so you can use them in ecosystem, like Office
                </p>
              </div>
            </div>
          </div>
          <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
            <p className="w-60">Manage payment methods</p>
            <div className="flex ml-auto gap-2">
              <div>
                <HiOutlineChevronRight className="text-2xl" />
              </div>
            </div>
          </div>
        </a>
        {/* <!-- Card --> */}
        {/* <!-- Card --> */}
        <div className="group flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800">
          <div className="p-4 md:p-5">
            <div className="flex">
              <div className="grow space-y-3 ml-5">
                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                  Purchases
                </h3>
                <p className="text-sm text-gray-500">
                  Your purchases, including deliveries and other online orders,
                  made using Stores
                </p>
              </div>
            </div>
          </div>
          <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
            <p className="w-60">Manage purchases</p>
            <div className="flex ml-auto gap-2">
              <div>
                <HiOutlineChevronRight className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Card --> */}
        {/* <!-- Card --> */}
        <a
          onClick={() =>
            user?._id &&
            handleQuickNavigate("subscriptions/manage/account-storage", {
              _id: user?._id,
              token: user?.token,
            })
          }
          className="group cursor-pointer  flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
        >
          <div className="p-4 md:p-5">
            <div className="flex">
              <div className="grow space-y-3 ml-5">
                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                  Account storage
                </h3>
                <p className="text-sm text-gray-500">
                  Your account storage is in the useraccountdashboard ecosystem{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
            <p className="w-60">Manage storage</p>
            <div className="flex ml-auto gap-2">
              <div>
                <HiOutlineChevronRight className="text-2xl" />
              </div>
            </div>
          </div>
        </a>
        {/* <!-- Card --> */}
        {/* <!-- Card --> */}
        <div className="group flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800">
          <div className="p-4 md:p-5">
            <div className="flex">
              <div className="grow space-y-3 ml-5">
                <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                  Subscriptions
                </h3>
                <p className="text-sm text-gray-500">
                  Your recurring payments for subscription services, like
                  Sites,Stores,etc
                </p>
              </div>
            </div>
          </div>
          <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
            <p className="w-60">Manage subscriptions</p>
            <div className="flex ml-auto gap-2">
              <div>
                <HiOutlineChevronRight className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Card --> */}
      </div>
    </div>
  );
}
