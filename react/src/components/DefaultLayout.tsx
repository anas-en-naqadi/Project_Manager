import { useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./NavBar";
import "../assets/styles/Layout.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { fetchTasks } from "../features/TaskSlice";
import { fetchProjects } from "../features/ProjectSlice";
import { fetchEmployees } from "../features/EmployeeSlice";
import { loggedUser, logout } from "../features/UserSlice";
import { fetchNotifications } from "../features/DashboardSlice";
import { ToastContainer } from "react-toastify";
import { usePageTitle } from "../hooks/usePageTitle";

function DefaultLayout() {
  const navigate = useNavigate();
  usePageTitle();
  const token = useSelector((state: RootState) => state.user.token);
    const statusCode = useSelector((state: RootState) => state.user.statusCode);
  useEffect(()=>{
    if(statusCode && statusCode === 500 && token)
    navigate("/500");
  },[statusCode])
  if (!token) return <Navigate to="/login" />;

  useEffect(() => {
    if (token){
       dispatch(loggedUser());
    dispatch(fetchNotifications());
    if (user.role === "project_manager") {
      dispatch(fetchTasks());
      dispatch(fetchProjects());
      dispatch(fetchEmployees());
    } else if (user.role === "employee") {
      dispatch(fetchTasks());
      dispatch(fetchProjects());
    }else{
            dispatch(fetchProjects());
            dispatch(fetchEmployees());
    }
  }
  }, [token]);
  const dispatch = useDispatch<AppDispatch>();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.data);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    const { payload } = dispatch(logout());
    console.log(payload);
    if (payload && payload.message)
      setTimeout(() => {
        window.location.href = `${import.meta.env.VITE_BASE_URL}/login`;
      }, 3000);
  };
  const notifications = useSelector(
    (state: RootState) => state.dashboardHandler.notifications
  );

  return (
    <>
      <Navbar notifications={notifications} user={user} />
      <div className="flex overflow-hidden bg-white pt-16">
        <aside
          id="sidebar"
          className={`fixed z-20 ${
            sidebarOpen ? "block" : "hidden"
          } h-full top-0 left-0 pt-14 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75`}
          aria-label="Sidebar"
        >
          <div className="relative flex-1 flex shadow-md h-full flex-col min-h-0 border-r border-gray-200 pt-0">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-1 px-3 bg-white divide-y space-y-1">
                <ul className="space-y-2 pb-2">
                  <li>
                    <NavLink
                      to="/dashboard"
                      className="text-base mt-3 text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                    >
                      <i className="fas fa-tachometer-alt"></i>
                      <span className="ml-3">Dashboard</span>
                    </NavLink>
                  </li>
                  {user.role !== "employee" && (
                    <>
                      <li>
                        <NavLink
                          to="/employees"
                          className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                        >
                          <i className="fas fa-users"></i>
                          <span className="ml-3 flex-1 whitespace-nowrap">
                            Employees
                          </span>
                        </NavLink>
                      </li>
                      {/* <li>
                    <NavLink
                      to="/blacklist"
                      className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                    >
                      <i className="fas fa-user-slash"></i>
                      <span className="ml-3 flex-1 whitespace-nowrap">Blacklist</span>
                    </NavLink>
                  </li> */}
                    </>
                  )}
                  <li>
                    <NavLink
                      to="/projects"
                      className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                    >
                      <i className="fas fa-project-diagram"></i>
                      <span className="ml-3 flex-1 whitespace-nowrap">
                        Projects
                      </span>
                    </NavLink>
                  </li>

                  {user.role !== "company" && (
                    <li>
                      <NavLink
                        to="/tasks"
                        className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group"
                      >
                        <i className="fas fa-tasks"></i>
                        <span className="ml-3 flex-1 whitespace-nowrap">
                          Tasks
                        </span>
                      </NavLink>
                    </li>
                  )}
                </ul>
                <div className="space-y-2 pt-2">
                  <NavLink
                    to="/profile"
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                  >
                    <i className="fas fa-user"></i>
                    <span className="ml-4">Profile</span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="text-base w-full text-gray-900 cursor-pointer font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="ml-3">Log out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
        {/* Sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="bg-gray-900 opacity-50 fixed inset-0 z-10"
            id="sidebarBackdrop"
            onClick={toggleSidebar}
          ></div>
        )}
        <div
          id="main-content"
          className="h-full w-full bg-gray-50 relative overflow-y-auto overflow-x-hidden lg:ml-64"
        >
          <main>
            {/* Add your router view or routes here */}
            <Outlet />
            <ToastContainer />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default DefaultLayout;
