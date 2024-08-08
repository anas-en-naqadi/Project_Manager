import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Employee, Project, Task } from "../types";

interface TaskDialogProps {
  task: Task;
  style: object;
  open: boolean;
  handleClose: () => void;
  TaskHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  TaskSetter: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  employees: Employee[];
  projects: Project[];
}

function TaskDialog({
  task,
  style,
  open,
  handleClose,
  TaskHandler,
  TaskSetter,
  employees,
  projects,

}: TaskDialogProps) {

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Task
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={TaskHandler} className="max-w-md mx-auto">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none white:text-white white:border-gray-600 white:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={task.title}
                  onChange={TaskSetter}
                />
                <label
                  htmlFor="title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Title
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-500 "
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  name="description"
                  value={task.description}
                  onChange={TaskSetter}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-blue-500 white:focus:border-blue-500 mt-4"
                ></textarea>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="date"
                  name="due_date"
                  id="due_date"
                  value={task.due_date}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none white:text-white white:border-gray-600 white:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  onChange={TaskSetter}
                />
                <label
                  htmlFor="due_date"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Due_date
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    onChange={TaskSetter}
                    value={task.status}
                    id="status"
                    name="status"
                    className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none white:text-gray-400 white:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option selected>Choose a status</option>
                    <option value="completed">completed</option>
                    <option value="in_progress">in progress</option>
                    <option value="failed">failed</option>
                  </select>
                  <label
                    htmlFor="status"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Status
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    id="priority"
                    onChange={TaskSetter}
                    name="priority"
                    value={task.priority}
                    className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none white:text-gray-400 white:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option selected>Choose a priority</option>
                    <option value="high">high</option>
                    <option value="medium">medium</option>
                    <option value="week">week</option>
                  </select>
                  <label
                    htmlFor="priority"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Priority
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    id="assigned_to"
                    onChange={TaskSetter}
                    name="assigned_to"
                    disabled={true}
                    value={task.assigned_to}
                    className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none white:text-gray-400 white:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option selected>Choose an employee</option>
                    {employees.map((e: Employee) => (
                      <option key={e.id} value={e.id}>
                        {e.user.name}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="assigned_to"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Assigned To
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    id="project"
                    name="project_id"
                    onChange={TaskSetter}
                    value={task.project_id}
                    className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none white:text-gray-400 white:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option selected>Choose a project</option>
                    {projects.map((p: Project) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>{" "}
                  <label
                    htmlFor="project"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Project
                  </label>
                </div>
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

export default TaskDialog;
