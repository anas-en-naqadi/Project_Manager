import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";
import Box from "@mui/material/Box";
import { Project, Employee } from "../types";

interface EmployeeDialogProps {
  openProject: boolean;
  handleClose: () => void;
  projectSetter: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  projectHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  project: Project;
  employees: Employee[];
}

function ProjectDialog({
  openProject,
  handleClose,
  projectSetter,
  projectHandler,
  project,
  employees,
}: EmployeeDialogProps) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 520,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Modal
        open={openProject}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {project.id ? "Edit" : "Add"} Project
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <form onSubmit={projectHandler} className="max-w-md mx-auto">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none white:text-white white:border-gray-600 white:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={project.name}
                  onChange={projectSetter}
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Title
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium bg-white text-gray-500 "
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  name="description"
                  value={project.description}
                  onChange={projectSetter}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-blue-500 white:focus:border-blue-500 mt-4"
                ></textarea>
              </div>

              <div className="grid md:grid-cols-2 mt-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="date"
                    name="start_date"
                    id="start_date"
                    value={project.start_date}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none white:text-white white:border-gray-600 white:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={projectSetter}
                  />
                  <label
                    htmlFor="start_date"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Started at
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="date"
                    name="end_date"
                    id="end_date"
                    value={project.end_date}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none white:text-white white:border-gray-600 white:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={projectSetter}
                  />
                  <label
                    htmlFor="end_date"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Ended at
                  </label>
                </div>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <select
                  id="project_manager_id"
                  onChange={projectSetter}
                  name="project_manager_id"
                  value={project.project_manager_id}
                  className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none white:text-gray-400 white:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option selected>Choose an employee</option>
                  {employees.map(
                    (e: Employee) =>
                      e.user.role === "project_manager" && (
                        <option key={e.id} value={e.user.id}>
                          {e.user.name}
                        </option>
                      )
                  )}
                </select>
                <label
                  htmlFor="project_manager_id"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Project Manager
                </label>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center white:bg-blue-600 white:hover:bg-blue-700 white:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default ProjectDialog;
