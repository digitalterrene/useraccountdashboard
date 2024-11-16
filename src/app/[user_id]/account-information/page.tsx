import React from "react";
import { account_server } from "../../../../utils/urls";
import dynamic from "next/dynamic";

const PersonalInformation = dynamic(
  () =>
    import(
      "@/components/page-components/personal-information/PersonalInformation"
    ),
  {
    ssr: false,
  }
);
export default async function page({ params, searchParams }: any) {
  const token = searchParams.authenticationToken;
  const id = params.user_id;
  const user = await fetchUser(id, token);
  return (
    <div>
      <PersonalInformation user={user} />
    </div>
  );
}
async function fetchUser(id: string, token: string) {
  try {
    const stringDataPromises = [
      "image",
      "name",
      "username",
      "extension",
      "organization_type",
      "founded_on",
      "founder",
      "password",
      "access_key",
      "security_key",
      "biometric_footprint",
      "tagline",
      "identification_number",
      "industries",
      "industry",
      "description",
      "_id",
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

    const objectDataPromises = ["other_information", "permissions"].map(
      async (object_key) => {
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
      }
    );

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
