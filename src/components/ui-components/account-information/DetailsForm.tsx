import React from "react";

export default function DetailsForm({ activeTab }: any) {
  return (
    <div>
      {" "}
      <div className="max-w-[85rem]   mx-auto">
        <div className="max-w-xl mx-auto">
          <div className=" ">
            {/* <!-- Form --> */}
            <form>
              <h1 className="text-xl capitalize font-bold mb-6 text-gray-800  dark:text-white">
                {activeTab} Information
              </h1>
              <div className="grid gap-4 lg:gap-6">
                {/* <!-- Grid --> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label
                      htmlFor="hs-firstname-hire-us-2"
                      className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="hs-firstname-hire-us-2"
                      id="hs-firstname-hire-us-2"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hs-lastname-hire-us-2"
                      className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                    >
                      Extension
                    </label>
                    <input
                      type="text"
                      name="hs-lastname-hire-us-2"
                      id="hs-lastname-hire-us-2"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    />
                  </div>
                </div>
                {/* <!-- End Grid --> */}

                <div>
                  <label
                    htmlFor="hs-work-email-hire-us-2"
                    className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                  >
                    Tagline
                  </label>
                  <input
                    type="email"
                    name="hs-work-email-hire-us-2"
                    id="hs-work-email-hire-us-2"
                    autoComplete="email"
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  />
                </div>

                {/* <!-- Grid --> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label
                      htmlFor="hs-company-hire-us-2"
                      className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                    >
                      Identification Number
                    </label>
                    <input
                      type="text"
                      name="hs-company-hire-us-2"
                      id="hs-company-hire-us-2"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hs-company-website-hire-us-2"
                      className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                    >
                      Industry
                    </label>
                    <input
                      type="text"
                      name="hs-company-website-hire-us-2"
                      id="hs-company-website-hire-us-2"
                      className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                    />
                  </div>
                </div>
                {/* <!-- End Grid --> */}

                <div>
                  <label
                    htmlFor="hs-about-hire-us-2"
                    className="block mb-2 text-sm text-gray-700 font-medium dark:text-white"
                  >
                    Decription
                  </label>
                  <textarea
                    id="hs-about-hire-us-2"
                    name="hs-about-hire-us-2"
                    rows={4}
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  ></textarea>
                </div>
              </div>
              {/* <!-- End Grid --> */}

              <div className="mt-6 grid">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Update
                </button>
              </div>
            </form>
            {/* <!-- End Form --> */}
          </div>
        </div>
      </div>
    </div>
  );
}
