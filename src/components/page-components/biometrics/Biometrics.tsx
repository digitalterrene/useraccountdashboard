"use client";
import React from "react";

export default function Biomentrics() {
  return (
    <div className="pb-10">
      {" "}
      <div className="lg:col-span-1 p-8">
        <h2 className="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-200">
          Coming Soon
        </h2>
        <p className="mt-2 md:mt-4 text-gray-500">
          Biometrics poses a more securing account management than emails and
          passkeys
        </p>
      </div>
      {/* // <!-- Features --> */}
      <div className="max-w-[85rem] px-4  sm:px-6 lg:px-8   mx-auto">
        <div className="aspect-w-16 aspect-h-7">
          <img
            className="w-full object-cover rounded-xl h-[500px] "
            src="https://img.freepik.com/free-photo/woman-scanning-fingerprint-with-futuristic-interface-smart-technology_53876-102333.jpg?size=626&ext=jpg&ga=GA1.1.333512076.1694862058&semt=sph"
            alt="Image Description"
          />
        </div>

        {/* <!-- Grid --> */}
        <div className="mt-5 lg:mt-16 grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* <!-- End Col --> */}

          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
              {/* <!-- Icon Block --> */}
              <div className="flex gap-x-5">
                <div>
                  <img
                    className="w-16 mt-2"
                    src="https://cdn-icons-png.flaticon.com/128/9915/9915481.png"
                  />
                </div>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Enhanced Security
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    We're excited to announce that we'll soon be introducing
                    Biometrics to our platform. This cutting-edge technology
                    will provide an extra layer of security, ensuring that your
                    data remains safe and protected.
                  </p>
                </div>
              </div>
              {/* <!-- End Icon Block --> */}

              {/* <!-- Icon Block --> */}
              <div className="flex gap-x-5">
                <div>
                  <img
                    className="w-16 mt-2"
                    src="https://cdn-icons-png.flaticon.com/128/1000/1000966.png"
                  />
                </div>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Effortless Access:
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    With Biometrics, accessing your account will be more
                    convenient than ever. Say goodbye to passwords and PINs –
                    you'll be able to log in with just a touch or a glance,
                    making your experience seamless and hassle-free.
                  </p>
                </div>
              </div>
              {/* <!-- End Icon Block --> */}

              {/* <!-- Icon Block --> */}
              <div className="flex gap-x-5">
                <div>
                  <img
                    className="w-16 mt-2"
                    src="https://cdn-icons-png.flaticon.com/128/3712/3712234.png"
                  />
                </div>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Stay In Control
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    We understand the importance of control over your personal
                    information. Biometrics will give you the power to manage
                    your security settings, allowing you to enable or disable
                    this feature at any time.
                  </p>
                </div>
              </div>
              {/* <!-- End Icon Block --> */}

              {/* <!-- Icon Block --> */}
              <div className="flex gap-x-5">
                <div>
                  <img
                    className="w-16 mt-2"
                    src="https://cdn-icons-png.flaticon.com/128/3166/3166234.png"
                  />
                </div>
                <div className="grow">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Privacy First
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Rest assured, your privacy is our priority. We're committed
                    to implementing Biometrics in a way that respects your data
                    and adheres to the highest privacy standards. Your
                    information will always be handled with care and
                    transparency.
                  </p>
                </div>
              </div>
              {/* <!-- End Icon Block --> */}
            </div>
          </div>
          {/* <!-- End Col --> */}
        </div>
        {/* <!-- End Grid --> */}
      </div>
      {/* <!-- End Features --> */}
    </div>
  );
}
