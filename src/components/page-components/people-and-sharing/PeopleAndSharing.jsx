"use client";
import { stakeholders_to_share_with } from "@/assets/data";
import { useAuthContext } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";

import { TbMoodNerd } from "react-icons/tb";
import useNavigation from "../../../../utils/handleNavigate";
import { Tooltip } from "@material-tailwind/react";
export default function PeopleAndSharing({ configurations }) {
  const { user } = useAuthContext();
  const { handleQuickNavigate } = useNavigation();

  useEffect(() => {
    import("preline");
  }, []);
  return (
    <div className="p-10 px-0 space-y-10  lg: px-6">
      <div className="lg:flex flex-wrap   justify-between gap-4 ">
        <div className=" lg:w-7/12">
          <p className="text-xl font-bold text-gray-800  mb-4">
            Share only when necessary
          </p>
          <p>
            Entities you interact with and the info you make visible on
            useraccountdashboard ecosystem
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
              <TbMoodNerd className="  text-3xl" />

              <p className="text-sm text-gray-800 dark:text-gray-200">
                Curious about how sharing is conducted
                <a
                  className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                  href="#"
                >
                  {" "}
                  Learn here
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
        <a
          className="group flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
          href="#"
        >
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
        </a>
        {/* <!-- Card --> */}
      </div>
      {/* <!-- Features --> */}
      <div className="max-w-[85rem] px-4 bg-gray-50 sm:px-6 lg:px-8   mx-auto">
        {/* <!-- Grid --> */}
        <div className=" ">
          {/* <!-- Icon Blocks --> */}
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-10">
              {/* <!-- Card --> */}
              <a className="w-full cursor-pointer h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
                <div className="flex items-center gap-x-4 mb-3">
                  <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/10329/10329259.png"
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
                      Management
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Entities with management previleges on your dashboard
                </p>
              </a>
              {/* <!-- End Card --> */}

              {/* <!-- Card --> */}
              <a className="w-full cursor-pointer bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
                <div className="flex items-center gap-x-4 mb-3">
                  <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/9576/9576233.png"
                      className="w-6 h-6 text-blue-600 grayscale dark:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
                      Employees
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Entities with employees previleges on your dashboard
                </p>
              </a>
              {/* <!-- End Card --> */}

              {/* <!-- Card --> */}
              <a className="w-full cursor-pointer h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
                <div className="flex items-center gap-x-4 mb-3">
                  <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1969/1969057.png"
                      className="w-6 h-6 text-blue-600 grayscale dark:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
                      Participants
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Entities you have allowed to interact with your dashboard
                </p>
              </a>
              {/* <!-- End Card --> */}

              {/* <!-- Card --> */}
              <a className="w-full cursor-pointer h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
                <div className="flex items-center gap-x-4 mb-3">
                  <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/11481/11481703.png"
                      className="w-6 h-6 text-blue-600 grayscale dark:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
                      Participations
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Entities that have allowed you to interact with them
                </p>
              </a>
              {/* <!-- End Card --> */}

              {/* <!-- Card --> */}
              <a className="w-full cursor-pointer h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
                <div className="flex items-center gap-x-4 mb-3">
                  <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/11526/11526969.png"
                      className="w-6 h-6 text-blue-600 grayscale dark:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
                      Legal Stakeholders
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  These entities have full read-only access to your dashboard
                </p>
              </a>
              {/* <!-- End Card --> */}

              {/* <!-- Card --> */}
              <a className="w-full cursor-pointer h-full bg-white shadow-lg rounded-lg p-5 dark:bg-slate-900">
                <div className="flex items-center gap-x-4 mb-3">
                  <div className="inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4 border-blue-50 bg-blue-100 dark:border-blue-900 dark:bg-blue-800">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/125/125468.png"
                      className="w-6 h-6 text-blue-600 grayscale dark:text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <h3 className="block text-lg font-semibold text-gray-800 dark:text-white">
                      Rodlip Registries
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  These registries have full control over your account
                </p>
              </a>
              {/* <!-- End Card --> */}
            </div>
          </div>
          {/* <!-- End Icon Blocks --> */}
        </div>
        {/* <!-- End Grid --> */}
      </div>
      {/* <!-- End Features --> */}
      {/* <!-- Table Section --> */}
      <div className="lg:max-w-[85rem] w-full  py-10 pt-0   lg:mx-auto">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="grid w-full gap-4 sm:gap-6">
            {/* <!-- Card --> */}
            <div className="group flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800">
              <div className="p-4 md:p-5">
                <div className="flex">
                  <div className="grow space-y-3 ml-5">
                    <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                      Security information
                    </h3>
                    <p className="text-sm text-gray-500">
                      This information is visible to the people and or entities
                      you whitelisted
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
                <p className="w-60">Password</p>
                <p className="">********</p>{" "}
                <div className="  ml-auto flex gap-4 grid-cols-6 items-center -space-x-4">
                  {stakeholders_to_share_with?.map((stake, i) => {
                    const sharePassword =
                      configurations?.[`share_password_with_${stake.name}`];

                    if (sharePassword) {
                      return (
                        <div key={i} className="col-start-2 mx-2 text-center">
                          <Tooltip
                            content={stake?.name?.replaceAll("_", " ")}
                            placement="bottom"
                          >
                            <img
                              key={i}
                              className=" hover:bg-gray-200 w-8 h-8  p-1 rounded-full"
                              src={stake?.icon}
                              alt={`Icon for ${stake.name}`}
                            />
                          </Tooltip>
                        </div>
                      );
                    }

                    return null;
                  })}{" "}
                </div>
              </div>
              <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
                <p className="w-60">Access Key</p>
                <p className="">********</p>{" "}
                <div className="  ml-auto flex gap-4 grid-cols-6 items-center -space-x-4">
                  {stakeholders_to_share_with?.map((stake, i) => {
                    const shareAccessKey =
                      configurations?.[`share_access_key_with_${stake.name}`];

                    if (shareAccessKey) {
                      return (
                        <div key={i} className="col-start-2 mx-2 text-center">
                          <Tooltip
                            content={stake?.name?.replaceAll("_", " ")}
                            placement="bottom"
                          >
                            <img
                              key={i}
                              className=" hover:bg-gray-200 w-8 h-8  p-1 rounded-full"
                              src={stake?.icon}
                              alt={`Icon for ${stake.name}`}
                            />
                          </Tooltip>
                        </div>
                      );
                    }

                    return null;
                  })}{" "}
                </div>
              </div>
              <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
                <p className="w-60">Security Key</p>
                <p className="">********</p>{" "}
                <div className="  ml-auto flex gap-4 grid-cols-6 items-center -space-x-4">
                  {stakeholders_to_share_with?.map((stake, i) => {
                    const shareSecurityKey =
                      configurations?.[`share_security_key_with_${stake.name}`];

                    if (shareSecurityKey) {
                      return (
                        <div key={i} className="col-start-2 mx-2 text-center">
                          <Tooltip
                            content={stake?.name?.replaceAll("_", " ")}
                            placement="bottom"
                          >
                            <img
                              key={i}
                              className=" hover:bg-gray-200 w-8 h-8  p-1 rounded-full"
                              src={stake?.icon}
                              alt={`Icon for ${stake.name}`}
                            />
                          </Tooltip>
                        </div>
                      );
                    }

                    return null;
                  })}{" "}
                </div>
              </div>
              <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
                <p className="w-60">Identification</p>
                <p className="">********</p>{" "}
                <div className="  ml-auto flex gap-4 grid-cols-6 items-center -space-x-4">
                  {stakeholders_to_share_with?.map((stake, i) => {
                    const shareIdentification =
                      configurations?.[`share_id_with_${stake.name}`];

                    if (shareIdentification) {
                      return (
                        <div key={i} className="col-start-2 mx-2 text-center">
                          <Tooltip
                            content={stake?.name?.replaceAll("_", " ")}
                            placement="bottom"
                          >
                            <img
                              key={i}
                              className=" hover:bg-gray-200 w-8 h-8  p-1 rounded-full"
                              src={stake?.icon}
                              alt={`Icon for ${stake.name}`}
                            />
                          </Tooltip>
                        </div>
                      );
                    }

                    return null;
                  })}{" "}
                </div>
              </div>{" "}
              <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
                <p className="w-60">Biometric Footprint</p>
                <p className="">********</p>{" "}
                <div className="  ml-auto flex gap-4 grid-cols-6 items-center -space-x-4">
                  {stakeholders_to_share_with?.map((stake, i) => {
                    const shareBiometrics =
                      configurations?.[`share_biometrics_with_${stake.name}`];

                    if (shareBiometrics) {
                      return (
                        <div key={i} className="col-start-2 mx-2 text-center">
                          <Tooltip
                            content={stake?.name?.replaceAll("_", " ")}
                            placement="right"
                          >
                            <img
                              key={i}
                              className=" hover:bg-gray-200 w-8 h-8  p-1 rounded-full"
                              src={stake?.icon}
                              alt={`Icon for ${stake.name}`}
                            />
                          </Tooltip>
                        </div>
                      );
                    }

                    return null;
                  })}{" "}
                </div>
              </div>
            </div>
            {/* <!-- Card --> */}
          </div>
          <div className="grid w-full gap-4 sm:gap-6">
            {/* <!-- Card --> */}
            <div className="group flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800">
              <div className="p-4 md:p-5">
                <div className="flex">
                  <div className="grow space-y-3 ml-5">
                    <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                      Configurations
                    </h3>
                    <p className="text-sm text-gray-500">
                      You can update the visibility of your sensitive data to
                      the desired people and or groups
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 h-fit border-t items-center px-10 flex    ">
                <img
                  className="w-56"
                  src="https://img.freepik.com/free-vector/brand-loyalty-concept-illustration_114360-15542.jpg?size=626&ext=jpg&ga=GA1.1.333512076.1694862058&semt=sph"
                />
              </div>
              <a
                onClick={() =>
                  user?._id &&
                  handleQuickNavigate("administration/configurations", {
                    _id: user?._id,
                    token: user?.token,
                  })
                }
                className="p-2 h-16 cursor-pointer border-t items-center px-10 flex   hover:bg-slate-50"
              >
                <p className="w-60">Update here</p>
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
    </div>
  );
}
