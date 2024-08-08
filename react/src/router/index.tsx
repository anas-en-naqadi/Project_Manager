import {createBrowserRouter} from "react-router-dom";

import DefaultLayout from "../components/DefaultLayout";
import Projects from "../views/Projects";
import Tasks from "../views/Tasks";
import Employees from "../views/Employees";
import Dashboard from "../views/Dashboard";
import GuestLayout from "../components/GuestLayout";
import Login from "../views/auth/Login";
import SignUp from "../views/auth/SignUp";
import CompanyForm from "../views/CompanyForm";
import NotFound from "../components/NotFound";
import Profile from "../views/Profile";
import ServerError from "../components/ServerError";


const routes = [
  {
    path: "/",
    name: "layout",
    element: <DefaultLayout />,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        element: <Dashboard />,
        meta: {
          title: "Project Manager - Dashboard",
        },
      },
      {
        path: "/tasks",
        name: "main",
        element: <Tasks />,
        meta: {
          title: "Project Manager - Tasks",
        },
      },
      {
        path: "/projects",
        name: "footer",
        element: <Projects />,
        meta: {
          title: "Project Manager - Projects",
        },
      },
      {
        path: "/employees",
        name: "employees",
        element: <Employees />,
        meta: {
          title: "Project Manager - Employees",
        },
      },
      {
        path: "/profile",
        name: "profile",
        element: <Profile />,
        meta: {
          title: "Project Manager - Profile",
        },
      },
    ],
  },
  {
    path: "/",
    name: "guestLayout",
    element: <GuestLayout />,
    children: [
      {
        path: "/login",
        name: "login",
        element: <Login />,
        meta: {
          title: "Project Manager - Login",
        },
      },
      {
        path: "/sign-up",
        name: "sign-up",
        element: <SignUp />,
        meta: {
          title: "Project Manager - Sign-up",
        },
      },
      {
        path: "/company",
        name: "company-form",
        element: <CompanyForm />,
        meta: {
          title: "Project Manager - Company",
        },
      },
    ],
  },
  {
    path: "*",
    name: "notFound",
    element: <NotFound />,
  },
  {
    path: "/500",
    name: "server-error",
    element: <ServerError />,
  },
];

export const router = createBrowserRouter(routes);

