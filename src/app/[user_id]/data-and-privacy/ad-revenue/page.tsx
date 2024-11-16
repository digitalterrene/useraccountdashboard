import dynamic from "next/dynamic";
import React from "react";
import { account_server } from "../../../../../utils/urls";
const AdRevenue = dynamic(
  () => import("@/components/page-components/data-and-privacy/AdRevenue"),
  {
    ssr: false,
  }
);
export default async function page({ params, searchParams }: any) {
  const token = searchParams.authenticationToken;
  const id = params.user_id;
  const ad_revenue = await fetchUser(id, token);
  return (
    <div>
      <AdRevenue ad_revenue={ad_revenue} />
    </div>
  );
}
async function fetchUser(id: string, token: string) {
  const response = await fetch(
    `${account_server}/fetch-single-data-objects/data_and_privacy/_id/${id}/ad_revenue`,
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
