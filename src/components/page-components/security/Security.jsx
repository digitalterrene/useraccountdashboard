"use client";
import React, { useEffect, useState } from "react";
import { BsPhone, BsShieldLock } from "react-icons/bs";
import { HiOutlineKey, HiOutlineMail } from "react-icons/hi";

import { IoFingerPrintOutline, IoLockClosedOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { account_server } from "../../../../utils/urls";

import { useAuthContext } from "@/context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineLock, MdOutlineLockOpen } from "react-icons/md";
import { GrPowerReset } from "react-icons/gr";

export default function Security({ user }) {
  console.log({ recent_activities: user?.recent_activities });
  const { user: local_user } = useAuthContext();
  const [inputs, setInputs] = useState(user?.security?.signin_methods || {});
  const [changesMade, setChangesMade] = useState(false);
  const [visibilityPrefs, setVisibilityPrefs] = useState(
    user?.permissions || {
      phone_visibility: false,
      address_visibility: false,
      city_visibility: false,
      postal_code_visibility: false,
      state_visibility: false,
      country_visibility: false,
      // Add other visibility permissions here
    }
  );
  useEffect(() => {
    import("preline");
  }, []);
  const toggleVisibility = (preferenceKey) => {
    setVisibilityPrefs((prevPrefs) => ({
      ...prevPrefs,
      [preferenceKey]: !prevPrefs[preferenceKey],
    }));
    setChangesMade(true);
  };

  const updateSettings = async () => {
    const id = toast.loading("Updating information...");

    const res = await fetch(
      `${account_server}/update-set-single-data-objects/security/_id/${local_user?._id}/`,
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
          key_to_update: "signin_methods",
          value_to_update: inputs,
        }),
      }
    );
    const json = await res.json();
    if (res.ok) {
      toast.update(id, {
        render: "Successfully updated account information",
        type: "success",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        toast.dismiss();
        location.reload();
      }, 6000);
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
  const renderFieldValue = (field, value) => {
    if (Array.isArray(value)) {
      return (
        <ul className="ml-4 list-disc">
          {value.map((item, index) => (
            <li key={index}>{renderFieldValue(field, item)}</li>
          ))}
        </ul>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <ul className="ml-4">
          {Object.entries(value).map(([innerField, innerValue]) => (
            <li key={innerField}>
              <strong>{innerField?.replaceAll("_", " ")}:</strong>{" "}
              {renderFieldValue(innerField, innerValue)}
            </li>
          ))}
        </ul>
      );
    } else if (typeof value === "string" && value.startsWith("http")) {
      // Assuming the value is an image URL
      return <img src={value} alt={field} className="max-w-xs h-32 rounded" />;
    } else {
      return <span>{value}</span>;
    }
  };

  return (
    <div className="space-y-4  pb-10 w-full px-0 lg:px-6">
      <ToastContainer />
      <div className="flex flex-wrap gap-4 ">
        <div className="w-9/12">
          <p className="text-xl font-bold text-gray-900 mb-4">
            Settings & Recommendations
          </p>
          <p>
            Settings and recommendations to help you keep your account secure
          </p>
        </div>
      </div>
      <div className="grid w-full gap-4 sm:gap-6">
        <div className="grid w-full gap-4 sm:gap-6">
          {/* <!-- Card --> */}
          <div className="group flex flex-col w-full bg-white bg-gradient-to-r from-green-50 to-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800">
            <div className="p-4 md:p-5">
              <div className="lg:flex justify-between  items-center">
                <div className=" space-y-3 bg-white w-fit p-4 border rounded-md lg:ml-5">
                  <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                    You have security tips
                  </h3>
                  <p className="text-sm  text-gray-500">
                    Security tips found in the Security Checkup
                  </p>
                </div>
                <img
                  src="https://img.freepik.com/free-vector/certified-antivirus-technology-your-digital-privacy-web-protection_1017-44243.jpg?size=626&ext=jpg&ga=GA1.2.333512076.1694862058&semt=sph"
                  className="  mb-4 w-10 lg:w-44 rounded-full"
                  alt="Avatar"
                />
              </div>
            </div>
          </div>
          {/* <!-- Card --> */}
        </div>
      </div>

      <div className="grid gap-6 w-full   lg:grid-cols-2">
        <div className="grid w-full gap-4 sm:gap-6">
          <div className="grid w-full gap-4 sm:gap-6">
            {/* <!-- Card --> */}
            <div className="group flex flex-col w-full h-full overflow-y-auto  bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800">
              <div className="p-4 md:p-5">
                <div className="flex justify-between">
                  <div className="grow space-y-3 ml-5">
                    <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                      Recent security activity
                    </h3>
                  </div>
                </div>
              </div>
              {/* Activity in preview */}
              <div className="hs-accordion-group px-10">
                {user?.recent_activities?.length > 0 &&
                  user?.recent_activities?.map((ra, i) => (
                    <div
                      className="hs-accordion"
                      id={`hs-basic-heading-${i}`}
                      key={i}
                    >
                      <button
                        className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-3 text-sm inline-flex  items-start gap-x-3 w-full   text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400"
                        aria-expanded="false"
                        aria-controls={`hs-basic-collapse-${i}`}
                      >
                        <svg
                          className="hs-accordion-active:hidden block size-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                        <svg
                          className="hs-accordion-active:block hidden size-3.5"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                        </svg>
                        <div className="space-y-1 w-full ">
                          <p className=" w-full flex justify-between truncate">
                            Device Name
                            <span className="text-xs p-1   border rounded-lg bg-gray-100">
                              {ra?.device_name}
                            </span>
                          </p>
                          <p className=" w-full flex justify-between truncate">
                            IP Address
                            <span className="text-xs p-1 border rounded-lg bg-gray-100">
                              {ra?.deviceInfo?.ip}
                            </span>
                          </p>
                          <p className=" w-full flex justify-between truncate">
                            Location
                            <span className="text-xs p-1 border rounded-lg bg-gray-100">
                              {ra?.deviceInfo?.location}
                            </span>
                          </p>
                          <p className=" w-full flex justify-between truncate">
                            Last Login
                            <span className="text-xs p-1 border rounded-lg bg-gray-100">
                              {ra?.login_time}
                            </span>
                          </p>
                        </div>
                      </button>
                      <div
                        id={`hs-basic-collapse-${i}`}
                        className="hs-accordion-content hidden rounded-lg space-y-1 bg-gray-50 p-6 w-full overflow-hidden transition-[height] duration-300"
                        role="region"
                        aria-labelledby={`hs-basic-heading-${i}`}
                      >
                        {Object.entries(ra || {})
                          .filter(([field, value]) => {
                            // Debug to check if filtering is working
                            console.log("Field:", field, "Value:", value);
                            return field !== "token"; // Exclude 'token'
                          })
                          .map(([field, value]) => (
                            <li
                              key={field}
                              className={`flex ${
                                typeof value === "object"
                                  ? "flex-col text-start"
                                  : "items-start"
                              }   gap-3 text-sm`}
                            >
                              <p className="capitalize   ">
                                {field?.replaceAll("_", " ")}
                              </p>
                              <span className=" ">
                                <span className="rounded-full w-96 overflow-clip truncate py-1 text-xs font-medium text-blue-700">
                                  {renderFieldValue(field, value)}
                                </span>
                              </span>
                            </li>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/* <!-- Card --> */}
          </div>
        </div>
        <div className="grid w-full  overflow-x-auto gap-4 sm:gap-6">
          {/* <!-- Card --> */}
          <div className="group flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800">
            <div className="p-4 md:p-5">
              <div className="flex">
                <div className="grow space-y-3 ml-5">
                  <div className="flex justify-between items-center">
                    <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                      Signin Methods
                      {changesMade && (
                        <span className="text-xs bg-red-50 border-red-50 text-red-600 hover:text-green-600 border p-1 rounded-full px-4 ml-5">
                          Changes Made
                        </span>
                      )}
                    </h3>
                    {changesMade && (
                      <button
                        onClick={() => updateSettings()}
                        className="bg-white px-4 py-1.5 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        data-hs-overlay="#hs-modal-manage-password"
                      >
                        <h3 className="text-xs font-semibold text-blue-600 dark:text-blue-500">
                          Update
                        </h3>
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Make sure you can always access your useraccountdashboard
                    Account by keeping this information up to date
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <div className="flex items-center gap-2 w-60">
                <BsShieldLock className="text-xl mt-1" />
                <div className=" ">
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    2-Step Verification
                  </p>
                </div>
              </div>
              <p className="">
                {inputs?.two_step_signin_method === true
                  ? "Turned On"
                  : "Turned Off"}
              </p>{" "}
              <div className="flex ml-auto gap-2">
                <label
                  htmlFor="two_step_signin_method"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    value=""
                    checked={inputs?.two_step_signin_method}
                    onChange={(e) => {
                      setInputs((prevState) => ({
                        ...prevState,
                        two_step_signin_method: e.target.checked,
                      }));
                      setChangesMade(true);
                    }}
                    id="two_step_signin_method"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                </label>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <div className="flex items-center gap-2 w-60">
                <HiOutlineKey className="text-xl mt-1" />
                <div className=" ">
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Passkeys
                  </p>
                </div>
              </div>
              <p className="w-32 truncate">{user?.passkey}</p>{" "}
              <div className="flex ml-auto gap-2">
                <label
                  htmlFor="passkey_signin_method"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    value=""
                    checked={inputs?.passkey_signin_method}
                    onChange={(e) => {
                      setInputs((prevState) => ({
                        ...prevState,
                        passkey_signin_method: e.target.checked,
                      }));
                      setChangesMade(true);
                    }}
                    id="passkey_signin_method"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                </label>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <div className="flex items-center gap-2 w-60">
                <IoLockClosedOutline className="text-xl mt-1" />
                <div className=" ">
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Password
                  </p>
                </div>
              </div>
              <p className="w-32 truncate">{user?.password}</p>{" "}
              <div className="flex ml-auto gap-2">
                <label
                  htmlFor="password_signin_method"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    value=""
                    checked={inputs?.password_signin_method}
                    onChange={(e) => {
                      setInputs((prevState) => ({
                        ...prevState,
                        password_signin_method: e.target.checked,
                      }));
                      setChangesMade(true);
                    }}
                    id="password_signin_method"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                </label>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <div className="flex items-center gap-2 w-60">
                <BsPhone className="text-xl mt-1" />
                <div className=" ">
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Recovery Phone
                  </p>
                </div>
              </div>
              <p className="w-32 truncate"> {user?.recovery_phone}</p>{" "}
              <div className="flex ml-auto gap-2">
                <label
                  htmlFor="recovery_phone_signin_method"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    value=""
                    checked={inputs?.recovery_phone_signin_method}
                    onChange={(e) => {
                      setInputs((prevState) => ({
                        ...prevState,
                        recovery_phone_signin_method: e.target.checked,
                      }));
                      setChangesMade(true);
                    }}
                    id="recovery_phone_signin_method"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                </label>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <div className="flex items-center gap-2 w-60">
                <HiOutlineMail className="text-xl mt-1" />
                <div className=" ">
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Recovery Email
                  </p>
                </div>
              </div>
              <p className="w-32 truncate">{user?.recovery_email}</p>{" "}
              <div className="flex ml-auto gap-2">
                <label
                  htmlFor="recovery_email_signin_method"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    value=""
                    checked={inputs?.recovery_email_signin_method}
                    onChange={(e) => {
                      setInputs((prevState) => ({
                        ...prevState,
                        recovery_email_signin_method: e.target.checked,
                      }));
                      setChangesMade(true);
                    }}
                    id="recovery_email_signin_method"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                </label>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <div className="flex items-center gap-2 w-60">
                <IoFingerPrintOutline className="text-xl mt-1" />
                <div className=" ">
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Secret Key
                  </p>
                </div>
              </div>
              <p className="w-32 truncate">{user?.security_key}</p>{" "}
              <div className="flex ml-auto gap-2">
                <label
                  htmlFor="secret_key_signin_method"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    value=""
                    checked={inputs?.security_key_signin_method}
                    onChange={(e) => {
                      setInputs((prevState) => ({
                        ...prevState,
                        security_key_signin_method: e.target.checked,
                      }));
                      setChangesMade(true);
                    }}
                    id="secret_key_signin_method"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                </label>
              </div>
            </div>
          </div>
          {/* <!-- Card --> */}
        </div>
      </div>
      <div className="w-full  overflow-x-auto grid gap-6 lg:grid-cols-2">
        <div className="grid w-full gap-4 sm:gap-6">
          {/* <!-- Card --> */}
          <a
            className="group flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
            href="#"
          >
            <div className="p-4 md:p-5">
              <div className="flex">
                <div className="grow space-y-3 ml-5">
                  <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                    Security information
                  </h3>
                  <p className="text-sm text-gray-500">
                    This information is only visible to you unless you make it
                    private
                  </p>
                </div>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Password</p>
              <p className="capitalize truncate w-36">
                {user && user.password && user.password
                  ? user.password
                  : "password"}
              </p>
              <div className="flex ml-auto gap-2">
                <a className=" inline-flex hover:bg-blue-50 border justify-center items-center gap-2 rounded-md text-lg p-2 font-semiboldocus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all   dark:focus:ring-offset-gray-800">
                  <GrPowerReset />
                </a>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Access Key</p>
              <p className="capitalize truncate w-36">
                {user && user.access_key && user.access_key
                  ? user.access_key
                  : "access_key"}
              </p>
              <div className="flex ml-auto gap-2">
                <a className=" inline-flex hover:bg-blue-50 border justify-center items-center gap-2 rounded-md text-lg p-2 font-semiboldocus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all   dark:focus:ring-offset-gray-800">
                  <GrPowerReset />
                </a>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Secret Key</p>
              <p className="capitalize truncate w-36">
                {user && user.security_key && user.security_key
                  ? user.security_key
                  : "security_key"}
              </p>
              <div className="flex ml-auto gap-2">
                <a className=" inline-flex hover:bg-blue-50 border justify-center items-center gap-2 rounded-md text-lg p-2 font-semiboldocus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all   dark:focus:ring-offset-gray-800">
                  <GrPowerReset />
                </a>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Identification</p>
              <p className="capitalize truncate w-36">
                {user && user._id && user._id ? user._id : "_id"}
              </p>
              <div className="flex ml-auto gap-2"></div>
            </div>{" "}
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Biometric Footprint</p>
              <p className="capitalize truncate w-36">
                {user && user.biometric && user.biometric
                  ? user.biometric
                  : "biometric"}
              </p>
              <div className="flex ml-auto gap-2"></div>
            </div>
          </a>
          {/* <!-- Card --> */}
        </div>
        <div className="grid w-full gap-4 sm:gap-6">
          {/* <!-- Card --> */}
          <a
            className="group flex flex-col w-full bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
            href="#"
          >
            <div className="p-4 md:p-5">
              <div className="flex items-start">
                <div className="grow space-y-3 ml-5">
                  <h3 className="group-hover:text-blue-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                    Location information
                    {changesMade && (
                      <span className="text-xs bg-red-50 border-red-50 text-red-600 hover:text-green-600 border p-1 rounded-full px-4 ml-5">
                        Changes Made
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">
                    This information is only visible to you unless you make it
                    public
                  </p>
                </div>
                {changesMade && (
                  <button
                    onClick={() => updateSettings()}
                    className="bg-white px-4 py-1.5 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    data-hs-overlay="#hs-modal-manage-password"
                  >
                    <h3 className="text-xs font-semibold text-blue-600 dark:text-blue-500">
                      Update
                    </h3>
                  </button>
                )}
              </div>
            </div>

            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Address</p>
              <p className="capitalize truncate w-36">
                {user?.location_information?.street_address || "address"}
              </p>
              <div className="flex ml-auto gap-2">
                <div>
                  <button
                    onClick={() => toggleVisibility("address_visibility")}
                    className={`inline-flex ${
                      visibilityPrefs.address_visibility
                        ? "focus:ring-blue-500 text-red-500"
                        : " text-green-500"
                    } hover:bg-blue-50 border justify-center items-center gap-2 rounded-md text-xs p-1 font-semibold focus:ring-2  focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800`}
                  >
                    {visibilityPrefs.address_visibility ? (
                      <MdOutlineLockOpen className="text-lg " />
                    ) : (
                      <MdOutlineLock className="text-lg " />
                    )}
                    {visibilityPrefs.address_visibility ? "Public" : "Private"}
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">City</p>
              <p className="capitalize truncate w-36">
                {user?.location_information?.city || "city"}
              </p>
              <div className="flex ml-auto gap-2">
                <div>
                  <button
                    onClick={() => toggleVisibility("city_visibility")}
                    className={`inline-flex ${
                      visibilityPrefs.city_visibility
                        ? "focus:ring-blue-500 text-red-500"
                        : " text-green-500"
                    } hover:bg-blue-50 border justify-center items-center gap-2 rounded-md text-xs p-1 font-semibold focus:ring-2  focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800`}
                  >
                    {visibilityPrefs.city_visibility ? (
                      <MdOutlineLockOpen className="text-lg " />
                    ) : (
                      <MdOutlineLock className="text-lg " />
                    )}
                    {visibilityPrefs.city_visibility ? "Public" : "Private"}
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Postal Code</p>
              <p className="capitalize truncate w-36">
                {user?.location_information?.postal_code || "postal_code"}
              </p>
              <div className="flex ml-auto gap-2">
                <div>
                  <button
                    onClick={() => toggleVisibility("postal_code_visibility")}
                    className={`inline-flex ${
                      visibilityPrefs.postal_code_visibility
                        ? "focus:ring-blue-500 text-red-500"
                        : " text-green-500"
                    } hover:bg-blue-50 border justify-center items-center gap-2 rounded-md text-xs p-1 font-semibold focus:ring-2  focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800`}
                  >
                    {visibilityPrefs.postal_code_visibility ? (
                      <MdOutlineLockOpen className="text-lg " />
                    ) : (
                      <MdOutlineLock className="text-lg " />
                    )}
                    {visibilityPrefs.postal_code_visibility
                      ? "Public"
                      : "Private"}
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">State</p>
              <p className="capitalize truncate w-36">
                {user?.location_information?.state || "state"}
              </p>
              <div className="flex ml-auto gap-2">
                <div>
                  <button
                    onClick={() => toggleVisibility("state_visibility")}
                    className={`inline-flex ${
                      visibilityPrefs.state_visibility
                        ? "focus:ring-blue-500 text-red-500"
                        : " text-green-500"
                    } hover:bg-blue-50 border justify-center items-center gap-2 rounded-md text-xs p-1 font-semibold focus:ring-2  focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800`}
                  >
                    {visibilityPrefs.state_visibility ? (
                      <MdOutlineLockOpen className="text-lg " />
                    ) : (
                      <MdOutlineLock className="text-lg " />
                    )}
                    {visibilityPrefs.state_visibility ? "Public" : "Private"}
                  </button>
                </div>
              </div>
            </div>
            <div className="p-2 h-16 border-t items-center px-10 flex   hover:bg-slate-50">
              <p className="w-60">Country</p>
              <p className="capitalize truncate w-36">
                {user?.location_information?.country || "country"}
              </p>
              <div className="flex ml-auto gap-2">
                <div>
                  <button
                    onClick={() => toggleVisibility("country_visibility")}
                    className={`inline-flex ${
                      visibilityPrefs.country_visibility
                        ? "focus:ring-blue-500 text-red-500"
                        : " text-green-500"
                    } hover:bg-blue-50 border justify-center items-center gap-2 rounded-md text-xs p-1 font-semibold focus:ring-2  focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800`}
                  >
                    {visibilityPrefs.country_visibility ? (
                      <MdOutlineLockOpen className="text-lg " />
                    ) : (
                      <MdOutlineLock className="text-lg " />
                    )}
                    {visibilityPrefs.country_visibility ? "Public" : "Private"}
                  </button>
                </div>
              </div>
            </div>
          </a>
          {/* <!-- Card --> */}
        </div>
      </div>
    </div>
  );
}
