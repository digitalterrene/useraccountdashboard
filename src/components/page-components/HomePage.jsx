"use client";
import React, { useEffect, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { browserName } from "react-device-detect";
import CardLinks from "../ui-components/CardLinks";
import { account_server } from "../../../utils/urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useAuthContext } from "@/context/AuthContext";
import HomeTabs from "../ui-components/HomeTabs";
let level_extention = "update-set-single-data-strings";
import("flowbite");
export default function HomePage({ user }) {
  const [inputsArray, setInputsArray] = useState([]);
  const [updateInformation, setUpdateInformation] = useState({});
  const { user: local_user } = useAuthContext();
  const [inputs, setInputs] = useState({ ...user?.permissions });
  const [inputsSecurityInfo, setInputsSecurityInfo] = useState({
    ...user?.security_info,
  });
  const [deviceInfo, setDeviceInfo] = useState({});

  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const operatingSystem = navigator.platform;
    const getLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const { city, region, country_name, ip } = data;
        const location = `${city}, ${region}, ${country_name}`;
        return { location, ip };
      } catch (error) {
        console.error("Error fetching location data:", error);
        return { location: "Not Available", ip: "Not Available" };
      }
    };

    getLocation().then(({ location, ip }) => {
      const info = {
        browser_name: browserName,
        ip,
        location,
        operatingSystem,
      };
      setDeviceInfo(info);
    });
  }, []);
  const updateImages = async (key_to_update, value_to_update) => {
    let level_extention = "update-set-single-data-strings";
    let ressolved_value_to_update = value_to_update;

    if (key_to_update === "image" || key_to_update === "banner") {
      if (value_to_update === undefined) {
        return { error: "Please select at least one image" };
      }

      if (
        value_to_update.type === "image/jpeg" ||
        value_to_update.type === "image/png"
      ) {
        try {
          const data = new FormData();
          data.append("file", value_to_update);
          data.append(
            "upload_preset",
            `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
          );
          data.append(
            "cloud_name",
            `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
          );

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "post",
              body: data,
            }
          );

          const imageData = await response.json();
          ressolved_value_to_update = `${imageData.secure_url.toString()}`;
          //alert(`${imageData.secure_url.toString()}`);
        } catch (err) {
          return { error: `${err} ` };
        }
      } else {
        return { error: "Please select at least one image" };
      }
    }

    try {
      const res = await fetch(
        `${account_server}/${level_extention}/_id/${user?._id}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${local_user?.token}`,
            useraccountdashboard_account_user_id: `${local_user?._id}`,
            "Content-Type": "application/json",
          },
          mode: "cors",
          cache: "no-cache",
          body: JSON.stringify({
            key_to_update: key_to_update,
            value_to_update: ressolved_value_to_update,
          }),
        }
      );

      const json = await res.json();

      if (res.ok) {
        toast.success(`${key_to_update} updated successfully !`, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          location.reload();
        }, 5000);
      } else {
        toast.error(`${json.error} `, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      // Handle errors from the fetch request to the backend
      console.error(error);
      return { error: "An error occurred while updating data" };
    }
  };

  useEffect(() => {
    import("preline");
  }, []);

  return (
    <div className="  ">
      <ToastContainer />
      <div className="  w-full ">
        <div
          style={{
            backgroundImage: `url(${
              user?.banner ||
              "https://img.freepik.com/free-photo/texture-white-wooden-boards_1232-342.jpg?size=626&ext=jpg&ga=GA1.1.1135384207.1703006759&semt=ais"
            })`,
          }}
          className="group  w-full bg-center bg-no-repeat rounded-lg flex justify-end  p-3 bg-cover h-64"
        >
          <form className="mt-2">
            <label className="block relative">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                onChange={(e) => updateImages("banner", e.target.files[0])}
                className="absolute inset-0 opacity-0"
                accept="image/*"
              />
              <button
                type="button"
                className="py-2 ml-auto h-fit  bg-white   hidden group-hover:inline-flex w-fit px-4  items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <FiEdit3 className="text-xl" /> Banner
              </button>
            </label>
          </form>
        </div>
        <div className=" -mt-12 bg-black/60 w-fit space-x-2 p-4 py-1 rounded-xl h-fit  justify-center items-center flex ml-6    ">
          <div
            className=" bg-center bg-cover bg-[#131921] bg-no-repeat group-avatar border   w-14 h-14 rounded-xl"
            style={{
              backgroundImage: user?.image
                ? `url(${user?.image})`
                : `url("https://cdn-icons-png.flaticon.com/128/3177/3177440.png")`,
            }}
          ></div>

          <div className="  text-white p-3 text-lg h-fit capitalize font-medium  ">
            {user?.username || "Username"}
            <p className="text-sm">{user?.industry || "Industry"}</p>
          </div>
        </div>
        {/* here */}
      </div>
      <div className="p-10  lg:px-6 px-0 lg:flex gap-10 w-full justify-between">
        <div className="w-full lg:w-1/3 space-y-6">
          {" "}
          <div className="bg-white h-fit overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Profile Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {user?.description || "description"}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Username
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.username || "username"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.email || "email"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Access Key
                  </dt>
                  <dd className="mt-1 text-sm w-32 truncate text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.access_key || "access_key"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="bg-white h-fit  overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Business Profiling
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                In order to label your dashboars for promoting branding, these
                labels aim to describe you
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 gap-32 sm:px-6">
                  <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                    Organization Type
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.organization_type || "organization_type"}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 gap-32 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Industry
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {user?.industry || "industry"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          <HomeTabs user={user} />
        </div>
      </div>
      <div className="  lg:px-8">
        <CardLinks />
      </div>
    </div>
  );
}
