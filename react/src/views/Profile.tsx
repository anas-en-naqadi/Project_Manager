  import { useDispatch, useSelector } from "react-redux";
  import Avatar from "@mui/material/Avatar";
  import { Skeleton } from "@mui/material";
  import { AppDispatch, RootState } from "../store/store";
  import common from "../utils/common";
  import { ChangeEvent, FormEvent, useEffect, useState } from "react";
  import { CompanyType, Password, User } from "../types";
  import { updateCompanyInfo, updatePassword, updateUserInfo } from "../features/UserSlice";

import { resetStatus } from "../features/TaskSlice";
  const Profile = () => {
    const user = useSelector((state: RootState) => state.user.data); // Assuming user data is in redux state
    const status= useSelector((state: RootState) => state.taskHandler.statusMessage); // Assuming user data is in redux state

    const dispatch = useDispatch<AppDispatch>();
    const isLoading = !user || Object.keys(user).length === 0;
    const [password, setPassword] = useState({} as Password);
    const [newUser, setNewUser] = useState({} as User);
    const [company, setCompany] = useState({} as CompanyType);
    useEffect(() => {
      if (user) {
        setNewUser(user);
        setCompany(user.company);
      }
    }, [user]);
    useEffect(() => {
      if (status !== null) {
        common.showToast(status);
        dispatch(resetStatus());
      }
    }, [status]);
    const passwordSetter = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setPassword({ ...password, [name]: value });
    };
    const userSetter = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      console.log(value);
      setNewUser({ ...newUser, [name]: value });
    };
    const companySetter = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setCompany({ ...company, [name]: value });
    };
    const handlePasswordUpdate = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await dispatch(updatePassword(password));
      setPassword({} as Password);
    };
    const handleUserUpdate = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(updateUserInfo(newUser));
    };
    const handleCompanyUpdate = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(updateCompanyInfo(company));
    };
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCompany({ ...company, logo: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="w-full">
        <div className="flex flex-col items-center w-full px-5">
          <div className="flex flex-wrap justify-center items-center w-full mt-12">
            <div className="w-full xl:w-2/4 p-3">
              {isLoading ? (
                <div className="card bg-white border border-gray-300 rounded-xl">
                  <div className="bg-white border-t-4 border-green-400">
                    <div className="flex items-center justify-center -mb-2 mt-2 overflow-hidden text-center">
                      <Skeleton variant="rounded" width="5rem" height="5rem" />
                    </div>
                    <div className="px-2">
                      <h1 className="text-gray-900 font-bold text-xl leading-8">
                        <Skeleton width="12rem" />
                      </h1>
                      <h3 className="text-gray-600 my-2 flex gap-4 items-center font-lg text-semibold leading-6">
                        <span>Role:</span>
                        <Skeleton width="9rem" />
                      </h3>
                      <h3 className="text-gray-600 my-2 flex gap-4 items-center font-lg text-semibold leading-6">
                        <span>Email:</span>
                        <Skeleton width="14rem" />
                      </h3>
                      <h3 className="text-gray-600 my-2 flex gap-4 items-center font-lg text-semibold leading-6">
                        <span>Phone:</span>
                        <Skeleton width="14rem" />
                      </h3>
                    </div>
                    <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                      <li className="flex justify-between items-center py-3">
                        <span>Status</span>
                        <Skeleton width="7rem" />
                      </li>
                      <li className="flex justify-between items-center py-3">
                        <span>Member Since</span>
                        <Skeleton width="7rem" />
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (

                  <div className="card bg-white border border-gray-300 rounded-xl">
                    <div className="bg-white border-t-4 border-green-400">
                      <div className="pt-1.5 -mb-2 mt-2 overflow-hidden flex justify-center flex-col items-center">
                        <Avatar
                          alt="logo"
                          src={
                            user?.company?.logo
                          }
                          sx={{ width: 70, height: 65 }}
                        />
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                          {user.company ? user?.company?.name : user.name}
                        </h1>
                      </div>
                      <div className="px-2">
                        <h3 className="text-gray-600 font-lg text-semibold leading-6">
                          Role:
                          <span className="text-sm text-black pl-2">
                            {user.role.replace(/_/g, " ").toUpperCase()}
                          </span>
                        </h3>
                        <h3 className="text-gray-600 font-lg text-semibold leading-6">
                          Email:
                          <span className="text-sm text-black pl-2">
                            {user.email}
                          </span>
                        </h3>
                        <h3 className="text-gray-600 font-lg text-semibold leading-6">
                          Phone:
                          <span className="text-sm text-black pl-2">
                            {user.phone || "not exist"}
                          </span>
                        </h3>
                       {user.company && (<h3 className="text-gray-600 font-lg text-semibold leading-6">
                          Adress:
                          <span className="text-sm text-black pl-2">
                            {user?.company?.address}
                          </span>
                        </h3>)}
                      </div>
                      <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                          <span>Status</span>
                          <span className="ml-auto">
                            <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                              active
                            </span>
                          </span>
                        </li>
                        <li className="flex items-center py-3">
                          <span>Member since</span>
                          <span className="ml-auto">
                            {/* Assuming common.formatDate is available */}
                            {common.formatDate(user?.created_at as string)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

              )}
            </div>

            <div className="w-full xl:w-2/4 p-3 ">
              <form
                className="card bg-white border border-gray-300 rounded-xl p-6 h-[21rem] "
                onSubmit={handlePasswordUpdate}
              >
                <div className="flex w-full justify-between items-center pb-4">
                  <p className="mb-0 font-bold">Edit Password</p>
                  <button
                    type="submit"
                    className="inline-block px-8 py-2 mt-3 mb-4 ml-auto font-bold leading-normal text-center text-white transition-all ease-in bg-red-500 border-0 rounded-lg shadow-md cursor-pointer text-xs hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  >
                    Save
                  </button>
                </div>

                <div className="flex flex-wrap mx-3 pb-4">
                  <div className="w-full px-3 mb-4">
                    <label
                      htmlFor="current_password"
                      className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                    >
                      Current Password
                    </label>
                    <input
                      required
                      type="password"
                      name="current_password"
                      id="current_password"
                      onChange={passwordSetter}
                      className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-3 mb-4">
                    <label
                      htmlFor="new_password"
                      className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                    >
                      New Password
                    </label>
                    <input
                      required
                      type="password"
                      onChange={passwordSetter}
                      id="new_password"
                      name="new_password"
                      className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-3 mb-4">
                    <label
                      htmlFor="confirm_password"
                      className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                    >
                      Confirm Password
                    </label>
                    <input
                      required
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      onChange={passwordSetter}
                      className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center w-full mt-8 gap-7">
            <form
              className={`card w-full ${
                user.company && "xl:w-[48%]"
              } p-6 bg-white border border-gray-300 rounded-xl pb-0`}
              onSubmit={handleUserUpdate}
            >
              <div className="flex items-center">
                <p className="mb-0 font-bold">Edit Profile</p>
                <button
                  type="submit"
                  className="inline-block px-8 py-2 mt-3 mb-4 ml-auto font-bold leading-normal text-center text-white transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs hover:shadow-xs hover:-translate-y-px active:opacity-85"
                >
                  Save
                </button>
              </div>

              <div className="flex-auto p-4">
                <p className="leading-normal uppercase text-blue-600 text-sm font-semibold mb-2">
                  User Information
                </p>
                <div className="flex flex-wrap -mx-3 pb-2">
                  <div className="w-full md:w-6/12 px-3 mb-4">
                    <label
                      htmlFor="name"
                      className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                    >
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      id="name"
                      value={newUser.name}
                      onChange={userSetter}
                      className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-3 mb-4">
                    <label
                      htmlFor="email"
                      className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                    >
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      value={newUser.email}
                      onChange={userSetter}
                      className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="w-full md:w-6/12 px-3 mb-4">
                    <label
                      htmlFor="phone"
                      className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700"
                    >
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      id="phone"
                      value={newUser.phone}
                      onChange={userSetter}
                      className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </form>

            {user.company && (
              <form
                className="card w-full xl:w-[48%] p-6 bg-white border border-gray-300 rounded-xl pb-0"
                onSubmit={handleCompanyUpdate}
              >
                <div className="flex items-center">
                  <p className="mb-0 font-bold">Company Information</p>
                  <button
                    type="submit"
                    className="inline-block px-8 py-2 mt-3 mb-4 ml-auto font-bold leading-normal text-center text-white transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-xs hover:shadow-xs hover:-translate-y-px active:opacity-85"
                  >
                    Save
                  </button>
                </div>

                <div className="flex-auto p-4 w-full">
                  <p className="leading-normal uppercase text-blue-600 text-sm font-semibold mb-2">
                    Additional Information
                  </p>
                  <div className="flex flex-wrap w-full -mx-3 pb-2">
                    <div className="w-full md:w-6/12 px-3 mb-4 flex flex-col items-center gap-4 mt-5">
                      <Avatar
                        src={company?.logo}
                        sx={{ width: 70, height: 65 }}
                      />

                      <input
                        type="file"
                        name="logo"
                        onChange={handleImageChange}
                        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="w-full md:w-6/12 px-3 mb-4 flex text-left flex-col justify-end">
                      <div>
                        <label
                          htmlFor="name"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 text-left"
                        >
                          Name
                        </label>
                        <input
                          required
                          name="name"
                          id="name"
                          onChange={companySetter}
                          value={company?.name}
                          type="text"
                          className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="address"
                          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 text-left"
                        >
                          Address
                        </label>
                        <textarea
                          required
                          name="address"
                          id="address"
                          onChange={companySetter}
                          value={company?.address}
                          rows={2}
                          className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default Profile;
