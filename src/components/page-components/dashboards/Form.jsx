import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdLockOpen, MdLockOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { account_server } from "../../../../utils/urls";
import { useAuthContext } from "@/context/AuthContext";

const FormComponent = ({
  name,
  icon,
  keys,
  editThisData,
  _id,
  whatToEdit,
  inputs,
  setInputs,
}) => {
  const { user: local_user } = useAuthContext();
  const [localInputs, setLocalInputs] = useState({});
  const handleInputChange = (e, key) => {
    setLocalInputs((prevState) => ({
      ...prevState,
      [key]: e.target.value,
    }));
  };
  const handleSave = async (e) => {
    e.preventDefault();
    let level_extention = "update-set-single-data-strings";
    const id = toast.loading(`Updating ${name} information...`);
    // console.log({ key_to_update: `${dashboard}`, value_to_update: inputs });
    const res = await fetch(`${account_server}/${level_extention}/_id/${_id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${local_user?.token}`,
        useraccountdashboard_account_user_id: `${local_user?._id}`,
        super_user: `${local_user?._id}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify({
        key_to_update: name,
        value_to_update: localInputs,
      }),
    });
    const json = await res.json();
    if (res.ok) {
      toast.update(id, {
        render: `Successfully updated ${name} information`,
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
  //inputs[`${key}`]
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    if (inputs) {
      Object.entries(inputs[name]).map(([key, value]) => {
        setLocalInputs((prevState) => ({ ...prevState, [key]: value }));
      });
    }
  }, [inputs]);
  return (
    <>
      {" "}
      {/* <div>
        {Object.entries(inputs[name]).map(([key, value]) => (
          <p key={key}>{`${key}: ${value}`}</p>
        ))}
      </div> */}
      <form
        onSubmit={handleSave}
        className="w-auto lg:max-w-[370px] flex flex-col  gap-10 h-[420px]"
      >
        <ToastContainer />
        <div className=" ">
          <div className="flex justify-end text-lg mb-4 gap-2 items-center">
            {!isEditing ? (
              <MdLockOutline className="text-green-600" />
            ) : (
              <MdLockOpen className="text-blue-600" />
            )}
            <p
              className={`text-xs px-3 w-fit h-fit ${
                !isEditing
                  ? "text-green-600 bg-green-50"
                  : "text-blue-600 bg-blue-50"
              } py-1 flex items-center border rounded-full`}
            >
              {!isEditing ? "Read Only" : "Edit"}
            </p>
            {isEditing && (
              <button
                type="submit"
                className={`text-xs px-3 w-fit h-fit hover:text-white hover:bg-blue-600 border-blue-600 text-blue-600 py-1 flex items-center border rounded-full`}
              >
                Save
              </button>
            )}
          </div>

          <div className="flex justify-between w-full">
            <div className="text-sm flex items-center gap-2 capitalize font-semibold text-gray-800 dark:text-gray-200">
              <div className="p-2 border rounded-lg">{icon}</div>
              <p>{name.replaceAll("_", " ")}</p>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`bg-${isEditing ? "blue-500" : "gray-200"} text-${
                isEditing ? "white" : "blue-500"
              } inline-flex justify-center p-1 items-center gap-2 rounded-md border border-transparent font-semibold  hover:bg-blue-100 focus:outline-none focus:ring-2 focus:outline-blue-500 border focus:ring-offset-2 transition-all text-sm`}
            >
              <BiEditAlt className="text-xl" />
            </button>
          </div>
        </div>

        <div className="   h-full">
          <div className="  grid gap-4 lg:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {keys.map((key, j) => (
                <div
                  key={j}
                  className={`${j < 4 ? "col-span-1" : "col-span-2"}`}
                >
                  <label
                    htmlFor={`hs-${name}-${key}`}
                    className="block text-sm capitalize text-gray-700 font-medium dark:text-white"
                  >
                    {key.replaceAll("_", " ")}
                  </label>
                  {key === "biography" || key === "description" ? (
                    <textarea
                      disabled={!isEditing}
                      value={localInputs[key]}
                      onChange={(e) => handleInputChange(e, key)}
                      style={{ border: "1px solid #e5e7eb" }}
                      id={`hs-${name}-${key}`}
                      name={`hs-${name}-${key}`}
                      rows={4}
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:outline-blue-500 border dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    ></textarea>
                  ) : (
                    <input
                      disabled={!isEditing}
                      value={localInputs[key]}
                      onChange={(e) => handleInputChange(e, key)}
                      style={{ border: "1px solid #e5e7eb" }}
                      type="text"
                      id={`hs-${name}-${key}`}
                      name={`hs-${name}-${key}`}
                      className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:outline-blue-500 border dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormComponent;
