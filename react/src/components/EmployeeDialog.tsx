import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Project,Employee } from "../types";

interface EmployeeDialogProps {
  openEmployee:boolean,
  handleClose:()=>void,
  projects:Project[],
  employeeSetter:(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >)
  =>void,
  employeeHandler:(event:React.FormEvent<HTMLFormElement>)=>void,
  employee:Employee,
  onDeleteProject:(id:number)=>void,
  employees:Employee[],
  style:React.CSSProperties
}

function EmployeeDialog({openEmployee,handleClose,employeeSetter,employeeHandler,employee,projects,employees,onDeleteProject,style}:EmployeeDialogProps) {

  return (
    <>
     <Modal
        open={openEmployee}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {employee.id ? "Edit" : "Add"} Employee
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={employeeHandler} className="max-w-md mx-auto">
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none white:text-white white:border-gray-600 white:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                  value={employee?.user?.name}
                  onChange={employeeSetter}
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                    <select
                      id="departement"
                      onChange={employeeSetter}
                      name="departement"
                      required
                      value={employee.departement}
                      className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none white:text-gray-400 white:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option selected>Choose a departement</option>

                        <option value="RH">
                          RH
                        </option>
                        <option value="IT">IT</option>
                        <option value="MARKETING">MARKETING</option>

                    </select>
                    <label
                      htmlFor="departement"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Departement
                    </label>
                  </div>
                  </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none white:text-white white:border-gray-600 white:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                    value={employee?.user?.email}
                    onChange={employeeSetter}
                  />
                  <label
                    htmlFor="email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none white:text-white white:border-gray-600 white:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
                    value={employee?.user?.phone}
                    onChange={employeeSetter}
                  />
                  <label
                    htmlFor="phone"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="position"
                    id="position"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none white:text-white white:border-gray-600 white:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={employee.position}
                    onChange={employeeSetter}
                  />
                  <label
                    htmlFor="position"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Position
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="salary"
                    id="salary"
                    value={employee.salary}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none white:text-white white:border-gray-600 white:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={employeeSetter}
                  />
                  <label
                    htmlFor="salary"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Salary
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 mt-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="date"
                    name="start_date"
                    id="start_date"
                    value={employee.start_date}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none white:text-white white:border-gray-600 white:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={employeeSetter}
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
                    value={employee.end_date}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none white:text-white white:border-gray-600 white:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={employeeSetter}
                  />
                  <label
                    htmlFor="end_date"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Ended at
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                {employee.id && (
                  <div className="relative z-0 w-full mb-5 group">
                    <select
                      id="user_id"
                      onChange={employeeSetter}
                      name="user_id"
                      required
                      disabled={employee.id ? true : false}
                      value={employee.user_id}
                      className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none white:text-gray-400 white:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    >
                      <option selected>Choose an employee</option>
                      {employees.map((e: Employee) => (
                        <option key={e.id} value={e.user.id}>
                          {e.user.name}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="user_id"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Assigned To
                    </label>
                  </div>
                ) }

                <div className="relative z-0 w-full mb-5 group">
                  <select
                    id="project"
                    name="project_id"
                    required
                    onChange={employeeSetter}
                    className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none white:text-gray-400 white:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option selected>Choose a project</option>
                    {projects.map((p: Project) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>

                  <label
                    htmlFor="project"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Project
                  </label>
                </div>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
                  <List dense>
                    {employee?.projects?.map((project) => (
                      <ListItem key={project.id}>
                        <ListItemText primary={project.name} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => onDeleteProject(project.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                    {employee?.projects?.length === 0 && (
                      <ListItem>
                        <Typography variant="body2" color="textSecondary">
                          No projects available.
                        </Typography>
                      </ListItem>
                    )}
                  </List>
                </Box>
                <label
                  htmlFor="salary"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Projects
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
  )
}

export default EmployeeDialog;
