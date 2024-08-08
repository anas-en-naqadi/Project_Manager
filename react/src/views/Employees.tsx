import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  addEmployee,
  changeRole,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../features/EmployeeSlice";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Alert,
  Snackbar,
  Skeleton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { Employee, Task, User } from "../types";
import TaskDialog from "../components/TaskDialog";
import { addTask, resetStatus, setStatusMessage } from "../features/TaskSlice";
import common from "../utils/common";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EmployeeDialog from "../components/EmployeeDialog";
import PersonIcon from "@mui/icons-material/Person";
import CancelIcon from "@mui/icons-material/Cancel";
const Employees: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      dispatch(fetchEmployees());
    }, [dispatch]);
  const user = useSelector((state: RootState) => state.user.data);
  const projects = useSelector(
    (state: RootState) => state.projectHandler.projects
  );
  const employees = useSelector(
    (state: RootState) => state.employeeHandler.employees
  );
  const validationErrors = useSelector(
    (state: RootState) => state.employeeHandler.validationErrors
  );
  const [openTask, setOpenTask] = useState(false);
  const [openEmployee, setOpenEmployee] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [open, setOpen] = useState(true); // Initialize task as null or with initial values
  const [task, setTask] = useState({} as Task); // Initialize task as null or with initial values
  const status = useSelector(
    (state: RootState) => state.taskHandler.statusMessage
  );
  const [employee, setEmployee] = useState({} as Employee);



  useEffect(() => {
    if (status !== null) {
      common.showToast(status);
      dispatch(resetStatus());
    }
  }, [status]);

  const TaskSetter = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    if (task) {
      setTask((prevState) => ({
        ...prevState,
        [name]:
          name === "assigned_to" || name === "project_id"
            ? parseInt(value)
            : value,
      }));
    }
  };

  const employeeSetter = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (employee) {
      setEmployee((prevState) => {
        if (name === "user_id") {
          return {
            ...prevState,
            [name]: parseInt(value),
          };
        } else if (name === "project_id") {
          const selectedProjectId = parseInt(value);
          const selectedProject = projects.find(
            (p) => p.id === selectedProjectId
          );
          const updatedProjects = prevState.projects || [];
          if (updatedProjects.some((p) => p.id === selectedProject?.id)) {
            prevState.project_id = null;
            dispatch(
              setStatusMessage("This project has already been assigned")
            );
            return prevState; // Return previous state without adding duplicate project
          }
          if (selectedProject) {
            dispatch(setStatusMessage("Project added Successfully !!"));
            return {
              ...prevState,
              projects: [...updatedProjects, selectedProject],
            };
          }
        } else if (name === "phone" || name === "name" || name === "email") {
          return {
            ...prevState,
            user: { ...prevState.user, [name]: value },
          };
        }

        // Keep other values intact if name is neither "user_id" nor "project_id"
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
  };

  const handleTaskOpen = (params: { id: number }) => {
    setOpenTask(true);
    const assignedToId = employees.find((e) => e.id === params.id)?.id;
    setTask({
      assigned_to: assignedToId ?? "",
    });
  };
  const handleEmployeeOpen = (params: { id: number }) => {
    setOpenEmployee(true);
    const selectedEmployee = employees.find((e) => e.id === params.id);
    setEmployee({ ...selectedEmployee, user_id: selectedEmployee?.user.id });
  };

  const makeItAsEmployee = async (id: number) => {
    const result = await common.showAlert("as Employee");
    if (result.isConfirmed) {
      dispatch(
        changeRole({
          id: id,
          role: "employee",
        })
      );
    }
  };
  const makeItAsProjectManager = async (id: number) => {
    const result = await common.showAlert("as PM");
    if (result.isConfirmed) {
      dispatch(
        changeRole({
          id: id,
          role: "project_manager",
        })
      );
    }
  };

  const handleClose = () => {
    setOpenTask(false);
    setOpenEmployee(false);
    setOpenDetails(false);
    setOpenRole(false);
    setEmployee({} as Employee);
  };

  const style: React.CSSProperties = {
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
  const TaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task) {
      dispatch(addTask(task));
    }
    setOpenTask(false);
  };
  const rows = [...employees];
  const onDeleteProject = (id: number) => {
    setEmployee((prevState) => {
      const updatedProjects = prevState?.projects.filter((p) => p.id !== id);
      return {
        ...prevState,
        projects: updatedProjects,
      };
    });
    dispatch(setStatusMessage("Project Deleted Successfully !!"));
  };

  const EmployeeHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (employee.id) dispatch(updateEmployee(employee));
    else {
      employee.user.role = "employee";
      dispatch(addEmployee(employee));
      setEmployee({} as Employee);
    }
    setOpenEmployee(false);
  };
  const DeleteEmployee = async (id: number) => {
    const result = await common.showAlert("yes delete it");
    if (result.isConfirmed) dispatch(deleteEmployee(id));
  };
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const createColumn = (
    field: string,
    headerName: string,
    type: string = "string",
    options?: object,
    width: number = 145
  ): GridColDef<(typeof rows)[number]> => ({
    field,
    headerName,
    editable: false,
    headerAlign: "center",
    align: "center",
    type: type,
    width: width,
    ...options,
  });

  const showDetails = (params: { id: number }) => {
    setOpenDetails(true);
    setEmployee({ ...employees.find((e) => e.id === params.id) });
  };

  const columns: GridColDef<(typeof rows)[number]>[] = [
    createColumn("id", "ID", "number", {}, 50),
    createColumn("user", "Name", "string", {
      valueGetter: (params: { row: { name: string } }) => params.name,
    }),
    createColumn("company", "Work In"),
    createColumn("departement", "Departement", "", {}, 120),
    createColumn("position", "Position", "", {}, 100),
    createColumn("salary", "Salary", "", {
      valueGetter: (params: number) => `${common.formatNumber(params)} MAD`,
    }),
    createColumn("start_date", "Start Date"),
    createColumn("end_date", "End date"),
    createColumn("actions", "Actions", "", {
      renderCell: (params: { row: { id: number; user: User } }) => (
        <>
          {user.role === "project_manager" && (
            <IconButton onClick={() => handleTaskOpen(params)}>
              <AssignmentOutlinedIcon />
            </IconButton>
          )}

          {user.role === "company" && (
            <>
              <IconButton
                onClick={() => showDetails(params)}
                aria-label="view"
                color="success"
              >
                <VisibilityIcon />
              </IconButton>

              <IconButton aria-label="delete">
                {params.row.user?.role === "employee" ? (
                  <PersonIcon
                    onClick={() => makeItAsProjectManager(params.row.id)}
                    color="warning"
                  />
                ) : (
                  <CancelIcon
                    onClick={() => makeItAsEmployee(params.row.id)}
                    color="error"
                  />
                )}
              </IconButton>

              <IconButton
                onClick={() => DeleteEmployee(params.row.id)}
                aria-label="delete"
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => handleEmployeeOpen(params)}
                aria-label="edit"
                color="primary"
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </>
      ),
      width: 180,
    }),
  ];

  return (
    <>
      <div className="card mx-5 mt-12 bg-white border border-gray-300 rounded-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 p-8">
            List of Employees
          </h2>
          {user.role === "company" && (
            <button
              type="button"
              onClick={() => setOpenEmployee(true)}
              className="p-button-outlined bg-white py-2 px-2 mr-6 border border-black rounded-md text-black hover:text-white hover:bg-black"
            >
              <AddOutlinedIcon className="mr-1.5" />
              Add new
            </button>
          )}
        </div>
        <div className="container mx-auto p-4 h-full">
          <div className="overflow-x-auto h-full">
            {!employees.length ? (
              <Box sx={{ height: 526, width: "100%" }}>
                <Skeleton animation="wave" variant="square" height={520} />
              </Box>
            ) : (
              <Box sx={{ height: 526, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 8,
                      },
                    },
                  }}
                  pageSizeOptions={[8]}
                  disableRowSelectionOnClick
                  disableAutosize
                />
              </Box>
            )}
          </div>
        </div>
      </div>
      <TaskDialog
        task={task}
        style={style}
        open={openTask}
        handleClose={handleClose}
        TaskHandler={TaskHandler}
        TaskSetter={TaskSetter}
        employees={employees}
        projects={projects}
      />
      <EmployeeDialog
        employeeHandler={EmployeeHandler}
        openEmployee={openEmployee}
        employee={employee}
        handleClose={handleClose}
        employees={employees}
        projects={projects}
        onDeleteProject={onDeleteProject}
        employeeSetter={employeeSetter}
        style={style}
      />
      <Modal
        open={openDetails}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Projects && Tasks
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={EmployeeHandler} className="max-w-md mx-auto">
              <h2 className="text-center mb-4 ">
                Employee name :{" "}
                <span className="text-red-500">{employee?.user?.name}</span>
              </h2>
              <div className="relative z-0 w-full mb-5 group">
                <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
                  <List dense>
                    {employee.projects?.map((project) => (
                      <ListItem key={project.id}>
                        <ListItemText primary={project.name} />
                        <ListItemSecondaryAction>
                          <span className="text-xs text-gray-600 font-semibold">
                            {project.project_manager}
                          </span>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                    {employee.projects?.length === 0 && (
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
                  className="peer-focus:font-medium absolute text-md -mt-1 text-blue-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Projects
                </label>
              </div>
              <div className="relative z-0 w-full group">
                <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
                  <List dense>
                    {employee.tasks?.map((task) => (
                      <ListItem key={task.id}>
                        <ListItemText primary={task.title} />
                        <ListItemSecondaryAction>
                          <span
                            className={`${
                              task.status === "pending"
                                ? "bg-orange-500"
                                : task.status === "canceled"
                                ? "bg-red-500"
                                : "bg-green-500"
                            } text-white text-xs mx-2 rounded-md p-1`}
                          >
                            {task.status}
                          </span>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                    {employee.tasks?.length === 0 && (
                      <ListItem>
                        <Typography variant="body2" color="textSecondary">
                          No Tasks available.
                        </Typography>
                      </ListItem>
                    )}
                  </List>
                </Box>
                <label
                  htmlFor="salary"
                  className="peer-focus:font-medium absolute text-md mb-2 -mt-1 text-blue-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tasks
                </label>
              </div>
            </form>
          </Typography>
        </Box>
      </Modal>
      {validationErrors.length &&
        validationErrors.map((error, index) => (
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
          >
            <Alert key={index} severity="error" className="mt-4">
              {error}
            </Alert>
          </Snackbar>
        ))}
    </>
  );
};

export default Employees;
