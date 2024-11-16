"use client";
import React, { useEffect, useState } from "react";
import { account_server } from "../../../../utils/urls";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "@/context/AuthContext";
import CardLinks from "@/components/ui-components/CardLinks";

import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function PersonalInformation({ user }) {
  const [what_to_edit, setWhatToEdit] = useState("");
  const [input, setInput] = useState("");

  const [otherInfo, setOtherInfo] = useState(user?.other_information || {});
  const { user: local_user } = useAuthContext();
  const [otherInfoChangesMade, setOtherInfoChangesMade] = useState(false);

  const [visibilityPrefs, setVisibilityPrefs] = useState({
    phone_visibility: false,
    address_visibility: false,
    city_visibility: false,
    postal_code_visibility: false,
    state_visibility: false,
    country_visibility: false,
    // Add other visibility permissions here
  });
  useEffect(() => {
    // Fetch user permissions from props and update the state
    if (user?.permissions) {
      setVisibilityPrefs((prevPrefs) => ({
        ...prevPrefs,
        ...user.permissions,
      }));
    }
  }, [user?.permissions]);

  useEffect(() => {
    import("preline");
  }, []);
  const router = useRouter();

  const handleSubmitOtherInfo = async () => {
    const id = toast.loading("Updating other information...");

    const res = await fetch(
      `${account_server}/update-set-single-data-objects/_id/${user?._id}`,
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
          key_to_update: "other_information",
          value_to_update: otherInfo,
        }),
      }
    );
    const json = await res.json();
    if (res.ok) {
      toast.update(id, {
        render: "Successfully updated other information",
        type: "success",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        toast.dismiss();
        router.refresh();
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
  const updateNonLevelKeys = async (key_to_update, value_to_update) => {
    let level_extention = "update-set-single-data-strings";
    let ressolved_value_to_update = value_to_update;
    let img_blob;
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
          img_blob = `${imageData.secure_url.toString()}`;
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
        if (key_to_update === "image") {
          // Get the user object from localStorage
          let user = JSON.parse(localStorage.getItem("user"));

          // If the user object doesn't exist, initialize it as an empty object
          if (!user) {
            user = {};
          }

          // Add or update the specified key
          user[key_to_update] = `${img_blob}`;
          router.refresh();
          // Save the updated object back to localStorage
          localStorage.setItem("user", JSON.stringify(user));
        }

        setTimeout(() => {
          router.refresh();
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

  return (
    <>
      <ToastContainer />
      <div className="lg:px-10 space-y-6 pb-6 w-full  px-0">
        <CardLinks />
        <div className="lg:grid lg:w-full grid-cols-2 space-y-4 lg:space-y-0 gap-4 sm:gap-6">
          {/* <!-- Card --> */}
          <div className="group flex h-fit flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800">
            <div className="p-4 md:p-5">
              <div className="flex">
                <div className="grow space-y-3 ml-5">
                  <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                    Basic information
                  </h3>
                  <p className="text-sm text-gray-500">
                    Some info may be visible to other people using
                    useraccountdashboard services
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Profile Image</p>
              <p className=""></p>
              <div className="flex ml-auto gap-2">
                <img
                  src={
                    user && user.image
                      ? user.image
                      : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                  }
                  className="border-2 h-10 cursor-pointer object-contain w-10 rounded-full"
                  alt="Avatar"
                  data-hs-overlay="#hs-slide-down-animation-modal"
                />
                <div
                  id="hs-slide-down-animation-modal"
                  className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
                >
                  <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white max-w-sm border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                      <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                          Profile Image
                        </h3>

                        <button
                          type="button"
                          className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                          data-hs-overlay="#hs-slide-down-animation-modal"
                        >
                          <span className="sr-only">Close</span>
                          <svg
                            className="w-3.5 h-3.5"
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4 h-96   flex justify-center items-center w-fit overflow-y-auto">
                        <img
                          src={
                            user && user.image
                              ? user.image
                              : "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                          }
                          className=" mx-auto h-full object-contain w-96 rounded-2xl"
                          alt="Avatar"
                        />
                      </div>
                      <div className="w-full border-t px-4  justify-between flex">
                        <form className="mt-2">
                          <label className="block relative">
                            <span className="sr-only">
                              Choose profile photo
                            </span>
                            <input
                              type="file"
                              onChange={(e) =>
                                updateNonLevelKeys("image", e.target.files[0])
                              }
                              // onChange={(e) => postImage(e.target.files[0])}
                              className="absolute inset-0 opacity-0"
                              accept="image/*"
                            />
                            <div className="  text-white text-sm font-semibold rounded-md py-3 px-4 cursor-pointer hover:bg-blue-600">
                              <img
                                className="w-8"
                                src={
                                  user?.image ||
                                  "https://cdn-icons-png.flaticon.com/128/8304/8304794.png"
                                }
                              />
                            </div>
                          </label>
                        </form>

                        <div className="flex justify-end items-center gap-x-2 py-3   dark:border-gray-700">
                          <button
                            type="button"
                            className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                            data-hs-overlay="#hs-slide-down-animation-modal"
                          >
                            Close
                          </button>
                          <a
                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                            href="#"
                            data-hs-overlay="#hs-slide-down-animation-modal"
                          >
                            Save changes
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Username</p>
              <p className="capitalize truncate w-36">
                {user?.username || "username"}
              </p>
              <div className="flex ml-auto gap-2">
                <div
                  id="hs-focus-management-modal"
                  className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
                >
                  <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                      <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                          Edit Basic Information
                        </h3>
                        <button
                          type="button"
                          className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                          data-hs-overlay="#hs-focus-management-modal"
                        >
                          <span className="sr-only">Close</span>
                          <svg
                            className="w-3.5 h-3.5"
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4 overflow-y-auto">
                        <label
                          for="input-label"
                          className="block text-sm capitalize font-medium mb-2 dark:text-white"
                        >
                          {what_to_edit.replaceAll("_", " ")}
                        </label>
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          style={{ border: "1px solid #e5e7eb" }}
                          id="input-label"
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                          placeholder={
                            user && user[what_to_edit]
                              ? user[what_to_edit]
                              : "Input here"
                          }
                          autofocus
                        />
                      </div>
                      <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                        <button
                          type="button"
                          onClick={() => setInput("")}
                          className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                          data-hs-overlay="#hs-focus-management-modal"
                        >
                          Close
                        </button>
                        <a
                          onClick={() =>
                            updateNonLevelKeys(what_to_edit, input)
                          }
                          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                          href="#"
                          data-hs-overlay="#hs-focus-management-modal"
                        >
                          Save changes
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setWhatToEdit("username")}
                  className="p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-focus-management-modal"
                >
                  <FiEdit className="text-lg" />
                </button>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Name</p>
              <p className="capitalize truncate w-36">
                {user && user.name && user.name ? user.name : "Name"}
              </p>
              <div className="flex ml-auto gap-2">
                <div
                  id="hs-focus-management-modal"
                  className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
                >
                  <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                      <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                          Edit Basic Information
                        </h3>
                        <button
                          type="button"
                          className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                          data-hs-overlay="#hs-focus-management-modal"
                        >
                          <span className="sr-only">Close</span>
                          <svg
                            className="w-3.5 h-3.5"
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4 overflow-y-auto">
                        <label
                          for="input-label"
                          className="block text-sm capitalize font-medium mb-2 dark:text-white"
                        >
                          {what_to_edit.replaceAll("_", " ")}
                        </label>
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          style={{ border: "1px solid #e5e7eb" }}
                          id="input-label"
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                          placeholder={
                            user && user[what_to_edit]
                              ? user[what_to_edit]
                              : "Input here"
                          }
                          autofocus
                        />
                      </div>
                      <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                        <button
                          type="button"
                          onClick={() => setInput("")}
                          className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                          data-hs-overlay="#hs-focus-management-modal"
                        >
                          Close
                        </button>
                        <a
                          onClick={() =>
                            updateNonLevelKeys(what_to_edit, input)
                          }
                          className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                          href="#"
                          data-hs-overlay="#hs-focus-management-modal"
                        >
                          Save changes
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setWhatToEdit("name")}
                  className="p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-focus-management-modal"
                >
                  <FiEdit className="text-lg" />{" "}
                </button>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Extension</p>
              <p className="capitalize truncate w-36">
                {user && user.extension && user.extension
                  ? user.extension
                  : "extension"}
              </p>
              <div className="flex ml-auto gap-2">
                <button
                  type="button"
                  onClick={() => setWhatToEdit("extension")}
                  className="p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-focus-management-modal"
                >
                  <FiEdit className="text-lg" />{" "}
                </button>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Industry</p>
              <p className="capitalize truncate w-36">
                {user && user.industry && user.industry
                  ? user.industry
                  : "industry"}
              </p>
              <div className="flex ml-auto gap-2">
                <button
                  type="button"
                  onClick={() => setWhatToEdit("industry")}
                  className="p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-focus-management-modal"
                >
                  <FiEdit className="text-lg" />{" "}
                </button>
              </div>
            </div>{" "}
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Organization Type</p>
              <p className="capitalize truncate w-36">
                {user && user.organization_type && user.organization_type
                  ? user.organization_type
                  : "organization_type"}
              </p>
              <div className="flex ml-auto gap-2">
                <button
                  type="button"
                  onClick={() => setWhatToEdit("organization_type")}
                  className="p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-focus-management-modal"
                >
                  <FiEdit className="text-lg" />{" "}
                </button>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Founded</p>
              <p className="capitalize truncate w-36">
                {user && user.founded_on && user.founded_on
                  ? user.founded_on
                  : "founded_on"}
              </p>
              <div className="flex ml-auto gap-2">
                <button
                  type="button"
                  onClick={() => setWhatToEdit("founded_on")}
                  className="p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-focus-management-modal"
                >
                  <FiEdit className="text-lg" />{" "}
                </button>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Founder</p>
              <p className="capitalize truncate w-36">
                {user && user.founder && user.founder
                  ? user.founder
                  : "founder"}
              </p>
              <div className="flex ml-auto gap-2">
                <button
                  type="button"
                  onClick={() => setWhatToEdit("founder")}
                  className="p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-focus-management-modal"
                >
                  <FiEdit className="text-lg" />{" "}
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Hire Us --> */}
          <div className="max-w-[85rem] border p-4  rounded-xl sm:px-6 lg:px-8  mx-auto">
            <div className="max-w-[85rem]   mx-auto">
              <div className="max-w-xl mx-auto">
                <div className=" ">
                  {/* <!-- Form --> */}
                  <div>
                    <div className="flex mb-6 justify-between items-center">
                      <h1 className="text-xl capitalize font-bold  text-gray-800  dark:text-white">
                        Other Information
                        {otherInfoChangesMade && (
                          <span className="text-xs bg-red-50 border-red-50 text-red-600 hover:text-green-600 border p-1 rounded-full px-4 ml-5">
                            Changes Made
                          </span>
                        )}
                      </h1>
                      {otherInfoChangesMade && (
                        <button
                          onClick={() => handleSubmitOtherInfo()}
                          className="bg-white px-4 py-1.5 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          <h3 className="text-xs font-semibold text-blue-600 dark:text-blue-500">
                            Update
                          </h3>
                        </button>
                      )}
                    </div>

                    <div className="grid gap-4 lg:gap-6">
                      {/* <!-- Grid --> */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                          <label
                            htmlFor="hs-firstname-hire-us-2"
                            className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                          >
                            Registry
                          </label>
                          <input
                            type="text"
                            value={otherInfo?.registry}
                            onChange={(e) => {
                              setOtherInfoChangesMade(true);
                              setOtherInfo((prevState) => ({
                                ...prevState,
                                registry: e.target.value,
                              }));
                            }}
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="hs-lastname-hire-us-2"
                            className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                          >
                            Registry Identification
                          </label>
                          <input
                            type="text"
                            value={otherInfo?.registry_identification}
                            onChange={(e) => {
                              setOtherInfoChangesMade(true);
                              setOtherInfo((prevState) => ({
                                ...prevState,
                                registry_identification: e.target.value,
                              }));
                            }}
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          />
                        </div>
                      </div>
                      {/* <!-- End Grid --> */}
                      {/* <!-- Grid --> */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                          <label
                            htmlFor="hs-firstname-hire-us-2"
                            className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                          >
                            Economic League
                          </label>
                          <input
                            type="text"
                            value={otherInfo?.economic_league}
                            onChange={(e) => {
                              setOtherInfoChangesMade(true);
                              setOtherInfo((prevState) => ({
                                ...prevState,
                                economic_league: e.target.value,
                              }));
                            }}
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="hs-lastname-hire-us-2"
                            className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                          >
                            Super Currency
                          </label>
                          <input
                            type="text"
                            value={otherInfo?.super_currency}
                            onChange={(e) => {
                              setOtherInfoChangesMade(true);
                              setOtherInfo((prevState) => ({
                                ...prevState,
                                super_currency: e.target.value,
                              }));
                            }}
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          />
                        </div>
                      </div>
                      {/* <!-- End Grid --> */}
                      <div>
                        <label
                          htmlFor="hs-work-email-hire-us-2"
                          className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                        >
                          Tagline
                        </label>
                        <input
                          type="text"
                          value={otherInfo?.tagline}
                          onChange={(e) => {
                            setOtherInfoChangesMade(true);
                            setOtherInfo((prevState) => ({
                              ...prevState,
                              tagline: e.target.value,
                            }));
                          }}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="hs-about-hire-us-2"
                          className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                        >
                          Decription
                        </label>
                        <textarea
                          value={otherInfo?.description}
                          onChange={(e) => {
                            setOtherInfoChangesMade(true);
                            setOtherInfo((prevState) => ({
                              ...prevState,
                              description: e.target.value,
                            }));
                          }}
                          rows={4}
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        ></textarea>
                      </div>
                    </div>
                    {/* <!-- End Grid --> */}
                  </div>
                  {/* <!-- End Form --> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Hire Us --> */}
          {/* <!-- Card --> */}
        </div>
      </div>
    </>
  );
}
