import React from "react";
import { account_server } from "../../../../utils/urls";
import dynamic from "next/dynamic";

const HomePage = dynamic(
  () => import("@/components/page-components/HomePage"),
  {
    ssr: false,
  }
);
export default async function page({ params, searchParams }: any) {
  const token = searchParams.authenticationToken;
  const id = params.user_id;
  const user = await fetchUser(id, token);
  return (
    <div className="  px-10">
      <HomePage user={user} />
    </div>
  );
}
async function fetchUser(id: string, token: string) {
  try {
    const stringDataPromises = [
      "image",
      "banner",
      "_id",
      "username",
      "email",
      "access_key",
      "description",
      "organization_type",
      "industry",
    ].map(async (object_key) => {
      const response = await fetch(
        `${account_server}/fetch-single-data-strings/_id/${id}/${object_key}`,
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
        try {
          const text = await response.text();
          const json = text ? JSON.parse(text) : null;
          //console.log(json);
          return { [object_key]: json };
        } catch (jsonError) {
          console.log("Error parsing JSON:", jsonError);
          return { [object_key]: null };
        }
      }

      return { [object_key]: null };
    });

    const objectDataPromises = [
      "permissions",
      "location_information",
      "phone_number_information",
      "email_address_information",
      "backup_info",
      "security_info",
    ].map(async (object_key) => {
      const response = await fetch(
        `${account_server}/fetch-single-data-objects/_id/${id}/${object_key}`,
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
        try {
          const text = await response.text();
          const json = text ? JSON.parse(text) : null;
          //console.log(json);
          return { [object_key]: json };
        } catch (jsonError) {
          console.log("Error parsing JSON:", jsonError);
          return { [object_key]: null };
        }
      }

      return { [object_key]: null };
    });

    const [stringData, objectData] = await Promise.all([
      Promise.all(stringDataPromises),
      Promise.all(objectDataPromises),
    ]);

    // Combine the results into a single object
    const userData = {
      ...Object.assign({}, ...stringData),
      ...Object.assign({}, ...objectData),
    };

    return userData;
  } catch (error: any) {
    console.log(error.message);
    return {};
  }
}
