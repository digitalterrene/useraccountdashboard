"use client";
import { useAuthContext } from "@/context/AuthContext";
import { Checkbox, Chip } from "@material-tailwind/react";
import React, { useState } from "react";
import { account_server } from "../../../../utils/urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyAdCenter({ my_ad_center }) {
  const { user } = useAuthContext();
  const [inputs, setInputs] = useState({ ...my_ad_center });

  //const { general, advertisers_criteria } = my_ad_center;
  //const { content_type, tlds, advertisers, locations } = advertisers_criteria;
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
          key_to_update: "my_ad_center",
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
    <div className="px-4 space-y-6">
      <ToastContainer />
      <div className="flex  justify-end gap-4">
        <button
          type="button"
          onClick={() => updateSettings()}
          className=" py-1 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border text-blue-800 hover:bg-blue-50 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          <p className="text-xs">Update</p>
        </button>{" "}
        {/* <button
          type="button"
          onClick={() => updateSettings()}
          className=" py-1 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border text-blue-800 hover:bg-blue-50 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          <p className="text-xs">Reset</p>
        </button> */}
      </div>
      <div className="border h-fit rounded-2xl">
        {" "}
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-gray-200">
            General
          </h3>
        </div>
        <div className=" overflow-hidden  p-5  ">
          <div className="grid border-b  pb-3 ">
            <div className="space-y-2">
              <p className=" text-sm text-slate-600">
                These permissions allows us to communicate with you whenever
                there is a login activity on your account
              </p>
            </div>
            <div className="mt-4 flex items-center  ">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="allow_ads"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    value=""
                    checked={inputs?.allow_ads}
                    onChange={(e) =>
                      setInputs((prevState) => ({
                        ...prevState,
                        allow_ads: e.target.checked,
                      }))
                    }
                    id="allow_ads"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Allow Ads
                  </span>
                </label>
                <label
                  htmlFor="allow_user_profiling"
                  className="relative inline-flex cursor-pointer items-center"
                >
                  <input
                    type="checkbox"
                    checked={inputs?.allow_user_profiling}
                    onChange={(e) =>
                      setInputs((prevState) => ({
                        ...prevState,
                        allow_user_profiling: e.target.checked,
                      }))
                    }
                    id="allow_user_profiling"
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                  <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Allow user profiling
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full  bg-red-900">
        <div className="cosl-span-2  w-full      ">
          <div className="     transition-all   ">
            <div className="max-h-full overflow-hidden flex flex-col bg-white  pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className="flex justify-between items-center py-3 px-4  dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-gray-200">
                  Advertisers Criteria
                </h3>
              </div>

              <div className="p-4 overflow-y-auto">
                <div className="sm:divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="py-3 sm:py-6">
                    <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                      Content Type
                    </h4>

                    {/* <!-- Grid --> */}
                    <ul className="grid grid-cols-3">
                      {/* <!-- Card --> */}
                      <li class="flex hover:bg-blue-50 items-center ">
                        <Checkbox
                          color="blue"
                          checked={inputs?.content_type_email_news_letters}
                          onClick={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              content_type_email_news_letters: e.target.checked,
                            }))
                          }
                          ripple={false}
                          className="       transition-all hover:scale-105 hover:before:opacity-0"
                        />
                        <span class="text-gray-800 dark:text-gray-400">
                          Email newsletters
                        </span>
                      </li>
                      <li class="flex hover:bg-blue-50 items-center ">
                        <Checkbox
                          color="blue"
                          ripple={false}
                          checked={inputs?.content_type_product_guides}
                          onClick={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              content_type_product_guides: e.target.checked,
                            }))
                          }
                          className="       transition-all hover:scale-105 hover:before:opacity-0"
                        />
                        <span class="text-gray-800 dark:text-gray-400">
                          Product guides
                        </span>
                      </li>
                      <li class="flex hover:bg-blue-50 items-center ">
                        <Checkbox
                          color="blue"
                          ripple={false}
                          checked={inputs?.content_type_blog_posts}
                          onClick={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              content_type_blog_posts: e.target.checked,
                            }))
                          }
                          className="       transition-all hover:scale-105 hover:before:opacity-0"
                        />
                        <span class="text-gray-800 dark:text-gray-400">
                          Blog posts/articles
                        </span>
                      </li>
                      <li class="flex hover:bg-blue-50 items-center ">
                        <Checkbox
                          color="blue"
                          ripple={false}
                          checked={inputs?.content_type_social_media_posts}
                          onClick={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              content_type_social_media_posts: e.target.checked,
                            }))
                          }
                          className="       transition-all hover:scale-105 hover:before:opacity-0"
                        />
                        <span class="text-gray-800 dark:text-gray-400">
                          Social media posts
                        </span>
                      </li>
                      <li class="flex hover:bg-blue-50 items-center ">
                        <Checkbox
                          color="blue"
                          ripple={false}
                          checked={
                            inputs?.content_type_customer_success_stories
                          }
                          onClick={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              content_type_customer_success_stories:
                                e.target.checked,
                            }))
                          }
                          className="       transition-all hover:scale-105 hover:before:opacity-0"
                        />
                        <span class="text-gray-800 dark:text-gray-400">
                          Customer success stories
                        </span>
                      </li>
                      <li class="flex hover:bg-blue-50 items-center ">
                        <Checkbox
                          color="blue"
                          ripple={false}
                          checked={inputs?.content_type_podcasts}
                          onClick={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              content_type_podcasts: e.target.checked,
                            }))
                          }
                          className="       transition-all hover:scale-105 hover:before:opacity-0"
                        />
                        <span class="text-gray-800 dark:text-gray-400">
                          Podcasts
                        </span>
                      </li>
                      <li class="flex hover:bg-blue-50 items-center ">
                        <Checkbox
                          color="blue"
                          ripple={false}
                          checked={inputs?.content_type_case_studies}
                          onClick={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              content_type_case_studies: e.target.checked,
                            }))
                          }
                          className="       transition-all hover:scale-105 hover:before:opacity-0"
                        />
                        <span class="text-gray-800 dark:text-gray-400">
                          Case studies
                        </span>
                      </li>
                      <li class="flex hover:bg-blue-50 items-center ">
                        <Checkbox
                          color="blue"
                          ripple={false}
                          checked={inputs?.content_type_videos}
                          onClick={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              content_type_videos: e.target.checked,
                            }))
                          }
                          className="       transition-all hover:scale-105 hover:before:opacity-0"
                        />
                        <span class="text-gray-800 dark:text-gray-400">
                          Videos
                        </span>
                      </li>
                      {/* <!-- End Card --> */}
                    </ul>
                    {/* <!-- End Grid --> */}
                  </div>
                  <div className="py-3 sm:py-6">
                    <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                      TLDs
                    </h4>

                    {/* <!-- Grid --> */}
                    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                      {/* <!-- Card --> */}
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className="flex    ">
                          <div className="mt-1.5 flex justify-center flex-shrink-0 rounded-s-xl">
                            <img
                              className="w-6 mt-0.5 h-6"
                              src="https://cdn-icons-png.flaticon.com/128/3413/3413246.png"
                            />
                          </div>

                          <div className="p-2 ">
                            <div className="flex justify-between items-center">
                              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                Com
                              </h3>
                              <label
                                htmlFor="tdls_dot_com"
                                className="relative inline-flex cursor-pointer items-center"
                              >
                                <input
                                  type="checkbox"
                                  value=""
                                  checked={inputs?.tdls_dot_com}
                                  onChange={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      tdls_dot_com: e.target.checked,
                                    }))
                                  }
                                  id="tdls_dot_com"
                                  className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                              </label>
                            </div>

                            <p className="mt-1 text-xs text-gray-600 dark:text-gray-500">
                              Most popular domain extension for any business and
                              widely recognized
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className="flex    ">
                          <div className="mt-1.5 flex justify-center flex-shrink-0 rounded-s-xl">
                            <img
                              className="w-6 mt-0.5 h-6"
                              src="https://cdn-icons-png.flaticon.com/128/4207/4207230.png"
                            />
                          </div>

                          <div className="p-2 ">
                            <div className="flex justify-between items-center">
                              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                Net
                              </h3>
                              <label
                                htmlFor="tdls_dot_net"
                                className="relative inline-flex cursor-pointer items-center"
                              >
                                <input
                                  type="checkbox"
                                  value=""
                                  checked={inputs?.tdls_dot_net}
                                  onChange={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      tdls_dot_net: e.target.checked,
                                    }))
                                  }
                                  id="tdls_dot_net"
                                  className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                              </label>
                            </div>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">
                              Good for tech or web-based companies since it
                              derives from the term “network”
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className="flex    ">
                          <div className="mt-1.5 flex justify-center flex-shrink-0 rounded-s-xl">
                            <img
                              className="w-6 mt-0.5 h-6"
                              src="https://cdn-icons-png.flaticon.com/128/10880/10880433.png"
                            />
                          </div>

                          <div className="p-2 ">
                            <div className="flex justify-between items-center">
                              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                Org
                              </h3>
                              <label
                                htmlFor="tdls_dot_org"
                                className="relative inline-flex cursor-pointer items-center"
                              >
                                <input
                                  type="checkbox"
                                  value=""
                                  checked={inputs?.tdls_dot_org}
                                  onChange={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      tdls_dot_org: e.target.checked,
                                    }))
                                  }
                                  id="tdls_dot_org"
                                  className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                              </label>
                            </div>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">
                              Popular choice for non-governmental organizations
                              or informational websites, but not suggested for
                              commercial use
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className="flex    ">
                          <div className="mt-1.5 flex justify-center flex-shrink-0 rounded-s-xl">
                            <img
                              className="w-6 mt-0.5 h-6"
                              src="https://cdn-icons-png.flaticon.com/128/7468/7468164.png"
                            />
                          </div>

                          <div className="p-2 ">
                            <div className="flex justify-between items-center">
                              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                Co
                              </h3>
                              <label
                                htmlFor="tdls_dot_co"
                                className="relative inline-flex cursor-pointer items-center"
                              >
                                <input
                                  type="checkbox"
                                  value=""
                                  checked={inputs?.tdls_dot_co}
                                  onChange={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      tdls_dot_co: e.target.checked,
                                    }))
                                  }
                                  id="tdls_dot_co"
                                  className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                              </label>
                            </div>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">
                              Newer and shorter alternative to .com and more in
                              line with younger generations
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className="flex    ">
                          <div className="mt-1.5 flex justify-center flex-shrink-0 rounded-s-xl">
                            <img
                              className="w-6 mt-0.5 h-6"
                              src="https://cdn-icons-png.flaticon.com/128/2150/2150168.png"
                            />
                          </div>

                          <div className="p-2 ">
                            <div className="flex justify-between items-center">
                              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                Us
                              </h3>
                              <label
                                htmlFor="tdls_dot_us"
                                className="relative inline-flex cursor-pointer items-center"
                              >
                                <input
                                  type="checkbox"
                                  value=""
                                  checked={inputs?.tdls_dot_us}
                                  onChange={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      tdls_dot_us: e.target.checked,
                                    }))
                                  }
                                  id="tdls_dot_us"
                                  className="peer sr-only"
                                />
                                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                              </label>
                            </div>

                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">
                              Reserved for citizens and entities in the United
                              States
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- End Card --> */}
                    </div>
                    {/* <!-- End Grid --> */}
                  </div>
                  <div className="py-3 sm:py-6">
                    <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                      Advertisers
                    </h4>

                    {/* <!-- Grid --> */}
                    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                      {/* <!-- Card --> */}
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className="flex   items-start">
                          <Checkbox
                            color="blue"
                            ripple={false}
                            checked={inputs?.advertisers_internal}
                            onClick={(e) =>
                              setInputs((prevState) => ({
                                ...prevState,
                                advertisers_internal: e.target.checked,
                              }))
                            }
                            className="  transition-all hover:scale-105 hover:before:opacity-0"
                          />

                          <div className="grow  pt-3">
                            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                              Internal
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">
                              These advertisers primarily opearte in the
                              useraccountdashboard ecosystem
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- End Card --> */}

                      {/* <!-- Card --> */}
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className="flex   items-start">
                          <Checkbox
                            color="blue"
                            ripple={false}
                            checked={inputs?.advertisers_external}
                            onClick={(e) =>
                              setInputs((prevState) => ({
                                ...prevState,
                                advertisers_external: e.target.checked,
                              }))
                            }
                            className="  transition-all hover:scale-105 hover:before:opacity-0"
                          />

                          <div className="grow  pt-3">
                            <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                              External
                            </h3>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">
                              These advertisers are not heavily involved with
                              useraccountdashboard and or its affiliates
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* <!-- End Card --> */}
                    </div>
                    {/* <!-- End Grid --> */}
                  </div>
                  <div className="py-3 sm:py-6">
                    <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                      Locations
                    </h4>

                    {/* <!-- Grid --> */}
                    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                      {/* <!-- Card --> */}
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className=" ">
                          <div className="flex items-center justify-between ">
                            <h3 className="text-sm uppercase font-semibold text-blue-600 dark:text-blue-500">
                              Safe Areas
                            </h3>
                            <Chip
                              value={
                                inputs?.locations_safe_and_peaceful === true
                                  ? "Allowed"
                                  : "Disallowed"
                              }
                              variant="ghost"
                              color={
                                inputs?.locations_safe_and_peaceful === true
                                  ? "green"
                                  : "red"
                              }
                              icon={
                                <Checkbox
                                  color={
                                    inputs?.locations_safe_and_peaceful === true
                                      ? "green"
                                      : "red"
                                  }
                                  ripple={false}
                                  checked={inputs?.locations_safe_and_peaceful}
                                  onClick={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      locations_safe_and_peaceful:
                                        e.target.checked,
                                    }))
                                  }
                                  containerProps={{ className: "p-0" }}
                                  className={`-ml-px border-2 ${
                                    inputs?.locations_safe_and_peaceful === true
                                      ? "border-green-900 checked:border-green-900 checked:bg-green-900"
                                      : "border-red-900 checked:border-red-900 checked:bg-red-900"
                                  } before:hidden `}
                                />
                              }
                            />
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">
                          These includes all areas considered safe in the world
                          ranking
                        </p>
                      </div>
                      {/* <!-- End Card --> */}

                      {/* <!-- Card --> */}
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className=" ">
                          <div className="flex items-center justify-between ">
                            <h3 className="text-sm uppercase font-semibold text-blue-600 dark:text-blue-500">
                              Risky Areas
                            </h3>
                            <Chip
                              value={
                                inputs?.locations_unsafe_and_risky === true
                                  ? "Allowed"
                                  : "Disallowed"
                              }
                              variant="ghost"
                              color={
                                inputs?.locations_unsafe_and_risky === true
                                  ? "green"
                                  : "red"
                              }
                              icon={
                                <Checkbox
                                  color={
                                    inputs?.locations_unsafe_and_risky === true
                                      ? "green"
                                      : "red"
                                  }
                                  ripple={false}
                                  checked={inputs?.locations_unsafe_and_risky}
                                  onClick={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      locations_unsafe_and_risky:
                                        e.target.checked,
                                    }))
                                  }
                                  containerProps={{ className: "p-0" }}
                                  className={`-ml-px border-2 ${
                                    inputs?.locations_unsafe_and_risky === true
                                      ? "border-green-900 checked:border-green-900 checked:bg-green-900"
                                      : "border-red-900 checked:border-red-900 checked:bg-red-900"
                                  } before:hidden `}
                                />
                              }
                            />
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">
                          These includes all areas considered unsafe in the
                          world ranking
                        </p>
                      </div>
                      {/* <!-- End Card --> */}

                      {/* <!-- Card --> */}
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className=" ">
                          <div className="flex items-center justify-between ">
                            <h3 className="text-sm uppercase font-semibold text-blue-600 dark:text-blue-500">
                              FWC Registered
                            </h3>
                            <Chip
                              value={
                                inputs?.locations_fwc_registered === true
                                  ? "Allowed"
                                  : "Disallowed"
                              }
                              variant="ghost"
                              color={
                                inputs?.locations_fwc_registered === true
                                  ? "green"
                                  : "red"
                              }
                              icon={
                                <Checkbox
                                  color={
                                    inputs?.locations_fwc_registered === true
                                      ? "green"
                                      : "red"
                                  }
                                  ripple={false}
                                  checked={inputs?.locations_fwc_registered}
                                  onClick={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      locations_fwc_registered:
                                        e.target.checked,
                                    }))
                                  }
                                  containerProps={{ className: "p-0" }}
                                  className={`-ml-px border-2 ${
                                    inputs?.locations_fwc_registered === true
                                      ? "border-green-900 checked:border-green-900 checked:bg-green-900"
                                      : "border-red-900 checked:border-red-900 checked:bg-red-900"
                                  } before:hidden `}
                                />
                              }
                            />
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">
                          These includes all areas who have been registered by
                          RODLIP
                        </p>
                      </div>
                      {/* <!-- End Card --> */}

                      {/* <!-- Card --> */}
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className=" ">
                          <div className="flex items-center justify-between ">
                            <h3 className="text-sm uppercase font-semibold text-blue-600 dark:text-blue-500">
                              Other
                            </h3>
                            <Chip
                              value={
                                inputs?.locations_other === true
                                  ? "Allowed"
                                  : "Disallowed"
                              }
                              variant="ghost"
                              color={
                                inputs?.locations_other === true
                                  ? "green"
                                  : "red"
                              }
                              icon={
                                <Checkbox
                                  color={
                                    inputs?.locations_other === true
                                      ? "green"
                                      : "red"
                                  }
                                  ripple={false}
                                  checked={inputs?.locations_other}
                                  onClick={(e) =>
                                    setInputs((prevState) => ({
                                      ...prevState,
                                      locations_other: e.target.checked,
                                    }))
                                  }
                                  containerProps={{ className: "p-0" }}
                                  className={`-ml-px border-2 ${
                                    inputs?.locations_other === true
                                      ? "border-green-900 checked:border-green-900 checked:bg-green-900"
                                      : "border-red-900 checked:border-red-900 checked:bg-red-900"
                                  } before:hidden `}
                                />
                              }
                            />
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-500">
                          These includes all the other areas not exclusively
                          included
                        </p>
                      </div>
                      {/* <!-- End Card --> */}
                    </div>
                    {/* <!-- End Grid --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
