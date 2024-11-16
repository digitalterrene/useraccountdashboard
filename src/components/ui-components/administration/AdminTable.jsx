"use client";
import React, { useState } from "react";
import { LuKeyRound } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import { SiMonkeytie } from "react-icons/si";
import { useCreateNewOrEditOld } from "@/context";
import { account_server } from "../../../../utils/urls";
import { useAuthContext } from "@/context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function AdminTable({ activeTab, stakeholders }) {
  const { user: local_user } = useAuthContext();
  const { isCreatingNew, togleIsCreatingNew } = useCreateNewOrEditOld();
  const [addNewInputs, setAddNewInputs] = useState({
    stakeholder_type: activeTab?.name,
  });
  const [inputs, setInputs] = useState({
    stakeholder_type: activeTab?.name,
  });
  const handleAddNewSubmit = async () => {
    //means it is adding NEw
    const id = toast.loading("Adding new information...");
    let level_extention =
      "update-add-to-set-or-pull-stakeholder-in-single-data-arrays";
    const res = await fetch(
      `${account_server}/${level_extention}/_id/${local_user?._id}/add_to_set`,
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
          key_to_update: activeTab?.name,
          value_to_update: addNewInputs,
        }),
      }
    );
    const json = await res.json();
    if (res.ok) {
      toast.update(id, {
        render: `${json.message}`,
        type: "success",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });

      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      toast.update(id, {
        render: `${json.error} `,
        type: "error",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setTimeout(() => {
      toast.dismiss();
    }, 6000);
  };
  const handleUpdateSubmit = async () => {
    const id = toast.loading("Updating information...");
    let level_extention = "update-set-single-data-objects";
    const { _id, ...otherInputs } = inputs;
    const res = await fetch(
      `${account_server}/${level_extention}/${activeTab?.name}/_id/${local_user?._id}/_id/${_id}`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${local_user?.token}`,
          useraccountdashboard_account_user_id: `${local_user?._id}`,
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({
          key_to_update: activeTab?.name,
          value_to_update: otherInputs,
        }),
      }
    );
    const json = await res.json();
    if (res.ok) {
      toast.update(id, {
        render: `Successfully updated ${activeTab?.name} data`,
        type: "success",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        toast.dismiss();
        location.reload();
      }, 3000);
    } else {
      toast.update(id, {
        render: `${json?.error}`,
        type: "error",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setTimeout(() => {
      toast.dismiss();
    }, 6000);
  };
  const handleDeleteSubmit = async (inputsParam) => {
    const id = toast.loading("Deleting information...");
    let level_extention =
      "update-add-to-set-or-pull-stakeholder-in-single-data-arrays";
    const res = await fetch(
      `${account_server}/${level_extention}/_id/${local_user?._id}/pull`,
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
          key_to_update: activeTab?.name,
          value_to_update: inputsParam,
        }),
      }
    );
    const json = await res.json();
    if (res.ok) {
      toast.update(id, {
        render: `Successfully deleted entry in ${activeTab?.name} data`,
        type: "success",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        toast.dismiss();
        location.reload();
      }, 3000);
    } else {
      toast.update(id, {
        render: `${json?.error}`,
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
    <div className="border rounded-xl p-2">
      <ToastContainer />
      <table className="min-w-full divide-y  divide-gray-200  ">
        <thead className="bg-gray-50  ">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Previledges
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>

            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stakeholders?.map(
            (
              {
                image,
                email,
                access_key,
                _id,
                share_access_key,
                share_security_key,
                share_id,
                share_password,
                name,
                firstname,
                lastname,
                username,
              },
              i
            ) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={image}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium capitalize text-gray-900">
                        {firstname ? firstname + lastname : name || username}
                      </div>
                      <div className="text-sm text-gray-500">{email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 flex gap-4 items-center">
                    <div className="flex gap-2 text-xs items-center">
                      <div
                        className={`text-sm p-1.5 ${
                          share_password
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }  rounded-full  `}
                      >
                        {" "}
                        <TbPasswordFingerprint />
                      </div>
                      Password
                    </div>
                    <div className="flex gap-2 text-xs items-center">
                      <div
                        className={`text-sm p-1.5 ${
                          share_access_key
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }  rounded-full  `}
                      >
                        <MdLockOutline />
                      </div>
                      Access Key
                    </div>
                    <div className="flex gap-2 text-xs items-center">
                      <div
                        className={`text-sm p-1.5 ${
                          share_security_key
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }  rounded-full  `}
                      >
                        {" "}
                        <LuKeyRound />
                      </div>
                      Security Key
                    </div>
                    <div className="flex gap-2 text-xs items-center">
                      <div
                        className={`text-sm p-1.5 ${
                          share_id
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }  rounded-full  `}
                      >
                        {" "}
                        <SiMonkeytie />
                      </div>
                      Identification
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Admin
                </td>

                <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                  <button
                    data-hs-overlay="#hs-slide-down-animation-modal-update"
                    onClick={() => {
                      setInputs((prevState) => ({
                        ...prevState,
                        image,
                        _id,
                        email,
                        access_key,
                        share_access_key,
                        share_security_key,
                        share_id,
                        share_password,
                        name,
                      }));
                    }}
                    className={`${
                      isCreatingNew === true
                        ? "bg-[#0D99FF] text-white"
                        : "bg-white text-blue-600"
                    } text-indigo-600 p-1.5 rounded-md px-4   `}
                  >
                    Edit
                  </button>
                  <a
                    onClick={() => {
                      handleDeleteSubmit({
                        image,
                        _id,
                        email,
                        access_key,
                        share_access_key,
                        share_security_key,
                        share_id,
                        share_password,
                        name,
                      });
                    }}
                    href="#"
                    className="ml-2 text-red-600 hover:text-red-900"
                  >
                    Delete
                  </a>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {/* Start of add new modal  */}
      <div
        id="hs-slide-down-animation-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold capitalize text-gray-800 dark:text-white">
                add new- {activeTab?.name}
              </h3>
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-slide-down-animation-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <div className="space-y-6 p-4">
                <div className="   rounded-xl  ">
                  <form className="  mx-auto">
                    <div className="text-xs  text-green-500 w-fit ml-auto font-medium">
                      Creating New{" "}
                    </div>
                    <div className="mb-5">
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        value={addNewInputs?.email}
                        onChange={(e) =>
                          setAddNewInputs((prevState) => ({
                            ...prevState,
                            email: e.target.value,
                          }))
                        }
                        id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="name@useraccountdashboard.com"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        for="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Access Key
                      </label>
                      <input
                        type="text"
                        value={addNewInputs?.access_key}
                        onChange={(e) =>
                          setAddNewInputs((prevState) => ({
                            ...prevState,
                            access_key: e.target.value,
                          }))
                        }
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="bg-white p-4 transition border duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <div className="text-xs text-green-500 w-fit ml-auto font-medium">
                    Creating New{" "}
                  </div>{" "}
                  <div className="flex    ">
                    <div className="mt-1.5 flex justify-center text-xl flex-shrink-0 rounded-s-xl">
                      {activeTab?.icon}
                    </div>

                    <div className="p-2 ">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm capitalize font-semibold text-blue-600 dark:text-blue-500">
                          Previledges
                        </h3>
                      </div>

                      <p className="mt-1 mb-6 text-xs line-clamp-2 text-gray-600 dark:text-gray-500">
                        This information is shared with your name dashboard
                      </p>
                      <div className="lg:grid grid-cols-2 gap-2">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            checked={addNewInputs?.share_password}
                            onChange={(e) =>
                              setAddNewInputs((prevState) => ({
                                ...prevState,
                                share_password: e.target.checked,
                              }))
                            }
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Password
                          </span>
                        </label>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            checked={addNewInputs?.share_access_key}
                            onChange={(e) =>
                              setAddNewInputs((prevState) => ({
                                ...prevState,
                                share_access_key: e.target.checked,
                              }))
                            }
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Access Key
                          </span>
                        </label>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            checked={addNewInputs?.share_security_key}
                            onChange={(e) =>
                              setAddNewInputs((prevState) => ({
                                ...prevState,
                                share_security_key: e.target.checked,
                              }))
                            }
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Security Key
                          </span>
                        </label>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            checked={addNewInputs?.share_id}
                            onChange={(e) =>
                              setAddNewInputs((prevState) => ({
                                ...prevState,
                                share_id: e.target.checked,
                              }))
                            }
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Identification
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-slide-down-animation-modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleAddNewSubmit()}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of add new modal */}
      {/* Start of update modal */}
      <div
        id="hs-slide-down-animation-modal-update"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold capitalize text-gray-800 dark:text-white">
                updating - {activeTab?.name}
              </h3>
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-slide-down-animation-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <div className="space-y-6 p-4">
                <div className="   rounded-xl  ">
                  <form className="  mx-auto">
                    <div className="text-xs  text-green-500 w-fit ml-auto font-medium">
                      Updating{" "}
                    </div>
                    <div className="mb-5">
                      <label
                        for="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        value={inputs?.email}
                        onChange={(e) =>
                          setInputs((prevState) => ({
                            ...prevState,
                            email: e.target.value,
                          }))
                        }
                        id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="name@useraccountdashboard.com"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        for="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Access Key
                      </label>
                      <input
                        type="text"
                        value={inputs?.access_key}
                        onChange={(e) =>
                          setInputs((prevState) => ({
                            ...prevState,
                            access_key: e.target.value,
                          }))
                        }
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="bg-white p-4 transition border duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <div className="text-xs text-green-500 w-fit ml-auto font-medium">
                    Updating{" "}
                  </div>{" "}
                  <div className="flex    ">
                    <div className="mt-1.5 flex justify-center text-xl flex-shrink-0 rounded-s-xl">
                      {activeTab?.icon}
                    </div>

                    <div className="p-2 ">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm capitalize font-semibold text-blue-600 dark:text-blue-500">
                          Previledges
                        </h3>
                      </div>

                      <p className="mt-1 mb-6 text-xs line-clamp-2 text-gray-600 dark:text-gray-500">
                        This information is shared with your name dashboard
                      </p>
                      <div className="lg:grid grid-cols-2 gap-2">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            checked={inputs?.share_password}
                            onChange={(e) =>
                              setInputs((prevState) => ({
                                ...prevState,
                                share_password: e.target.checked,
                              }))
                            }
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Password
                          </span>
                        </label>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            checked={inputs?.share_access_key}
                            onChange={(e) =>
                              setInputs((prevState) => ({
                                ...prevState,
                                share_access_key: e.target.checked,
                              }))
                            }
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Access Key
                          </span>
                        </label>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            checked={inputs?.share_security_key}
                            onChange={(e) =>
                              setInputs((prevState) => ({
                                ...prevState,
                                share_security_key: e.target.checked,
                              }))
                            }
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Security Key
                          </span>
                        </label>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            checked={inputs?.share_id}
                            onChange={(e) =>
                              setInputs((prevState) => ({
                                ...prevState,
                                share_id: e.target.checked,
                              }))
                            }
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Identification
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#hs-slide-down-animation-modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleUpdateSubmit()}
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of update modal */}
    </div>
  );
}
