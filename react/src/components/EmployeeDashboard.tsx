import React, { useEffect } from "react";
import { Skeleton } from "@mui/material";
import common from "../utils/common";
import Highcharts from "highcharts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  employeeTaskCompletion,
  employeeTasksRank,
  fetchEmployeeSatistics,
} from "../features/DashboardSlice";
import { User } from "../types";
// Define the statistics type
interface EmployeeDashProps {
  user: User;
  statistics: object;
  responsive: object;
}
function EmployeeDashboard({
  user,
  statistics,
  responsive,
}: EmployeeDashProps) {
  const dispatch = useDispatch<AppDispatch>();




  const dispatchData = async () => {
    await dispatch(fetchEmployeeSatistics());
    await dispatch(employeeTaskCompletion());
    await dispatch(employeeTasksRank());
  };

  useEffect(() => {
    dispatchData();
  }, [user.role]);
const employee_tasks_status = useSelector(
  (state: RootState) => state.dashboardHandler.employee_tasks_rank_chart
);

const employee_task_completion = useSelector(
  (state: RootState) => state.dashboardHandler.employee_task_completion_chart
);
  useEffect(() => {
   if(Object.keys(employee_task_completion).length && employee_tasks_status.length){
     Highcharts.chart("container6", {
       chart: {
         type: "area",
       },
       title: {
         text: "Monthly Task Completion",
       },
       xAxis: {
         categories: employee_task_completion.categories,
       },
       yAxis: {
         title: {
           text: "Number of Tasks",
         },
       },
       series: [
         {
           name: "Tasks Completed",
           data: employee_task_completion.data, // Example data
         },
       ],
       responsive: responsive,
     });
     Highcharts.chart("container7", {
       chart: {
         type: "pie",
       },
       title: {
         text: "Task Breakdown",
       },
       series: [
         {
           name: "Tasks",
           data: employee_tasks_status,
         },
       ],
     });
   }
  }, [user.role, employee_task_completion, employee_tasks_status]);

  return (
    <>
      <div className="mt-4 m-10 pt-10">
        <div className="mb-813 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 ">
          {/* Today's Money */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md h-[100%]">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Total Tasks
              </p>
              {statistics.tasksCount >= 0 ? (
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {common.formatNumber(statistics.tasksCount)}
                </h4>
              ) : (
                <h4 className="antialiased flex items-center justify-end mt-3 tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  <Skeleton width="5rem" />
                </h4>
              )}
            </div>
          </div>

          {/* Today's Users */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md h-[100%]">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Projects
              </p>
              {statistics.projectsCount >= 0 ? (
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {common.formatNumber(statistics.projectsCount)}
                </h4>
              ) : (
                <h4 className="antialiased flex items-center justify-end mt-3 tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  <Skeleton width="5rem" />
                </h4>
              )}
            </div>
          </div>

          {/* New Clients */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md h-[100%]">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Today's Tasks
              </p>
              {statistics.assignedTasksCount >= 0 ? (
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {common.formatNumber(statistics.assignedTasksCount)}
                </h4>
              ) : (
                <h4 className="antialiased flex items-center justify-end mt-3 tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  <Skeleton width="5rem" />
                </h4>
              )}
            </div>
          </div>

          {/* Today's Sales */}
          <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md h-[100%]">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-500 to-orange-300 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-8"
              >
                <path
                  fillRule="evenodd"
                  d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Completed Tasks
              </p>
              {statistics.completedTasksCount >= 0 ? (
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {common.formatNumber(statistics.completedTasksCount)}
                </h4>
              ) : (
                <h4 className="antialiased flex items-center justify-end mt-3 tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  <Skeleton width="5rem" />
                </h4>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6 px-4">
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
          {Object.keys(employee_task_completion).length ? (
            <div
              id="container6"
              className="bg-white h-[30rem] shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2 flex items-center justify-center"
            ></div>
          ) : (
            <div className="bg-white h-[30rem] shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2 flex items-center justify-center">
              <Skeleton variant="rounded" height={370} width={480} />
            </div>
          )}

          {employee_tasks_status.length ? (
            <div
              id="container7"
              className="bg-white h-[30rem] shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2 flex items-center justify-center"
            ></div>
          ) : (
            <div className="bg-white h-[30rem] shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2 flex items-center justify-center">
              <Skeleton variant="rounded" height={370} width={480} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EmployeeDashboard;
