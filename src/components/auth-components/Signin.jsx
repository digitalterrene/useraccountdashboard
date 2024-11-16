"use client";
import { Checkbox } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { account_server } from "../../../utils/urls";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { signInWithGoogle, signOutWithGoogle } from "@/libs/firebase/auth";
import {
  browserName,
  isDesktop,
  isMobileOnly,
  isTablet,
} from "react-device-detect";
export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({});
  const router = useRouter();
  const [deviceInfo, setDeviceInfo] = useState(null);
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
        browserName: browserName,
        ip,
        location,
        operatingSystem,
        loginTime: new Date().toISOString(),
      };
      setDeviceInfo(info);
    });
  }, []);
  //Logic to save login session
  const device_name = `${
    isMobileOnly
      ? "Phone"
      : isTablet
      ? "Table"
      : isDesktop
      ? "Desktop"
      : "Unrecognized"
  }`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = toast.loading("Logging in...");
    const response = await fetch(`${account_server}/signin-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      credentials: "include",
      body: JSON.stringify(inputs),
    });
    const json = await response.json();
    if (response.ok) {
      toast.update(id, {
        render: "Successfully logged in",
        type: "success",
        isLoading: false,
        position: toast.POSITION.TOP_RIGHT,
      });

      //Push a login session to the user activity
      const login_session_data = {
        user_id: json._id,
        image: json?.image,
        ip: deviceInfo.ip,
        browser_name: browserName,
        username: json?.username || json?.name || json?.email,
        email: json.email,
        deviceInfo,
        token: json.token,
        device_name,
        operating_system: deviceInfo.operatingSystem,
        login_time: new Date().toISOString(),
      };
      await fetch(
        `${account_server}/update-add-to-set-single-data-arrays/_id/${json?._id}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${json?.token}`,
            useraccountdashboard_account_user_id: `${json?._id}`,
            "Content-Type": "application/json",
          },
          mode: "cors",
          cache: "no-cache",
          body: JSON.stringify({
            key_to_update: "recent_activities",
            value_to_update: login_session_data,
          }),
        }
      );

      //Proceed with storing the user local state
      const authenticationStatus = json?._id ? "logged-in" : "not-logged-in";
      const authenticationToken = json?.token
        ? `${json?.token}`
        : "No auth token provided";
      setTimeout(() => {
        router.push(
          `/${json?._id}/home?authenticationStatus=${authenticationStatus}&&authenticationToken=${authenticationToken}`
        );
      }, 2000);
      localStorage.setItem("user", JSON.stringify(json));
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
    }, 5000);
  };
  const handleGoogleSignIn = async () => {
    const json = await signInWithGoogle();

    if (json && json._id) {
      //Push a login session to the user activity
      const login_session_data = {
        user_id: json._id,
        image: json?.image,
        ip: deviceInfo.ip,
        browser_name: browserName,
        username: json?.username || json?.name || json?.email,
        email: json.email,
        deviceInfo,
        token: json.token,
        device_name,
        operating_system: deviceInfo.operatingSystem,
        login_time: new Date().toISOString(),
      };
      await fetch(
        `${account_server}/update-add-to-set-single-data-arrays/_id/${json?._id}`,
        {
          method: "PUT",
          headers: {
            authorization: `Bearer ${json?.token}`,
            useraccountdashboard_account_user_id: `${json?._id}`,
            "Content-Type": "application/json",
          },
          mode: "cors",
          cache: "no-cache",
          body: JSON.stringify({
            key_to_update: "recent_activities",
            value_to_update: login_session_data,
          }),
        }
      );
      // Check if json exists and has _id
      setTimeout(() => {
        toast.success("Successfully logged in");
      }, 3000);
      const authenticationStatus = "logged-in";
      const authenticationToken = json.token || "No auth token provided";
      const user = { ...json, lastLogin: new Date() };

      setTimeout(() => {
        router.refresh();
        router.push(
          `/${json._id}/dashboard?authenticationStatus=${authenticationStatus}&&authenticationToken=${authenticationToken}`
        );
      }, 2000);

      localStorage.setItem("user", JSON.stringify(user));
      // await createSession(user?.user_external_uid);
    } else {
      // Handle errors more gracefully
      const errorMessage = json?.error || "An unknown error occurred";
      setTimeout(() => {
        toast.error(errorMessage);
      }, 3000);
    }

    setTimeout(() => {
      toast?.dismiss();
    }, 6000);
  };
  const handleSignOut = async () => {
    router.refresh();
    await signOutWithGoogle();
    await removeSession();
  };

  return (
    <div className="h-full">
      <ToastContainer />
      <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-16">
        <div className="w-full max-w-md mx-auto p-6">
          <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Sign in
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account yet?
                  <a
                    className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="/authentication/signup-user"
                  >
                    Sign up here
                  </a>
                </p>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <svg
                    className="w-4 h-auto"
                    width="46"
                    height="47"
                    viewBox="0 0 46 47"
                    fill="none"
                  >
                    <path
                      d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                      fill="#34A853"
                    />
                    <path
                      d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                      fill="#EB4335"
                    />
                  </svg>
                  Sign in with Google
                </button>

                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                  Or
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        for="email"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={inputs?.email}
                          onChange={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              email: e.target.value,
                            }))
                          }
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 border  disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                          aria-describedby="email-error"
                        />
                        <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                          <svg
                            className="h-5 w-5 text-red-500"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </div>
                      </div>
                      <p
                        className="hidden text-xs text-red-600 mt-2"
                        id="email-error"
                      >
                        Please include a valid email address so we can get back
                        to you
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center">
                        <label
                          for="password"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Password
                        </label>
                        <a
                          className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          href="/authentication/forgot-password"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={inputs?.password}
                          onChange={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              password: e.target.value,
                            }))
                          }
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 border  disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                          aria-describedby="password-error"
                        />
                        <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
                          <svg
                            className="h-5 w-5 text-red-500"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            aria-hidden="true"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </div>
                      </div>
                      <p
                        className="hidden text-xs text-red-600 mt-2"
                        id="password-error"
                      >
                        8+ characters required
                      </p>
                    </div>

                    <div className="flex items-center">
                      {" "}
                      <Checkbox
                        onChange={(e) =>
                          e.target.checked === true
                            ? setShowPassword(true)
                            : setShowPassword(false)
                        }
                        color="blue"
                        label="Show Password"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
