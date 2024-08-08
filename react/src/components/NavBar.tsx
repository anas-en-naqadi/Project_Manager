import React, { useEffect, useState } from "react";
import logo from "../assets/images/olive.png";
import { Props } from "../types";
import {Skeleton} from "@mui/material";
import { Avatar } from "@mui/material";
import common from "../utils/common";
import { AppDispatch } from "../store/store";
import { deleteNotifications, fetchNotifications, setAsReadAt } from "../features/DashboardSlice";
import { useDispatch } from "react-redux";

function Navbar({ notifications, user }: Props) {
  const dispatch = useDispatch<AppDispatch>();
    const [notifiable, setNotifiable] = useState(false);
    const [counter ,setCounter] = useState(0);

    useEffect(()=>{
      if(notifications.length){
const value = notifications?.filter((n) => !n.read_at);
setCounter(value.length);
      }

    },[notifications])
  const toggleSidebar = () => {
    // Add your sidebar toggle logic here
  };

  const markAsRead = () => {
    setNotifiable(!notifiable);
    if(notifications.find((n)=> !n.read_at))
{
      dispatch(setAsReadAt());
      dispatch(fetchNotifications());
}
  setCounter(0);
  };

  const deleteAllNotifiable = () => {
    dispatch(deleteNotifications());
        setNotifiable(!notifiable);
  setCounter(0);

  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-1 shadow-md lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
              onClick={toggleSidebar}
            >
              <svg
                id="toggleSidebarMobileHamburger"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                id="toggleSidebarMobileClose"
                className="w-6 h-6 hidden"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <a
              href="#"
              className="text-xl font-bold flex items-center lg:ml-2.5"
            >
              <img
                id="logo"
                src={logo}
                className="h-16 w-16 mr-2"
                alt="Olive Logo"
              />
              <span id="brand" className="self-center whitespace-nowrap">
                OilStore
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="flex flex-col items-center gap-44">
                <div className="">
                  <button
                    onClick={markAsRead}
                    type="button"
                    className="relative inline-flex items-center md:mr-3 md:w-12 p-3 mr-5 mt-2 text-sm font-medium text-center text-black rounded-lg hover:bg-blue-200 focus:ring-1 focus:outline-none focus:ring-blue-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      id="notif"
                      className="xl:w-7 xl:h-7 h-6 w-6 text-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>

                    <span className="sr-only">Notifications</span>
                    <div
                      id="counter"
                      className="absolute inline-flex items-center justify-center md:w-4 md:h-4 w-6 h-6 text-xs font-bold text-white bg-red-500 border-1 text-center border-black rounded-full top-2 end-1.5"
                    >
                      {counter}
                    </div>
                  </button>
                </div>
                {notifiable && (
                  <div
                    id="toast-notification"
                    className="absolute top-24 z-50 md:w-88 p-4 text-gray-900 bg-white rounded-lg shadow-lg border-gray-500"
                    role="alert"
                  >
                    <div className="flex items-center mb-3 z-50">
                      <span className="mb-1 text-md font-semibold text-gray-900">
                        New notifications
                      </span>
                      <button
                        type="button"
                        id="notif-box"
                        onClick={markAsRead}
                        className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
                        aria-label="Close"
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                      </button>
                    </div>
                    <hr className="mb-2 text-gray-900 font-bold w-[20rem] -ml-4" />
                    <div className="flex items-center flex-col md:h-52 overflow-scroll">
                      {notifications.length ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="ms-3 text-sm font-normal m-1.5 cursor-pointer"
                          >
                            <div className="text-sm text-red-800 font-semibold">
                              <>{notification.data.message}</>
                            </div>
                            <span className="text-xs font-medium text-blue-600">
                              {/* Placeholder for common.timeSince(notification.created_at) */}
                              {common.timeSince(notification.created_at)}
                            </span>
                            <hr className="mt-2" />
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-600 text-center text-sm font-semibold">
                          No Notifications !!
                        </div>
                      )}
                      {notifications.length > 0 && (
                        <div
                          onClick={deleteAllNotifiable}
                          className="text-gray-600 text-center font-bold text-sm cursor-pointer hover:underline p-1"
                        >
                          Clear All
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="hidden xl:flex lg:flex md:flex flex-col gap-2 md:mr-1 mr-2 p-2 justify-center">
                <div className="text-base font-medium leading-none text-blue-900">
                  {!user.name ? <Skeleton width={70} height={25} /> : user.name}
                </div>
                <div className="text-sm font-medium leading-none text-blue-900">
                  {!user.email ? (
                    <Skeleton width={140} height={25} />
                  ) : (
                    user.email
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                {/* Avatar Placeholder */}
               {user.company && <Avatar
                  alt="logo"
                  src={user.company?.logo}
                  sx={{ width: 50, height: 45 }}
                />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
