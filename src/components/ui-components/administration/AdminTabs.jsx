"use client";
import React, { useEffect, useState } from "react";
import AdminTable from "./AdminTable";
import { GrOrganization } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { LuLaptop2 } from "react-icons/lu";
import { IoCubeOutline, IoSearch } from "react-icons/io5";
import { account_server } from "../../../../utils/urls";
import { useAuthContext } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { SlRefresh } from "react-icons/sl";
import("flowbite");
import {
  useCreateNewOrEditOld,
  useHandleCreateNewOrEditOldInputs,
} from "@/context";

export function AdminTabs({ stakeholders }) {
  const { user: local_user } = useAuthContext();
  useEffect(() => {
    import("preline");
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const { inputs: global_inputs } = useHandleCreateNewOrEditOldInputs();
  const { isCreatingNew, togleIsCreatingNew } = useCreateNewOrEditOld();
  const [inputs, setInputs] = useState(isCreatingNew ? {} : global_inputs);
  const [activeTab, setActiveTab] = useState({
    name: "management",
    icon: <GrOrganization />,
  });
  //console.log(stakeholders[activeTab?.name]);
  // const [inputs, setInputs] = useState(isNEw ? {} : global_inputs);

  useEffect(() => {
    isCreatingNew ? setInputs({}) : setInputs(global_inputs);
  }, [isCreatingNew, global_inputs]);

  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (event) => {
    event.preventDefault();

    // Perform the search logic
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = stakeholders?.name.filter((obj) => {
      for (const key in obj) {
        if (
          obj[key] &&
          obj[key].toString().toLowerCase().includes(lowerCaseSearchTerm)
        ) {
          return true;
        }
      }
      return false;
    });

    setSearchResults(results);
  };
  const handleRefresh = async () => {
    const id = toast.loading("Refreshing information...");
    let level_extention = "update-set-single-data-objects";

    stakeholders[activeTab?.name]?.forEach(async (element) => {
      const res = await fetch(
        `${account_server}/${level_extention}/${activeTab?.name}/_id/${local_user?._id}/_id/${element?._id}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${local_user?.token}`,
            useraccountdashboard_account_user_id: `${local_user?._id}`,
            "Content-Type": "application/json",
          },
          cache: "no-cache",
          body: JSON.stringify({
            key_to_update: activeTab?.name,
            update_method: "refresh",
            value_to_update: element,
          }),
        }
      );
      if (res.ok) {
        toast.update(id, {
          render: `Successfully updated ${activeTab?.name} data`,
          type: "success",
          isLoading: false,
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          toast.dismiss();
          location.reload();
        }, 3000);
      } else {
        toast.update(id, {
          render: `Failed to update ${activeTab?.name} data`,
          type: "error",
          isLoading: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
    setTimeout(() => {
      toast.dismiss();
    }, 6000);
  };
  return (
    <div value="dashboard" className=" p-8">
      <ToastContainer />
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex mx-auto text-gray-500  justify-between items-center  gap-3 space-x-2">
          <p className="  border-r pr-2 font-bold border-gray-800">
            Stakeholders
          </p>
          {[
            { name: "management", icon: <GrOrganization /> },
            { name: "employees", icon: <MdDashboard /> },
            { name: "participants", icon: <LuLaptop2 /> },
            { name: "participations", icon: <IoCubeOutline /> },
            { name: "legal_stakeholders", icon: <IoCubeOutline /> },
            { name: "rodlip_registries", icon: <IoCubeOutline /> },
          ]?.map(({ name, icon }, i) => (
            <button
              type="button"
              style={
                activeTab?.name === name
                  ? { borderBottom: "1px solid #0D99FF" }
                  : {}
              }
              onClick={() => setActiveTab({ icon, name })}
              className="  capitalize    py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap  hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active"
              id={`tabs-with-badges-item-${i}`}
            >
              <div className="text-xl">{icon}</div>
              {name.replaceAll("_", " ")}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-10 pl-0 flex gap-10 justify-between items-start">
        <div className=" flex gap-6 justify-end w-full  ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center"
          >
            <label for="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                {activeTab?.icon}
              </div>
              <input
                type="text"
                id="simple-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search ..."
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-[#0D99FF] rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>

          <button
            onClick={() => handleRefresh()}
            className="py-1.5 px-4   inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <SlRefresh />
            Refresh
          </button>

          <button
            data-hs-overlay="#hs-slide-down-animation-modal"
            onClick={() => {
              //console.log(isCreatingNew);
            }}
            className="py-1.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            Add New
          </button>
        </div>
      </div>
      {
        <div className="  py-4">
          {
            <AdminTable
              activeTab={activeTab}
              stakeholders={
                searchTerm
                  ? stakeholders?.[activeTab?.name]?.filter((obj) =>
                      Object.values(obj).some(
                        (value) =>
                          value &&
                          value
                            .toString()
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                      )
                    )
                  : stakeholders?.[activeTab?.name]
              }
            />
          }
        </div>
      }
    </div>
  );
}
