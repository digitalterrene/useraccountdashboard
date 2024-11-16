"use client";
import { useAuthContext } from "@/context/AuthContext";
import React from "react";
import useNavigation from "../../../../utils/handleNavigate";

const dashboards = [
  {
    name: "entities",
    image:
      "https://img.freepik.com/free-vector/biometric-security-concept_53876-90465.jpg?size=626&ext=jpg&ga=GA1.1.333512076.1694862058&semt=sph",
    icon: "https://cdn-icons-png.flaticon.com/128/8293/8293562.png",
  },
  {
    name: "office",
    image:
      "https://img.freepik.com/free-photo/top-view-business-arrangement-white-background-with-copy-space_23-2148488650.jpg?size=626&ext=jpg&ga=GA1.2.333512076.1694862058&semt=sph",
    icon: "https://cdn-icons-png.flaticon.com/128/9777/9777598.png",
  },
  {
    name: "sites",
    image:
      "https://img.freepik.com/free-photo/3d-rendering-website-hosting-concept_23-2149484780.jpg?size=626&ext=jpg&ga=GA1.1.333512076.1694862058&semt=sph",
    icon: "https://cdn-icons-png.flaticon.com/128/4302/4302080.png",
  },
  {
    name: "blogs",
    image:
      "https://img.freepik.com/free-photo/aerial-view-businessman-using-computer-laptop_53876-24739.jpg?size=626&ext=jpg&ga=GA1.1.333512076.1694862058&semt=sph",
    icon: "https://cdn-icons-png.flaticon.com/128/1717/1717741.png",
  },
  {
    name: "stores",
    image:
      "https://img.freepik.com/free-photo/full-shot-woman-online-fashion-shopping_23-2150460083.jpg?size=626&ext=jpg&ga=GA1.1.333512076.1694862058&semt=sph",
    icon: "https://cdn-icons-png.flaticon.com/128/5113/5113200.png",
  },
  {
    name: "home",
    image:
      "https://img.freepik.com/free-photo/living-room-with-blue-couch-white-wall-with-painting-it_1340-23237.jpg?size=626&ext=jpg&ga=GA1.1.333512076.1694862058&semt=sph",
    icon: "https://cdn-icons-png.flaticon.com/128/9073/9073243.png",
  },
];
export default function Dashboards() {
  const { user } = useAuthContext();
  const { handleQuickNavigate } = useNavigation();
  return (
    <div className="lg:p-6">
      {/* <!-- Card Section --> */}
      <div className="max-w-5xl  py-10   lg:py-14  ">
        {/* <!-- Grid --> */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {dashboards &&
            dashboards.map(({ name, icon, image }, i) => (
              <a
                key={i}
                onClick={() =>
                  user?._id &&
                  handleQuickNavigate(`dashboards/${name}`, {
                    _id: user?._id,
                    token: user?.token,
                  })
                }
                className="group cursor-pointer flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800"
              >
                <div className="">
                  <div className="flex p-4 md:p-5">
                    <div className="w-8">
                      <img src={icon} />
                    </div>

                    <div className="grow ml-5">
                      <h3 className="group-hover:text-blue-600 capitalize font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                        {name}
                      </h3>
                      <p className="text-sm text-gray-500">Click to update</p>
                    </div>
                  </div>
                  <img
                    class="group-hover:scale-90 rounded-t-0 h-60 transition-transform duration-500 ease-in-out rounded-b-xl hover:rounded-xl w-full object-cover"
                    src={image}
                    alt="useraccountdashboard Office"
                  ></img>
                </div>
              </a>
            ))}
          {/* <!-- End Card --> */}
        </div>
        {/* <!-- End Grid --> */}
      </div>
      {/* <!-- End Card Section --> */}
    </div>
  );
}
