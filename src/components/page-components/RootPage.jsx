"use client";
import React, { useEffect, useState } from "react";
import { account_server } from "../../../utils/urls";
import { Checkbox } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import HomePage from "./HomePage";
import { signUpWithGoogle } from "@/libs/firebase/auth";
import {
  browserName,
  isDesktop,
  isMobileOnly,
  isTablet,
} from "react-device-detect";

export default function RootPage() {
  const [inputs, setInputs] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { user, dispatch } = useAuthContext();
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
    const id = toast.loading("Creating new account...");
    const response = await fetch(`${account_server}/upsert-new`, {
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
        render: "Successfully created account",
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

      localStorage.setItem("user", JSON.stringify(json));
      setTimeout(() => {
        const authenticationStatus = json?._id ? "logged-in" : "not-logged-in";
        const authenticationToken = json?.token
          ? `${json?.token}`
          : "No auth token provided";
        router.push(
          `/${json?._id}/home?authenticationStatus=${authenticationStatus}&&authenticationToken=${authenticationToken}`
        );
        dispatch({ type: "LOGIN", payload: json });
        //location.reload();
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
    }, 5000);
  };
  const handleGoogleSignUp = async () => {
    const json = await signUpWithGoogle();

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
        toast.success("Successfully signed up");
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
  return (
    <div className=" w-full  ">
      <ToastContainer />
      {user ? (
        <HomePage />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative mx-auto w-fit  dark:from-blue-950 dark:via-transparent"
        >
          <div className="lg:max-w-[85rem]mx-auto">
            <div className="lg:grid items-start   md:grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="lg:max-w-lg  px-4 py-10 sm:px-6 lg:px-8 lg:py-14  md:w-full w-full lg:mx-auto lg:me-0 ms-auto">
                <div className="p-4 sm:p-7 flex flex-col bg-white rounded-2xl border  shadow-lg dark:bg-slate-900">
                  <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                      Get Started
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Already have an account?
                      <a
                        className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        href="/authentication/signin-user"
                      >
                        Sign in here
                      </a>
                    </p>
                  </div>

                  <div className="mt-5">
                    <button
                      // type="button"
                      onClick={handleGoogleSignUp}
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
                        ></path>
                        <path
                          d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                          fill="#34A853"
                        ></path>
                        <path
                          d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                          fill="#FBBC05"
                        ></path>
                        <path
                          d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                          fill="#EB4335"
                        ></path>
                      </svg>
                      Sign up with Google
                    </button>

                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-700 dark:after:border-gray-700">
                      Or
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="relative">
                          <input
                            required
                            type="text"
                            value={inputs?.firstname}
                            onChange={(e) =>
                              setInputs((prevState) => ({
                                ...prevState,
                                firstname: e.target.value,
                              }))
                            }
                            id="hs-hero-signup-form-floating-input-first-name"
                            className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500  border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                            placeholder="John"
                          />
                          <label
                            htmlFor="hs-hero-signup-form-floating-input-first-name"
                            className="absolute   top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                          >
                            First name
                          </label>
                        </div>
                      </div>

                      <div>
                        <div className="relative">
                          <input
                            required
                            type="text"
                            value={inputs?.lastname}
                            onChange={(e) =>
                              setInputs((prevState) => ({
                                ...prevState,
                                lastname: e.target.value,
                              }))
                            }
                            id="hs-hero-signup-form-floating-input-last-name"
                            className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500  border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                            placeholder="Doe"
                          />
                          <label
                            htmlFor="hs-hero-signup-form-floating-input-last-name"
                            className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                          >
                            Last name
                          </label>
                        </div>
                      </div>

                      <div>
                        <div className="relative">
                          <input
                            required
                            type="email"
                            value={inputs?.email}
                            onChange={(e) =>
                              setInputs((prevState) => ({
                                ...prevState,
                                email: e.target.value,
                              }))
                            }
                            id="hs-hero-signup-form-floating-input-email"
                            className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500  border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                            placeholder="you@email.com"
                          />
                          <label
                            htmlFor="hs-hero-signup-form-floating-input-email"
                            className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                          >
                            Email
                          </label>
                        </div>
                      </div>

                      <div>
                        <div className="relative">
                          <input
                            required
                            type="text"
                            value={inputs?.access_key}
                            onChange={(e) =>
                              setInputs((prevState) => ({
                                ...prevState,
                                access_key: e.target.value,
                              }))
                            }
                            id="hs-hero-signup-form-floating-input-company-name"
                            className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500  border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                            placeholder="****"
                          />
                          <label
                            htmlFor="hs-hero-signup-form-floating-input-company-name"
                            className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                          >
                            Access Key
                          </label>
                        </div>
                      </div>

                      <div className="relative col-span-full">
                        <div className="relative">
                          <input
                            required
                            type={showPassword ? "text" : "password"}
                            value={inputs?.security_key}
                            onChange={(e) =>
                              setInputs((prevState) => ({
                                ...prevState,
                                security_key: e.target.value,
                              }))
                            }
                            id="hs-hero-signup-form-floating-input-new-password"
                            className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500  border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                            placeholder="********"
                          />
                          <label
                            htmlFor="hs-hero-signup-form-floating-input-new-password"
                            className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                          >
                            Security Key
                          </label>
                        </div>

                        <div
                          id="hs-strong-password-popover"
                          className="hidden absolute z-10 w-full bg-blue-50 rounded-lg p-4 dark:bg-blue-950"
                        >
                          <div
                            id="hs-strong-password-in-popover"
                            data-hs-strong-password='{
                          "target": "#hs-hero-signup-form-floating-input-new-password",
                          "hints": "#hs-strong-password-popover",
                          "stripclassNamees": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1",
                          "mode": "popover"
                        }'
                            className="flex mt-2 -mx-1"
                          ></div>

                          <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
                            Your password must contain:
                          </h4>

                          <ul className="space-y-1 text-sm text-gray-500">
                            <li
                              data-hs-strong-password-hints-rule-text="min-length"
                              className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                            >
                              <span className="hidden" data-check>
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
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </span>
                              <span data-uncheck>
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
                              </span>
                              Minimum number of characters is 6.
                            </li>
                            <li
                              data-hs-strong-password-hints-rule-text="lowercase"
                              className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                            >
                              <span className="hidden" data-check>
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
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </span>
                              <span data-uncheck>
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
                              </span>
                              Should contain lowercase.
                            </li>
                            <li
                              data-hs-strong-password-hints-rule-text="uppercase"
                              className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                            >
                              <span className="hidden" data-check>
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
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </span>
                              <span data-uncheck>
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
                              </span>
                              Should contain uppercase.
                            </li>
                            <li
                              data-hs-strong-password-hints-rule-text="numbers"
                              className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                            >
                              <span className="hidden" data-check>
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
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </span>
                              <span data-uncheck>
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
                              </span>
                              Should contain numbers.
                            </li>
                            <li
                              data-hs-strong-password-hints-rule-text="special-characters"
                              className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2"
                            >
                              <span className="hidden" data-check>
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
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </span>
                              <span data-uncheck>
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
                              </span>
                              Should contain special characters.
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-span-full">
                        <div className="relative">
                          <input
                            required
                            type={showPassword ? "text" : "password"}
                            value={inputs?.password}
                            onChange={(e) =>
                              setInputs((prevState) => ({
                                ...prevState,
                                password: e.target.value,
                              }))
                            }
                            id="hs-hero-signup-form-floating-input-current-password"
                            className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500  border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                      focus:pt-6
                      focus:pb-2
                      [&:not(:placeholder-shown)]:pt-6
                      [&:not(:placeholder-shown)]:pb-2
                      autofill:pt-6
                      autofill:pb-2"
                            placeholder="********"
                          />
                          <label
                            htmlFor="hs-hero-signup-form-floating-input-current-password"
                            className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                        peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500"
                          >
                            Password
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center">
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

                    <div className="mt-5">
                      <button
                        type="submit"
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        Get started
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-b hidden lg:block to-white via-[#E5E8E1]  from-[#E5E8E1] h-full ">
                <img
                  className="h-full object-contain object-left"
                  src="https://img.freepik.com/free-photo/elderly-woman-using-laptop_53876-96948.jpg?size=626&ext=jpg&ga=GA1.1.1135384207.1703006759&semt=ais"
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
