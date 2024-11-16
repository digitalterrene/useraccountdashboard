"use client";
import { dashboards } from "@/assets/data";
import { useAuthContext } from "@/context/AuthContext";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { account_server } from "../../../../utils/urls";

export default function AppsAndServices({ apps_and_services }) {
  const { user } = useAuthContext();
  const [inputs, setInputs] = useState({ ...apps_and_services });

  const updateSettings = async () => {
    const id = toast.loading("Updating information...");

    const res = await fetch(
      `${account_server}/update-set-single-data-objects/data_and_privacy/_id/${user?._id}/`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${user?.token}`,
          useraccountdashboard_account_user_id: `${user?._id}`,
          "Content-Type": "application/json",
        },
        mode: "cors",
        cache: "no-cache",
        body: JSON.stringify({
          key_to_update: "apps_and_services",
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
    <div className=" w-full      ">
      <ToastContainer />
      <div className="flex p-4 justify-end gap-4">
        <button
          type="button"
          onClick={() => updateSettings()}
          className=" py-1 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          <p className="text-xs">Update</p>
        </button>{" "}
        {/* <button
          type="button"
          onClick={() => updateSettings()}
          className=" py-1 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          <p className="text-xs">Reset</p>
        </button> */}
      </div>
      <div className="     transition-all      ">
        <div className="max-h-full overflow-hidden flex flex-col bg-white  pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex justify-between items-center py-3 px-4  dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">
              Dashboards Configurations
            </h3>
          </div>

          <div className="p-4 w-full overflow-y-auto">
            <div className="sm:divide-y divide-gray-200 dark:divide-gray-700">
              <div className="py-3 sm:py-6">
                {/* <!-- Grid --> */}
                <div className="grid   w-full gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {dashboards &&
                    dashboards.map(({ icon, name }, i) => (
                      <div className="bg-white p-4 transition border duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className="flex    ">
                          <div className="mt-1.5 flex justify-center flex-shrink-0 rounded-s-xl">
                            <img className="w-6 mt-0.5 h-6" src={icon} />
                          </div>

                          <div className="p-2 ">
                            <div className="flex justify-between items-center">
                              <h3 className="text-sm capitalize font-semibold text-blue-600 dark:text-blue-500">
                                {name}
                              </h3>
                            </div>

                            <p className="mt-1 mb-6 text-xs line-clamp-2 text-gray-600 dark:text-gray-500">
                              This information is shared with your {name}{" "}
                              dashboard
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {" "}
                              <label
                                htmlFor={`share_password_with_${name}`}
                                className="relative inline-flex cursor-pointer items-center"
                              >
                                <input
                                  type="checkbox"
                                  value=""
                                  checked={
                                    inputs?.[`share_password_with_${name}`]
                                  }
                                  onChange={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      [`share_password_with_${name}`]:
                                        e.target.checked,
                                    }))
                                  }
                                  id={`share_password_with_${name}`}
                                  className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Password
                                </span>
                              </label>
                              <label
                                htmlFor={`share_access_key_with_${name}`}
                                className="relative inline-flex cursor-pointer items-center"
                              >
                                <input
                                  type="checkbox"
                                  value=""
                                  checked={
                                    inputs?.[`share_access_key_with_${name}`]
                                  }
                                  onChange={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      [`share_access_key_with_${name}`]:
                                        e.target.checked,
                                    }))
                                  }
                                  id={`share_access_key_with_${name}`}
                                  className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Access Key
                                </span>
                              </label>
                              <label
                                htmlFor={`share_security_key_with_${name}`}
                                className="relative inline-flex cursor-pointer items-center"
                              >
                                <input
                                  type="checkbox"
                                  value=""
                                  checked={
                                    inputs?.[`share_security_key_with_${name}`]
                                  }
                                  onChange={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      [`share_security_key_with_${name}`]:
                                        e.target.checked,
                                    }))
                                  }
                                  id={`share_security_key_with_${name}`}
                                  className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Security Key
                                </span>
                              </label>
                              <label
                                htmlFor={`share_id_with_${name}`}
                                className="relative inline-flex cursor-pointer items-center"
                              >
                                <input
                                  type="checkbox"
                                  value=""
                                  checked={inputs?.[`share_id_with_${name}`]}
                                  onChange={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      [`share_id_with_${name}`]:
                                        e.target.checked,
                                    }))
                                  }
                                  id={`share_id_with_${name}`}
                                  className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                  Identification
                                </span>
                              </label>
                              <label
                                htmlFor={`share_biometrics_with_${name}`}
                                className="relative inline-flex cursor-pointer items-center"
                              >
                                <input
                                  type="checkbox"
                                  value=""
                                  checked={
                                    inputs?.[`share_biometrics_with_${name}`]
                                  }
                                  onChange={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      [`share_biometrics_with_${name}`]:
                                        e.target.checked,
                                    }))
                                  }
                                  id={`share_biometrics_with_${name}`}
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
                    ))}
                  {/* <!-- Card --> */}

                  {/* <!-- End Card --> */}
                </div>
                {/* <!-- End Grid --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
