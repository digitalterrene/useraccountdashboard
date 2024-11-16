"use client";
import React, { useState } from "react";
import { TbUserSquareRounded } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import AboutTab from "./home/AboutTab";
import SettingsTab from "./home/SettingsTab";
import "preline";

export default function HomeTabs({ user }: any) {
  return (
    <div className="w-full">
      <div className="flex">
        <div className="flex bg-gray-100 hover:bg-gray-200 rounded-lg transition p-1 dark:bg-neutral-700 dark:hover:bg-neutral-600">
          <nav
            className="flex gap-x-1"
            aria-label="Tabs"
            role="tablist"
            aria-orientation="horizontal"
          >
            <button
              type="button"
              className="hs-tab-active:bg-white hs-tab-active:text-blue-600   hs-tab-active:dark:bg-neutral-800 hs-tab-active:dark:text-neutral-400 dark:hs-tab-active:bg-gray-800 py-2 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-white dark:focus:text-white active"
              id="segment-item-1"
              aria-selected="true"
              data-hs-tab="#segment-1"
              aria-controls="segment-1"
              role="tab"
            >
              <div className="text-xl">
                <TbUserSquareRounded />
              </div>
              About
            </button>
            <button
              type="button"
              className="hs-tab-active:bg-white hs-tab-active:text-blue-600   hs-tab-active:dark:bg-neutral-800 hs-tab-active:dark:text-neutral-400 dark:hs-tab-active:bg-gray-800 py-2 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-white dark:focus:text-white"
              id="segment-item-2"
              aria-selected="false"
              data-hs-tab="#segment-2"
              aria-controls="segment-2"
              role="tab"
            >
              <div className="text-xl">
                <IoSettingsOutline />
              </div>
              Settings
            </button>
          </nav>
        </div>
      </div>

      <div className="mt-3">
        <div id="segment-1" role="tabpanel" aria-labelledby="segment-item-1">
          <AboutTab user={user} />
        </div>
        <div
          id="segment-2"
          className="hidden"
          role="tabpanel"
          aria-labelledby="segment-item-2"
        >
          <SettingsTab user={user} />
        </div>
      </div>
    </div>
  );
}
