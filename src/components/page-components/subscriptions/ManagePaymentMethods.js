"use client";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { account_server } from "../../../../utils/urls";
import "react-toastify/dist/ReactToastify.css";

export default function ManagePaymentMethods({ payment_details }) {
  const { user } = useAuthContext();

  const [inputs, setInputs] = useState({ ...payment_details });
  useEffect(() => {
    import("preline");
  }, []);
  const [nextRenewalDate, setNextRenewalDate] = useState(null);

  // Function to calculate the next renewal date
  const calculateNextRenewalDate = (billingPeriod) => {
    const currentDate = new Date();
    let nextRenewalDate = new Date();

    switch (billingPeriod) {
      case "weekly":
        nextRenewalDate.setDate(currentDate.getDate() + 7);
        break;
      case "monthly":
        nextRenewalDate.setMonth(currentDate.getMonth() + 1);
        break;
      case "quarterly":
        nextRenewalDate.setMonth(currentDate.getMonth() + 3);
        break;
      case "annually":
        nextRenewalDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        // Handle other cases or set a default behavior
        break;
    }

    return nextRenewalDate.toDateString();
  };

  const handleBillingPeriodChange = (billingPeriod) => {
    setInputs((prevState) => ({
      ...prevState,
      billing_period: billingPeriod,
    }));

    // Calculate and set the next renewal date
    const nextDate = calculateNextRenewalDate(billingPeriod);
    setNextRenewalDate(nextDate);
  };
  const handlePaymentMethodChange = (method) => {
    setInputs((prevState) => ({
      ...prevState,
      payment_method: method,
    }));
  };
  const updateSettings = async () => {
    const id = toast.loading("Updating information...");

    const res = await fetch(
      `${account_server}/update-set-single-data-objects/subscriptions/_id/${user?._id}/`,
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
          key_to_update: "payment_details",
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
    <div className="p-3 w-full">
      <ToastContainer />
      <div className="w-full flex justify-end">
        <button
          onClick={() => updateSettings()}
          className="bg-white px-4 py-1.5   border hover:border-transparent  transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          data-hs-overlay="#hs-modal-manage-password"
        >
          <h3 className="text-xs   font-semibold text-blue-600 dark:text-blue-500">
            Update
          </h3>
        </button>
      </div>
      <div className="lg:flex w-full space-y-10  lg:gap-4  justify-between">
        <div className="  ">
          <div className="  lg:px-4    lg:mx-auto">
            <div className="  bg-white    p-4 sm:p-7 dark:bg-slate-900">
              <div className="  mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
                  Payment
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manage your payment methods.
                </p>
              </div>

              <form>
                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
                  <label
                    for="af-payment-billing-contact"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Billing contact
                  </label>

                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <input
                      id="af-payment-billing-contact"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:outline-blue-500 border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="First Name"
                      value={inputs?.first_name}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          first_name: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:outline-blue-500 border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Last Name"
                      value={inputs?.last_name}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          last_name: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:outline-blue-500 border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Phone Number"
                      value={inputs?.phone_number}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          phone_number: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
                  <label
                    for="af-payment-billing-address"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Billing address
                  </label>

                  <div className="mt-2 space-y-3">
                    <input
                      id="af-payment-billing-address"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:outline-blue-500 border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Street Address"
                      value={inputs?.street_address}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          street_address: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:outline-blue-500 border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Apt, Suite, Building (Optional)"
                      value={inputs?.building_or_suite}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          building_or_suite: e.target.value,
                        }))
                      }
                    />
                    <div className="grid sm:flex gap-3">
                      <input
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:outline-blue-500 border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="Zip Code"
                        value={inputs?.zip_code}
                        onChange={(e) =>
                          setInputs((prevState) => ({
                            ...prevState,
                            zip_code: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:outline-blue-500 border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="City"
                        value={inputs?.city}
                        onChange={(e) =>
                          setInputs((prevState) => ({
                            ...prevState,
                            city: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="text"
                        value={inputs?.country}
                        onChange={(e) =>
                          setInputs((prevState) => ({
                            ...prevState,
                            country: e.target.value,
                          }))
                        }
                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:outline-blue-500 border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="Country"
                      />
                    </div>
                  </div>
                </div>

                <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
                  <label
                    for="af-payment-payment-method"
                    className="inline-block text-sm font-medium dark:text-white"
                  >
                    Card Details
                  </label>

                  <div className="mt-2 space-y-3">
                    <input
                      id="af-payment-payment-method"
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:outline-blue-500 border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Name on Card"
                      value={inputs?.name_on_card}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          name_on_card: e.target.value,
                        }))
                      }
                    />
                    <input
                      type="text"
                      className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:outline-blue-500 border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                      placeholder="Card Number"
                      value={inputs?.card_number}
                      onChange={(e) =>
                        setInputs((prevState) => ({
                          ...prevState,
                          card_number: e.target.value,
                        }))
                      }
                    />
                    <div className="grid sm:flex gap-3">
                      <input
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:outline-blue-500 border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="Expiration Date"
                        value={inputs?.expiration_date}
                        onChange={(e) =>
                          setInputs((prevState) => ({
                            ...prevState,
                            expiration_date: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:outline-blue-500 border disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder="CVV Code"
                        value={inputs?.cvv_code}
                        onChange={(e) =>
                          setInputs((prevState) => ({
                            ...prevState,
                            cvv_code: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
              {/* 
              <div className="mt-5 flex justify-end gap-x-2">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => updateSettings()}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Save changes
                </button>
              </div> */}
            </div>
          </div>
        </div>
        <div className=" w-8/12 ">
          <div className="    grid-cols-8   sm:grid-cols-10">
            <div className="col-span-8 rounded-xl  pb-10 sm:bg-gray-50 sm:px-8 sm:shadow">
              <div className="pt-4">
                <h1 className="py-2 text-2xl font-semibold">
                  Billing settings
                </h1>
                <p className="font- text-slate-600">
                  Always keep your information updated to avoid any service
                  jeorpodies
                </p>
              </div>
              <hr className="mt-4 mb-8" />
              <div className="mb-10 grid gap-y-8   lg:gap-y-0">
                <div className="space-y-8 ">
                  <div className="">
                    <div className="flex">
                      <p className="font-medium mb-1">Billing Period</p>
                      <div className="hs-dropdown mb-3 ml-auto relative inline-flex">
                        <button
                          id="hs-dropdown-slideup-animation"
                          type="button"
                          className="hs-dropdown-toggle capitalize py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          {inputs?.billing_period}
                          <svg
                            className="hs-dropdown-open:rotate-180 w-4 h-4"
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
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        <div
                          className="hs-dropdown-menu w-32 duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mt-2 bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
                          aria-labelledby="hs-dropdown-slideup-animation"
                        >
                          {["weekly", "monthly", "quarterly", "annually"].map(
                            (time, i) => (
                              <button
                                key={i}
                                onClick={() => handleBillingPeriodChange(time)}
                                className="flex capitalize items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                              >
                                {time}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                      <p className="ml-4 w-56">
                        <strong className="block uppercase text-lg font-medium">
                          {inputs?.billing_period}
                        </strong>
                        <span className="text-xs text-gray-400">
                          Next Renewal: {nextRenewalDate || "N/A"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex">
                      <p className="font-medium mb-1">Payment Method</p>
                      <div className="hs-dropdown mb-3 ml-auto relative inline-flex">
                        <button
                          id="hs-dropdown-payment-method"
                          type="button"
                          className="hs-dropdown-toggle capitalize py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          {inputs?.payment_method}
                          <svg
                            className="hs-dropdown-open:rotate-180 w-4 h-4"
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
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>

                        <div
                          className="hs-dropdown-menu w-32 duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mt-2 bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
                          aria-labelledby="hs-dropdown-payment-method"
                        >
                          {["card", "dollar link", "paypal"].map(
                            (method, i) => (
                              <button
                                key={i}
                                onClick={() =>
                                  handlePaymentMethodChange(method)
                                }
                                className="flex capitalize items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:bg-gray-700"
                              >
                                {method}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center rounded-md border border-gray-100 bg-white py-3 shadow">
                      <img
                        className="h-10 object-contain pl-4"
                        src="/images/kt10d0A1TgzZpAoNM_YPX.png"
                        alt=""
                      />
                      <p className="ml-4 w-56">
                        <strong className="block text-lg font-medium">
                          {inputs?.card_number}
                        </strong>
                        <strong className="block text-lg font-medium">
                          {inputs?.name_on_card}
                        </strong>
                        <span className="text-xs text-gray-400">
                          {" "}
                          Expires on: {inputs?.expiration_date}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white mt-4 shadow rounded-lg p-4">
                  {" "}
                  <img
                    className="h-80  "
                    src="https://img.freepik.com/free-vector/plain-credit-card-concept-illustration_114360-117.jpg?size=626&ext=jpg&ga=GA1.1.662713238.1698465588&semt=ais"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
