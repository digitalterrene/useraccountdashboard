import dynamic from "next/dynamic";
import React from "react";
import { account_server } from "../../../../../utils/urls";
const AppsAndServices = dynamic(
  () => import("@/components/page-components/data-and-privacy/AppsAndServices"),
  {
    ssr: false,
  }
);

export default async function page({ params, searchParams }: any) {
  const token = searchParams.authenticationToken;
  const id = params.user_id;
  const apps_and_services = await fetchUser(id, token);
  return (
    <div>
      <AppsAndServices apps_and_services={apps_and_services} />
    </div>
  );
}
async function fetchUser(id: string, token: string) {
  const response = await fetch(
    `${account_server}/fetch-single-data-objects/data_and_privacy/_id/${id}/apps_and_services`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: `Bearer ${token}`,
        useraccountdashboard_account_user_id: `${id}`,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  if (response.ok) {
    const json = response.json();
    return json;
  }
  return {};
}
