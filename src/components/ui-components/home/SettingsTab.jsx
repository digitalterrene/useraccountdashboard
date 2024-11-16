import { useAuthContext } from "@/context/AuthContext";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { account_server } from "../../../../utils/urls";
import { useRouter } from "next/navigation";
import("preline");
export default function SettingsTab({ user }) {
  const { user: local_user } = useAuthContext();
  const router = useRouter();
  const [inputsArray, setInputsArray] = useState([]);

  const [inputs, setInputs] = useState({ ...user?.permissions });

  const updateSettings = async () => {
    let level_extention = "update-set-single-data-strings";
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
          key_to_update: "permissions",
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
    <div>
      {" "}
      <div className="border rounded-2xl">
        {" "}
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-gray-200">
            Permissions
          </h3>

          <button
            type="button"
            onClick={() => updateSettings()}
            className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700     disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <p className="text-xs">Save</p>
          </button>
        </div>
        <div className=" overflow-hidden  p-5  ">
          <div className="grid border-b  pb-3 ">
            <div className="space-y-2">
              <h2 className="  font-semibold leading-4 text-slate-700">
                On Signin
              </h2>
              <p className=" text-sm text-slate-600">
                These permissions allows us to communicate with you whenever
                there is a login activity on your account
              </p>
            </div>
            <div className="mt-4 flex items-center  ">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="notify_signin_via_email"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    value=""
                    checked={inputs?.notify_signin_via_email}
                    onChange={(e) => {
                      setInputs((prevState) => ({
                        ...prevState,
                        notify_signin_via_email: e.target.checked,
                      }));
                      setInputsArray((prevState) => [
                        ...prevState,
                        { notify_signin_via_email: e.target.checked },
                      ]);
                    }}
                    id="notify_signin_via_email"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Email
                  </span>
                </label>
                <label
                  htmlFor="notify_signin_via_whatsapp"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    checked={inputs?.notify_signin_via_whatsapp}
                    onChange={(e) => {
                      setInputs((prevState) => ({
                        ...prevState,
                        notify_signin_via_whatsapp: e.target.checked,
                      }));
                      setInputsArray((prevState) => [
                        ...prevState,
                        { notify_signin_via_whatsapp: e.target.checked },
                      ]);
                    }}
                    id="notify_signin_via_whatsapp"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    WhatsApp
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid border-b  py-3 mt-3 ">
            <div className="space-y-2">
              <h2 className="  font-semibold leading-4 text-slate-700">
                Multi Devices Signin
              </h2>
              <p className=" text-sm text-slate-600">
                Configure signing into an account from multiple devices and or
                signing multiple accounts from one device (this requires you to
                create a device footprint).
              </p>
            </div>
            <div className="mt-4 flex items-start lg:items-center  ">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="one-account-multiple-devices"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    value=""
                    checked={inputs?.signin_acc_on_multiple_devices}
                    onChange={(e) => {
                      setInputs((prevState) => ({
                        ...prevState,
                        signin_acc_on_multiple_devices: e.target.checked,
                      }));
                      setInputsArray((prevState) => [
                        ...prevState,
                        {
                          signin_acc_on_multiple_devices: e.target.checked,
                        },
                      ]);
                    }}
                    id="one-account-multiple-devices"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Signin on multiple devices
                  </span>
                </label>
                <label
                  htmlFor="multiple-devices-one-account"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    value=""
                    checked={inputs?.allow_multiple_devices_to_signin}
                    onChange={(e) => {
                      setInputs((prevState) => ({
                        ...prevState,
                        allow_multiple_devices_to_signin: e.target.checked,
                      }));
                      setInputsArray((prevState) => [
                        ...prevState,
                        {
                          allow_multiple_devices_to_signin: e.target.checked,
                        },
                      ]);
                    }}
                    id="multiple-devices-one-account"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Multi-device Account Sign-ins
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="grid border-b  py-3 mt-3 ">
            <div className="space-y-2">
              <h2 className="  font-semibold leading-4 text-slate-700">
                Location
              </h2>
              <p className=" text-sm text-slate-600">
                Keep in mind that useraccountdashboard keeps your location
                history for security purposes, however this configuration is
                there to secure your account futher from hacking.
              </p>
            </div>
            <div className="mt-4 flex items-center  ">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="location-history-tracking"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    value=""
                    checked={inputs?.save_location_history}
                    onChange={(e) => {
                      setInputs((prevState) => ({
                        ...prevState,
                        save_location_history: e.target.checked,
                      }));
                      setInputsArray((prevState) => [
                        ...prevState,
                        { save_location_history: e.target.checked },
                      ]);
                    }}
                    id="location-history-tracking"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Location history
                  </span>
                </label>
                <label
                  htmlFor="location-visible-to-people-and-sharing"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    value=""
                    checked={inputs?.location_visible_to_sharing}
                    onChange={(e) => {
                      setInputs((prevState) => ({
                        ...prevState,
                        location_visible_to_sharing: e.target.checked,
                      }));
                      setInputsArray((prevState) => [
                        ...prevState,
                        { location_visible_to_sharing: e.target.checked },
                      ]);
                    }}
                    id="location-visible-to-people-and-sharing"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Visible to People and Sharing
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
