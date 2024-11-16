import dynamic from "next/dynamic";
import React from "react";
import { account_server } from "../../../../../../utils/urls";
const ManagePaymentMethods = dynamic(
  () =>
    import("@/components/page-components/subscriptions/ManagePaymentMethods"),
  {
    ssr: false,
  }
);
export default async function page({ params, searchParams }: any) {
  const token = searchParams.authenticationToken;
  const id = params.user_id;
  const payment_details = await fetchUser(id, token);
  return (
    <div>
      <ManagePaymentMethods payment_details={payment_details} />
    </div>
  );
}
async function fetchUser(id: string, token: string) {
  const response = await fetch(
    `${account_server}/fetch-single-data-objects/subscriptions/_id/${id}/payment_details`,
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
