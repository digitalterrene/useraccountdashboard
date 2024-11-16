"use client";
import React, { useState } from "react";
import { Tabs } from "flowbite-react";
import { MdDashboard, MdOutlineSpaceDashboard } from "react-icons/md";
import { LuLaptop2 } from "react-icons/lu";
import { GrOrganization } from "react-icons/gr";
import DetailsForm from "../account-information/DetailsForm";

export default function HomeTabs() {
  const [activeTab, setActiveTab] = useState("organization");

  return (
    <div className=" ">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex mx-auto max-w-2xl gap-3 space-x-2">
          {[
            { name: "about", icon: <GrOrganization /> },
            { name: "timeline", icon: <MdDashboard /> },
            { name: "settings", icon: <LuLaptop2 /> },
          ]?.map(({ name, icon }, i) => (
            <button
              type="button"
              style={
                activeTab === name ? { borderBottom: "1px solid blue" } : {}
              }
              onClick={() => setActiveTab(name)}
              className="  capitalize     py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active"
              id={`tabs-with-badges-item-${i}`}
            >
              <div className="text-xl">{icon}</div>
              {name}
            </button>
          ))}
        </nav>
      </div>
      {<div className=" py-4">{<DetailsForm activeTab={activeTab} />}</div>}
    </div>
  );
}
