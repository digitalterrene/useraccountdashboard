"use client";
import React from "react";
import { AdminTabs } from "@/components/ui-components/administration/AdminTabs";

export default function PeopleAndSharingConfigs({ user }) {
  const { _id, ...otherInfo } = user;
  return (
    <div className=" w-full ">
      <AdminTabs stakeholders={otherInfo || []} />
    </div>
  );
}
