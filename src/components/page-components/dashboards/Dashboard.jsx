"use client";
import React, { useEffect, useState } from "react";
import {
  HiAdjustments,
  HiOutlineMail,
  HiOutlineVideoCamera,
} from "react-icons/hi";
import {
  IoFingerPrintSharp,
  IoKeyOutline,
  IoScanOutline,
} from "react-icons/io5";
import {
  blogs_forms,
  blogs_forms_inputs,
  entities_forms,
  entities_forms_inputs,
  home_forms,
  home_forms_inputs,
  office_forms,
  office_forms_inputs,
  sites_forms,
  sites_forms_inputs,
  stores_forms,
  stores_forms_inputs,
} from "../../../../utils/dashboard/forms";
import FormComponent from "./Form";
import { account_server } from "../../../../utils/urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "@/context/AuthContext";
import useNavigation from "../../../../utils/handleNavigate";
import { FiEdit3 } from "react-icons/fi";

let level_extention = "update-set-single-data-strings";
export default function Dashboard({ dashboard, dashboards }) {
  const { handleQuickNavigate } = useNavigation();
  const [editThisData, setEditThisData] = useState(false);
  const [activeTab, setActiveTab] = useState(dashboards[0]);

  const [data_to_map, setDataToMap] = useState(
    dashboard === "entities"
      ? entities_forms
      : dashboard === "blogs"
      ? blogs_forms
      : dashboard === "office"
      ? office_forms
      : dashboard === "home"
      ? home_forms
      : dashboard === "sites"
      ? sites_forms
      : dashboard === "stores"
      ? stores_forms
      : []
  );
  // const removing unwanted data from the active tab
  const { _id, password, email, access_key, security_key, ...otherData } =
    activeTab || {};
  // const [inputs, setInputs] = useState(
  //   dashboard === "entities"
  //     ? entities_forms_inputs
  //     : dashboard === "blogs"
  //     ? blogs_forms_inputs
  //     : dashboard === "office"
  //     ? office_forms_inputs
  //     : dashboard === "home"
  //     ? home_forms_inputs
  //     : dashboard === "sites"
  //     ? sites_forms_inputs
  //     : dashboard === "stores"
  //     ? stores_forms_inputs
  //     : {}
  // );

  const [whatToEdit, setWhatToEdit] = useState(null);
  const { user } = useAuthContext();
  const [inputs, setInputs] = useState(
    dashboard === "entities"
      ? { ...entities_forms_inputs }
      : dashboard === "blogs"
      ? { ...blogs_forms_inputs }
      : dashboard === "office"
      ? { ...office_forms_inputs }
      : dashboard === "home"
      ? { ...home_forms_inputs }
      : dashboard === "sites"
      ? { ...sites_forms_inputs }
      : dashboard === "stores"
      ? { ...stores_forms_inputs }
      : {}
  );

  const updateImages = async (key_to_update, value_to_update) => {
    const id = toast.loading("Loading...");
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
        `${account_server}/${level_extention}/_id/${activeTab?._id}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${user?.token}`,
            useraccountdashboard_account_user_id: `${user?._id}`,
            super_user: `${user?._id}`,
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
        toast.update(id, {
          render: `${key_to_update} updated successfully !`,
          type: "success",
          isLoading: false,
          position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
          location.reload();
        }, 5000);
      } else {
        toast.update(id, {
          render: `${json.error}`,
          type: "error",
          isLoading: false,
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      // Handle errors from the fetch request to the backend
      toast.update(id, {
        render: "An error occurred while updating data",
        type: "error",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      console.error(error);
      return { error: "An error occurred while updating data" };
    }
  };

  const createNewDashboard = async () => {
    const id = toast.loading(`Updating ${dashboard} information...`);

    const res = await fetch(
      `${account_server}/update-set-single-data-objects/_id/${user?._id}/`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${user?.token}`,
          useraccountdashboard_account_user_id: `${user?._id}`,
          "Content-Type": "application/json",
        },
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify({
          key_to_update: `${dashboard}`,
          value_to_update: inputs,
        }),
      }
    );
    const json = await res.json();
    if (res.ok) {
      toast.update(id, {
        render: `Successfully updated ${dashboard} information`,
        type: "success",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        toast.dismiss();
        location.reload();
      }, 2000);
    } else {
      toast.update(id, {
        render: `${json.error}`,
        type: "error",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setTimeout(() => {
      toast.dismiss();
    }, 6000);
  };

  return (
    <div className="  space-y-8 px-6   mx-auto">
      <ToastContainer />
      {/* <!-- Grid --> */}

      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          {dashboards?.map((d, i) => (
            <button
              key={i}
              type="button"
              style={
                activeTab?.username === d?.username
                  ? { borderBottom: "1px solid #0D99FF" }
                  : {}
              }
              onClick={() => setActiveTab(d)}
              className="  capitalize    py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap  hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-blue-500 active"
              id={`tabs-with-badges-item-${i}`}
            >
              {d?.image && (
                <img
                  src={d?.image}
                  className="h-8 w-8 object-cover object-center"
                />
              )}
              {d?.username}
            </button>
          ))}
        </div>
        <div className="flex gap-6 w-fit ml-auto">
          <button
            type="button"
            onClick={() => {
              user?._id &&
                handleQuickNavigate(
                  `dashboards/${dashboard}/create-dashboard`,
                  user
                );
            }}
            className="py-1 px-3 inline-flex justify-center items-center  rounded-md  bg-gray-50 hover:border-transparent font-semibold  text-gray-700 border border-dashed hover:gray-200 focus:outline-none focus:ring-2 focus:outline-blue-500 border focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
          >
            Add New
          </button>
        </div>
      </div>
      <div className="  w-full ">
        <div
          style={{
            backgroundImage: `url(${
              activeTab?.banner ||
              "https://img.freepik.com/free-photo/texture-white-wooden-boards_1232-342.jpg?size=626&ext=jpg&ga=GA1.1.1135384207.1703006759&semt=ais"
            })`,
          }}
          className="group w-full bg-center bg-no-repeat  flex justify-end  p-3 bg-cover h-52"
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
                className="py-2 ml-auto h-fit  hidden group-hover:inline-flex w-fit px-4  items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <FiEdit3 className="text-xl" /> Banner
              </button>
            </label>
          </form>
        </div>
        <div className=" -mt-20  w-full flex  p-10 ">
          <form className=" ">
            <label className="block relative">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                onChange={(e) => updateImages("image", e.target.files[0])}
                // onChange={(e) => postImage(e.target.files[0])}
                className="absolute inset-0 opacity-0"
                accept="image/*"
              />
              <div
                className=" bg-center bg-cover bg-[#131921] bg-no-repeat group-avatar border mb-4 w-20 h-20 rounded-xl"
                style={{
                  backgroundImage: activeTab?.image
                    ? `url(${activeTab?.image})`
                    : `url("https://cdn-icons-png.flaticon.com/128/3177/3177440.png")`,
                }}
              ></div>
            </label>
          </form>

          <div className="  p-3 text-xl space-y-4 capitalize font-medium  ">
            {activeTab?.username || "Username"}
            <p className="text-sm">{activeTab?.industry || "Industry"}</p>
          </div>
        </div>
        {/* here */}
      </div>
      <div className="relative   md:grid md:grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6">
        {data_to_map?.map(({ icon, name, keys }, i) => (
          <div
            key={i}
            className="flex flex-col border h-[560px] rounded-xl p-3 dark:border-gray-700"
          >
            <FormComponent
              name={name}
              icon={icon}
              keys={keys}
              _id={_id}
              editThisData={editThisData}
              whatToEdit={whatToEdit}
              inputs={{
                ...inputs,
                ...dashboards.find(
                  (dashboard) => dashboard._id === activeTab?._id
                ),
              }}
              setInputs={setInputs}
            />
          </div>
        ))}
      </div>
      <div className="grid gap-12 border-b pb-6 ">
        <div className="">
          <h4 className="text-xl text-gray-800 font-bold capitalize  dark:text-white">
            Additional Information
          </h4>
          <p className="mt-3 text-gray-800 dark:text-gray-400">
            Your entities dashboard is currently configured to the following
            credentials. You can update them at anytime.
          </p>
        </div>

        <div className=" items-start lg:space-y-0  gap-4 lg:flex flex-wrap ">
          {/* <!-- Icon Block --> */}

          <div className="flex w-auto max-w-[400px] p-3 rounded-md hover:bg-gray-100   cursor-pointer ">
            <div className="   pt-1 text-2xl">
              {" "}
              <HiOutlineMail />
            </div>

            <div className="ml-5  ">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Professional Email
              </h3>
              <p className="mt-1 text-black ">email@res.org</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                This email is primarily for use in the useraccountdashboard
                ecosystem
              </p>
            </div>
          </div>
          {/* <!-- End Icon Block --> */}

          {/* <!-- Icon Block --> */}
          <div className="flex w-auto max-w-[400px] p-3 rounded-md hover:bg-gray-100   cursor-pointer ">
            <div className="   pt-1 text-2xl">
              {" "}
              <IoKeyOutline />
            </div>

            <div className="ml-5  ">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Access Key
              </h3>
              <p className="mt-1 text-black ">00!9</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                An access key is unique to every user and is used to identify
                users
              </p>
            </div>
          </div>
          {/* <!-- End Icon Block --> */}

          {/* <!-- Icon Block --> */}
          <div className="flex w-auto max-w-[400px] p-3 rounded-md hover:bg-gray-100   cursor-pointer ">
            <div className="   pt-1 text-2xl">
              {" "}
              <IoScanOutline />
            </div>

            <div className="ml-5  ">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Identification
              </h3>
              <p className="mt-1 text-black ">5686 8094 3489</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                This is the ID of the main dashboard associated with this
                account as a 'child' profile
              </p>
            </div>
          </div>
          {/* <!-- End Icon Block --> */}
          {/* <!-- Icon Block --> */}
          <div className="flex w-auto max-w-[400px] p-3 rounded-md hover:bg-gray-100   cursor-pointer ">
            <div className="   pt-1 text-2xl">
              {" "}
              <HiOutlineVideoCamera />
            </div>

            <div className="ml-5  ">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Conference ID
              </h3>
              <p className="mt-1 text-black ">5686 8094 3489</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                This is the Conference ID of the main dashboard associated with
                this account as a 'child' profile
              </p>
            </div>
          </div>
          {/* <!-- End Icon Block --> */}
          {/* <!-- Icon Block --> */}
          <div className="flex w-auto max-w-[400px] p-3 rounded-md hover:bg-gray-100   cursor-pointer ">
            <div className="   pt-1 text-2xl">
              {" "}
              <IoFingerPrintSharp />
            </div>

            <div className="ml-5  ">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                Security Key
              </h3>
              <p className="mt-1 text-black ">****</p>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                This secret key contains biometric data that is used to check
                the authenticity of a user
              </p>
            </div>
          </div>
          {/* <!-- End Icon Block --> */}
        </div>
      </div>
    </div>
  );
}
