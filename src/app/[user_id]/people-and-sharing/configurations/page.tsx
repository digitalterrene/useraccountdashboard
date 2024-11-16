import React from "react";
import { account_server } from "../../../../../utils/urls";
import dynamic from "next/dynamic";
const PeopleAndSharingConfigs = dynamic(
  () =>
    import(
      "@/components/page-components/people-and-sharing/PeopleAndSharingConfigs"
    ),
  {
    ssr: false,
  }
);

export default async function page({ params, searchParams }: any) {
  const token = searchParams.authenticationToken;
  const id = params.user_id;
  const configurations = await fetchUser(id, token);
  return (
    <div>
      <PeopleAndSharingConfigs configurations={configurations} />
    </div>
  );
}
async function fetchUser(id: string, token: string) {
  const response = await fetch(
    `${account_server}/fetch-single-data-objects/people_and_sharing/_id/${id}/configurations`,
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
