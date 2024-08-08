import React, { useEffect } from "react";
import { Skeleton } from "@mui/material";
import common from "../utils/common";
import HighchartsGantt from "highcharts/modules/gantt";
import Highcharts from "highcharts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchPmSatistics, projectProgress } from "../features/DashboardSlice";
import { Project, User } from "../types";
// Define the statistics type
interface PmDashProps {
  user: User;
  statistics: object;
  projects: Project[];
  responsive: object;
}

HighchartsGantt(Highcharts);
function PmDashboard({ user, statistics, projects, responsive }: PmDashProps) {
  const dispatch = useDispatch<AppDispatch>();
    const dispatchData = async () => {
      await dispatch(fetchPmSatistics());
      await dispatch(projectProgress());
    };

    useEffect(() => {
      dispatchData();
    }, [user.role]);

  const project_progress = useSelector(
    (state: RootState) => state.dashboardHandler.project_progress_chart
  );






  useEffect(() => {
     const seriesData = [
       {
         name: "Projects",
         data: projects.map((project) => ({
           name: project.name,
           start: new Date(project.start_date).getTime(),
           end: new Date(project.end_date).getTime(),
         })),
       },
     ];
    if (Object.keys(project_progress).length) {
       Highcharts.chart("container1", {
         chart: {
           type: "bar",
         },
         title: {
           text: "Task Progress by Project",
         },
         xAxis: {
           categories: project_progress.categories,
         },
         yAxis: {
           title: {
             text: "Number of Tasks",
           },
         },
         series: [
           {
             name: "In progress",
             data: project_progress.in_progress, // Example data
           },
           {
             name: "Delivered",
             data: project_progress.delivered,
           },
           {
             name: "Failed",
             data: project_progress.failed,
           },
         ],
         responsive: responsive,
       });
      Highcharts.ganttChart("container2", {
        title: {
          text: "Project Timeline",
        },
        series: seriesData,
        xAxis: {
          min: Date.parse("2024-01-01"),
          max: Date.parse("2024-12-31"),
        },
        yAxis: {
          uniqueNames: true,
        },
        responsive: responsive,
      });
    }


  }, [user.role, project_progress,projects]);

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
                <path
                  fillRule="evenodd"
                  d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z"
                  clipRule="evenodd"
                />
                <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Employees
              </p>
              {statistics.employeesCount >= 0 ? (
                <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                  {common.formatNumber(statistics.employeesCount)}
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
                <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
              </svg>
            </div>
            <div className="p-4 text-right">
              <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                Assigned Tasks
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
          {Object.keys(project_progress).length ? (
            <div
              id="container1"
              className="bg-white h-[30rem] shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2 flex items-center justify-center"
            ></div>
          ) : (
            <div className="bg-white h-[30rem] shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2 flex items-center justify-center">
              <Skeleton variant="rounded" height={370} width={480} />
            </div>
          )}

          {projects.length ? (
            <div
              id="container2"
              className="bg-white h-[30rem] shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2 flex items-center justify-center"
            ></div>
          ) : (
            <div
              id="container2"
              className="bg-white h-[30rem] shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2 flex items-center justify-center"
            >
              <Skeleton variant="rounded" height={370} width={480} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PmDashboard;
