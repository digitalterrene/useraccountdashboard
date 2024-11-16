"use client";
import { useAuthContext } from "@/context/AuthContext";
import React, { useState } from "react";
import { TiCancel } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { account_server } from "../../../../utils/urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineSave } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function AboutTab({ user }) {
  const [editBlocks, setEditBlocks] = useState(false);
  const [blockOnFocus, setBlockOnFocus] = useState("");
  const [locationInputs, setLocationInputs] = useState(
    user?.location_information || {}
  );
  const { user: local_user } = useAuthContext();
  const [phoneNumberInputs, setPhoneNumberInputs] = useState(
    user?.phone_number_information || {}
  );
  const [emailAddressInputs, setEmailAddressInputs] = useState(
    user?.email_address_information || {}
  );

  let level_extention = "update-set-single-data-objects";
  const router = useRouter();
  const handleUpdateInfo = async (key, data) => {
    const id = toast.loading("Updating information...");
    const res = await fetch(
      `${account_server}/${level_extention}/_id/${local_user?._id}`,
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
          key_to_update: `${key}`,
          value_to_update: data,
        }),
      }
    );
    const json = await res.json();
    if (res.ok) {
      toast.update(id, {
        render: `Successfully updated ${key} information`,
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
  return (
    <div className="space-y-4  w-full  ">
      <ToastContainer />
      <p className="mt-1 max-w-2xl text-sm text-gray-500">
        This is Profile tab's associated content. Clicking another tab will
        toggle the visibility of this one for the next. The tab JavaScript swaps
        classes to control the content visibility and styling.
      </p>
      <div className="lg:grid space-y-6 lg:space-y-0 gap-6 grid-cols-2">
        {" "}
        <div className="bg-white  overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Location Information
              </h3>
              {editBlocks && blockOnFocus === "location_information" ? (
                <div className="flex gap-4 items-center">
                  <button
                    type="button"
                    onClick={() => setEditBlocks(false)}
                    className="flex text-xs flex-shrink-0 justify-center items-center gap-2 p-1  font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <TiCancel className="text-xl text-white" />
                    Cancel
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateInfo("location_information", locationInputs)
                    }
                    className="flex text-xs flex-shrink-0 justify-center items-center gap-2 p-1  font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <AiOutlineSave className="text-xl" />
                    Save
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setEditBlocks(true);
                    setBlockOnFocus("location_information");
                  }}
                  className="flex flex-shrink-0 justify-center items-center gap-2 p-1.5 font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <FaRegEdit />
                </button>
              )}
            </div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              These are the industries in which your dashboards can be
              configured under
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y  sm:divide-gray-200">
              <div className="py-3 sm:py-5 gap-8 items-center flex sm:grid sm:grid-cols-3  sm:px-6">
                <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                  Street Address
                </dt>
                <dd className="  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {editBlocks && blockOnFocus === "location_information" ? (
                    <input
                      type="text"
                      value={locationInputs?.street_address}
                      onChange={(e) =>
                        setLocationInputs((prevState) => ({
                          ...prevState,
                          street_address: e.target.value,
                        }))
                      }
                      className="py-1.5 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Enter street address"
                    />
                  ) : (
                    <>{locationInputs?.street_address || "Street Address"}</>
                  )}
                </dd>
              </div>
              <div className="py-3 sm:py-5 gap-8 items-center flex sm:grid sm:grid-cols-3  sm:px-6">
                <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                  City
                </dt>
                <dd className="  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {editBlocks && blockOnFocus === "location_information" ? (
                    <input
                      type="text"
                      value={locationInputs?.city}
                      onChange={(e) =>
                        setLocationInputs((prevState) => ({
                          ...prevState,
                          city: e.target.value,
                        }))
                      }
                      className="py-1.5 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Enter city name"
                    />
                  ) : (
                    <>{locationInputs?.city || "City"}</>
                  )}
                </dd>
              </div>
              <div className="py-3 sm:py-5 gap-8 items-center flex sm:grid sm:grid-cols-3  sm:px-6">
                <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                  Postal Code
                </dt>
                <dd className="  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {editBlocks && blockOnFocus === "location_information" ? (
                    <input
                      type="text"
                      value={locationInputs?.postal_code}
                      onChange={(e) =>
                        setLocationInputs((prevState) => ({
                          ...prevState,
                          postal_code: e.target.value,
                        }))
                      }
                      className="py-1.5 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Enter postal code name"
                    />
                  ) : (
                    <>{locationInputs?.postal_code || "Postal Code"}</>
                  )}
                </dd>
              </div>
              <div className="py-3 sm:py-5 gap-8 items-center flex sm:grid sm:grid-cols-3  sm:px-6">
                <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                  Country
                </dt>
                <dd className="  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {editBlocks && blockOnFocus === "location_information" ? (
                    <input
                      type="text"
                      value={locationInputs?.country}
                      onChange={(e) =>
                        setLocationInputs((prevState) => ({
                          ...prevState,
                          country: e.target.value,
                        }))
                      }
                      className="py-1.5 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Enter country name"
                    />
                  ) : (
                    <>{locationInputs?.country || "Country"}</>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="bg-white  overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Phone Number Information
              </h3>
              {editBlocks && blockOnFocus === "phone_number_information" ? (
                <div className="flex gap-4 items-center">
                  <button
                    type="button"
                    onClick={() => setEditBlocks(false)}
                    className="flex text-xs flex-shrink-0 justify-center items-center gap-2 p-1  font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <TiCancel className="text-xl text-white" />
                    Cancel
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateInfo(
                        "phone_number_information",
                        phoneNumberInputs
                      )
                    }
                    className="flex text-xs flex-shrink-0 justify-center items-center gap-2 p-1  font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <AiOutlineSave className="text-xl" />
                    Save
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setEditBlocks(!editBlocks);
                    setBlockOnFocus("phone_number_information");
                  }}
                  className="flex flex-shrink-0 justify-center items-center gap-2 p-1.5 font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <FaRegEdit />
                </button>
              )}
            </div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              These phone numbers are the default phone contacts for your
              dashboards
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y  sm:divide-gray-200">
              <div className="py-3 sm:py-5 gap-40 sm:grid items-center sm:grid-cols-3  sm:px-6">
                <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                  Enquiries
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {editBlocks && blockOnFocus === "phone_number_information" ? (
                    <input
                      type="text"
                      value={phoneNumberInputs?.enquiries}
                      onChange={(e) =>
                        setPhoneNumberInputs((prevState) => ({
                          ...prevState,
                          enquiries: e.target.value,
                        }))
                      }
                      className="py-1.5 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Enter enquiries phone number"
                    />
                  ) : (
                    <>{phoneNumberInputs?.enquiries || "012 345 6789"}</>
                  )}
                </dd>
              </div>
              <div className="py-3 sm:py-5 gap-40 sm:grid items-center sm:grid-cols-3  sm:px-6">
                <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                  Customer Support
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {editBlocks && blockOnFocus === "phone_number_information" ? (
                    <input
                      type="text"
                      value={phoneNumberInputs?.customer_support}
                      onChange={(e) =>
                        setPhoneNumberInputs((prevState) => ({
                          ...prevState,
                          customer_support: e.target.value,
                        }))
                      }
                      className="py-1.5 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Enter customer support phone number"
                    />
                  ) : (
                    <>{phoneNumberInputs?.customer_support || "012 345 6789"}</>
                  )}
                </dd>
              </div>
              <div className="py-3 sm:py-5 gap-40 sm:grid items-center sm:grid-cols-3  sm:px-6">
                <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                  Sales
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {editBlocks && blockOnFocus === "phone_number_information" ? (
                    <input
                      type="text"
                      value={phoneNumberInputs?.sales}
                      onChange={(e) =>
                        setPhoneNumberInputs((prevState) => ({
                          ...prevState,
                          sales: e.target.value,
                        }))
                      }
                      className="py-1.5 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Enter sales phone number"
                    />
                  ) : (
                    <>{phoneNumberInputs?.sales || "012 345 6789"}</>
                  )}
                </dd>
              </div>
              <div className="py-3 sm:py-5 gap-40 sm:grid items-center sm:grid-cols-3  sm:px-6">
                <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                  Other
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {editBlocks && blockOnFocus === "phone_number_information" ? (
                    <input
                      type="text"
                      value={phoneNumberInputs?.other}
                      onChange={(e) =>
                        setPhoneNumberInputs((prevState) => ({
                          ...prevState,
                          other: e.target.value,
                        }))
                      }
                      className="py-1.5 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Enter other phone number"
                    />
                  ) : (
                    <>{phoneNumberInputs?.other || "012 345 6789"}</>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="bg-white col-span-2 overflow-hidden shadow rounded-lg border">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Email Address Information
              </h3>
              {editBlocks && blockOnFocus === "email_address_information" ? (
                <div className="flex gap-4 items-center">
                  <button
                    type="button"
                    onClick={() => setEditBlocks(false)}
                    className="flex text-xs flex-shrink-0 justify-center items-center gap-2 p-1  font-semibold rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <TiCancel className="text-xl text-white" />
                    Cancel
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() =>
                      handleUpdateInfo(
                        "email_address_information",
                        emailAddressInputs
                      )
                    }
                    className="flex text-xs flex-shrink-0 justify-center items-center gap-2 p-1  font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <AiOutlineSave className="text-xl" />
                    Save
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setEditBlocks(!editBlocks);
                    setBlockOnFocus("email_address_information");
                  }}
                  className="flex flex-shrink-0 justify-center items-center gap-2 p-1.5 font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <FaRegEdit />
                </button>
              )}
            </div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              These emails are the default email addresses for your dashboards
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y  sm:divide-gray-200">
              <div className="py-3 sm:py-5 gap-40 flex items-center sm:grid sm:grid-cols-3  sm:px-6">
                <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                  Enquiries
                </dt>
                <dd className="  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {editBlocks &&
                  blockOnFocus === "email_address_information" ? (
                    <input
                      type="text"
                      value={emailAddressInputs?.enquiries}
                      onChange={(e) =>
                        setEmailAddressInputs((prevState) => ({
                          ...prevState,
                          enquiries: e.target.value,
                        }))
                      }
                      className="py-1.5 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Enter enquiries email"
                    />
                  ) : (
                    <>
                      {emailAddressInputs?.enquiries || "enquiries@domain.com"}
                    </>
                  )}
                </dd>
              </div>
              <div className="py-3 sm:py-5 gap-40 flex items-center sm:grid sm:grid-cols-3  sm:px-6">
                <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                  Customer Support
                </dt>
                <dd className="  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {editBlocks &&
                  blockOnFocus === "email_address_information" ? (
                    <input
                      type="text"
                      value={emailAddressInputs?.customer_support}
                      onChange={(e) =>
                        setEmailAddressInputs((prevState) => ({
                          ...prevState,
                          customer_support: e.target.value,
                        }))
                      }
                      className="py-1.5 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Enter customer support email"
                    />
                  ) : (
                    <>
                      {emailAddressInputs?.customer_support ||
                        "customersupport@domain.com"}
                    </>
                  )}
                </dd>
              </div>
              <div className="py-3 sm:py-5 gap-40 flex items-center sm:grid sm:grid-cols-3  sm:px-6">
                <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                  Sales
                </dt>
                <dd className="  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {editBlocks &&
                  blockOnFocus === "email_address_information" ? (
                    <input
                      type="text"
                      value={emailAddressInputs?.sales}
                      onChange={(e) =>
                        setEmailAddressInputs((prevState) => ({
                          ...prevState,
                          sales: e.target.value,
                        }))
                      }
                      className="py-1.5 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Enter sales email"
                    />
                  ) : (
                    <>{emailAddressInputs?.sales || "sales@domain.com"}</>
                  )}
                </dd>
              </div>
              <div className="py-3 sm:py-5 gap-40 flex items-center sm:grid sm:grid-cols-3  sm:px-6">
                <dt className="text-sm whitespace-nowrap font-medium text-gray-500">
                  Other
                </dt>
                <dd className="  text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {editBlocks &&
                  blockOnFocus === "email_address_information" ? (
                    <input
                      type="text"
                      value={emailAddressInputs?.other}
                      onChange={(e) =>
                        setEmailAddressInputs((prevState) => ({
                          ...prevState,
                          other: e.target.value,
                        }))
                      }
                      className="py-1.5 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Enter sales email"
                    />
                  ) : (
                    <>{emailAddressInputs?.other || "info@domain.com"}</>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
