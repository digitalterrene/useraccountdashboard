"use client";
import { useAuthContext } from "@/context/AuthContext";
import { Checkbox, Chip, Slider } from "@material-tailwind/react";
import React, { useState } from "react";
import { account_server } from "../../../../utils/urls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdRevenue({ ad_revenue }) {
  const { user } = useAuthContext();
  const [inputs, setInputs] = useState({ ...ad_revenue });

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
          key_to_update: "ad_revenue",
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
    <div className="px-4">
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
      <div className="grid gap-4 grid-cols-3">
        {" "}
        <div className="border rounded-2xl">
          {" "}
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-200">
              General
            </h3>
          </div>
          <div className=" overflow-hidden  p-5  ">
            <div className="grid border-b  pb-3 ">
              <div className="space-y-2">
                <h2 className="  font-semibold leading-4 text-slate-700">
                  Affiliation
                </h2>
                <p className=" text-sm text-slate-600">
                  Allowing this feature ensures that your affiliation activity
                  is conducted as intended
                </p>
              </div>
              <div className="mt-4 flex items-center  ">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="auto_affiliation"
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      type="checkbox"
                      value=""
                      checked={inputs?.auto_affiliation}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          auto_affiliation: e.target.checked,
                        }))
                      }
                      id="auto_affiliation"
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Auto Affiliation
                    </span>
                  </label>
                  <label
                    htmlFor="dynamic_links"
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      type="checkbox"
                      checked={inputs?.dynamic_links}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          dynamic_links: e.target.checked,
                        }))
                      }
                      id="dynamic_links"
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Dynamic links
                    </span>
                  </label>
                  <label
                    htmlFor="external_links"
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      type="checkbox"
                      checked={inputs?.external_links}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          external_links: e.target.checked,
                        }))
                      }
                      id="external_links"
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      External links
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid border-b  py-3 mt-3 ">
              <div className="space-y-2">
                <h2 className="  font-semibold leading-4 text-slate-700">
                  Remuneration
                </h2>
                <p className=" text-sm text-slate-600">
                  Configure your remuneration status and other configurations
                </p>
              </div>
              <div className="mt-4 flex items-center  ">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="enable_remuneration"
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      type="checkbox"
                      value=""
                      checked={inputs?.enable_remuneration}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          enable_remuneration: e.target.checked,
                        }))
                      }
                      id="enable_remuneration"
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Enable to get started
                    </span>
                  </label>
                  <label
                    htmlFor="remuneration_paid_in_credits"
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      type="checkbox"
                      value=""
                      checked={inputs?.remuneration_paid_in_credits}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          remuneration_paid_in_credits: e.target.checked,
                        }))
                      }
                      id="remuneration_paid_in_credits"
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Get paid in credits
                    </span>
                  </label>
                  <label
                    htmlFor="remuneration_paid_in_cash"
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      type="checkbox"
                      value=""
                      checked={inputs?.remuneration_paid_in_cash}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          remuneration_paid_in_cash: e.target.checked,
                        }))
                      }
                      id="remuneration_paid_in_cash"
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Get paid in cash
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="grid border-b  py-3 mt-3 ">
              <div className="space-y-2">
                <h2 className="  font-semibold leading-4 text-slate-700">
                  Payout Currencies
                </h2>
                <p className=" text-sm text-slate-600">
                  When you affiliate for companies specific to an economic
                  league, you can only get paid in their currency
                </p>
              </div>
              <div className="mt-4 flex items-center  ">
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="vibrens_payout_currency"
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      type="checkbox"
                      value=""
                      checked={inputs?.vibrens_payout_currency}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          vibrens_payout_currency: e.target.checked,
                        }))
                      }
                      id="vibrens_payout_currency"
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Vibrens
                    </span>
                  </label>
                  <label
                    htmlFor="kerons_payout_currency"
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      type="checkbox"
                      value=""
                      checked={inputs?.kerons_payout_currency}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          kerons_payout_currency: e.target.checked,
                        }))
                      }
                      id="kerons_payout_currency"
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Kerons
                    </span>
                  </label>
                  <label
                    htmlFor="dollars_payout_currency"
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      type="checkbox"
                      value=""
                      checked={inputs?.dollars_payout_currency}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          dollars_payout_currency: e.target.checked,
                        }))
                      }
                      id="dollars_payout_currency"
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Dollars
                    </span>
                  </label>
                  <label
                    htmlFor="euros_payout_currency"
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      type="checkbox"
                      value=""
                      checked={inputs?.euros_payout_currency}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          euros_payout_currency: e.target.checked,
                        }))
                      }
                      id="euros_payout_currency"
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Euros
                    </span>
                  </label>
                  <label
                    htmlFor="pounds_payout_currency"
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      type="checkbox"
                      value=""
                      checked={inputs?.pounds_payout_currency}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          pounds_payout_currency: e.target.checked,
                        }))
                      }
                      id="pounds_payout_currency"
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Pounds
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2  w-full      ">
          <div className="     transition-all sm:max-w-4xl sm:w-full   sm:mx-auto  ">
            <div className="max-h-full overflow-hidden flex flex-col bg-white  pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className="flex justify-between items-center py-3 px-4  dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-gray-200">
                  Other
                </h3>
              </div>

              <div className="p-4 overflow-y-auto">
                <div className="sm:divide-y divide-gray-200 dark:divide-gray-700">
                  <div className="py-3 sm:py-6">
                    <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                      Affiliate only these content types
                    </h4>

                    {/* <!-- Grid --> */}
                    <ul className="grid grid-cols-3">
                      {/* <!-- Card --> */}
                      <li class="flex rounded-lg hover:bg-gray-100 items-center ">
                        <Checkbox
                          color="blue"
                          checked={inputs?.affiliate_content_type_blogs}
                          onClick={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              affiliate_content_type_blogs: e.target.checked,
                            }))
                          }
                          ripple={false}
                          className="       transition-all hover:scale-105 hover:before:opacity-0"
                        />
                        <span class="text-gray-800 dark:text-gray-400">
                          Blogs
                        </span>
                      </li>
                      <li class="flex rounded-lg hover:bg-gray-100 items-center ">
                        <Checkbox
                          color="blue"
                          ripple={false}
                          checked={inputs?.affiliate_content_type_articles}
                          onClick={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              affiliate_content_type_articles: e.target.checked,
                            }))
                          }
                          className="       transition-all hover:scale-105 hover:before:opacity-0"
                        />
                        <span class="text-gray-800 dark:text-gray-400">
                          Articles
                        </span>
                      </li>
                      <li class="flex rounded-lg hover:bg-gray-100 items-center ">
                        <Checkbox
                          color="blue"
                          ripple={false}
                          checked={inputs?.affiliate_content_type_videos}
                          onClick={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              affiliate_content_type_videos: e.target.checked,
                            }))
                          }
                          className="       transition-all hover:scale-105 hover:before:opacity-0"
                        />
                        <span class="text-gray-800 dark:text-gray-400">
                          Videos
                        </span>
                      </li>
                      <li class="flex rounded-lg hover:bg-gray-100 items-center ">
                        <Checkbox
                          color="blue"
                          ripple={false}
                          checked={inputs?.affiliate_content_type_inforgraphics}
                          onClick={(e) =>
                            setInputs((prevState) => ({
                              ...prevState,
                              affiliate_content_type_inforgraphics:
                                e.target.checked,
                            }))
                          }
                          className="       transition-all hover:scale-105 hover:before:opacity-0"
                        />
                        <span class="text-gray-800 dark:text-gray-400">
                          Infographics
                        </span>
                      </li>

                      {/* <!-- End Card --> */}
                    </ul>
                    {/* <!-- End Grid --> */}
                  </div>
                  <div className="py-3 sm:py-6">
                    <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
                      Affiliation Configuration
                    </h4>

                    {/* <!-- Grid --> */}
                    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                      {/* <!-- Card --> */}
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className="flex    ">
                          <div className="mt-1.5 flex justify-center flex-shrink-0 rounded-s-xl">
                            <img
                              className="w-6 mt-0.5 h-6"
                              src="https://cdn-icons-png.flaticon.com/128/6538/6538460.png"
                            />
                          </div>

                          <div className="p-2 ">
                            <div className="flex justify-between items-center">
                              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                Frequency
                              </h3>
                            </div>

                            <p className="mt-1 mb-6 text-xs line-clamp-2 text-gray-600 dark:text-gray-500">
                              How frequent should your affiliation links be send
                              to your audience
                            </p>
                            <Slider
                              value={inputs?.affiliation_frequency}
                              onChange={(e) =>
                                setInputs((prevState) => ({
                                  ...prevState,
                                  affiliation_frequency: e.target.value,
                                }))
                              }
                              color="blue"
                              defaultValue={50}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        <div className="flex    ">
                          <div className="mt-1.5 flex justify-center flex-shrink-0 rounded-s-xl">
                            <img
                              className="w-6 mt-0.5 h-6"
                              src="https://cdn-icons-png.flaticon.com/128/10036/10036113.png"
                            />
                          </div>

                          <div className="p-2 ">
                            <div className="flex justify-between items-center">
                              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-500">
                                Link Lifespan
                              </h3>
                            </div>

                            <p className="mt-1 line-clamp-2 mb-6 text-xs text-gray-600 dark:text-gray-500">
                              Affiliation links expire eventually. How long
                              should they be valid
                            </p>
                            <Slider
                              value={inputs?.affiliation_link_lifespan}
                              onChange={(e) =>
                                setInputs((prevState) => ({
                                  ...prevState,
                                  affiliation_link_lifespan: e.target.value,
                                }))
                              }
                              color="blue"
                              defaultValue={50}
                            />
                          </div>
                        </div>
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
