import dynamic from "next/dynamic";
import React from "react";
import { account_server } from "../../../../../utils/urls";
const MyAdCenter = dynamic(
  () => import("@/components/page-components/data-and-privacy/MyAdCenter"),
  {
    ssr: false,
  }
);
export default async function page({ params, searchParams }: any) {
  const token = searchParams.authenticationToken;
  const id = params.user_id;
  const my_ad_center = await fetchUser(id, token);
  return (
    <div>
      <MyAdCenter my_ad_center={my_ad_center} />
    </div>
  );
}
async function fetchUser(id: string, token: string) {
  const response = await fetch(
    `${account_server}/fetch-single-data-objects/data_and_privacy/_id/${id}/my_ad_center`,
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
