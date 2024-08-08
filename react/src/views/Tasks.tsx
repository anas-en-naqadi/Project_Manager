import React, { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTaskStatus,
  deleteTask,
  fetchTasks,
  resetStatus,
  updateTask,
} from "../features/TaskSlice";
import { IconButton, Modal, Skeleton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditAttributesIcon from "@mui/icons-material/EditAttributes";
import EditIcon from "@mui/icons-material/Edit";
import { Task } from "../types";
import common from "../utils/common"; // Assuming common is exported from utils/common
import TaskDialog from "../components/TaskDialog";

const Tasks: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [disptach]);
  const [taskStatus,setTaskStatus] = useState<string>("");
  const projects = useSelector(
    (state: RootState) => state.projectHandler.projects
  );
  const employees = useSelector(
    (state: RootState) => state.employeeHandler.employees
  );
  const status = useSelector(
    (state: RootState) => state.taskHandler.statusMessage
  );
  const validationErrors = useSelector(
    (state: RootState) => state.taskHandler.validationErrors
  );
  const user = useSelector((state: RootState) => state.user.data);
  const tasks = useSelector((state: RootState) => state.taskHandler.tasks);
  const rows = [...tasks];


  useEffect(() => {
    if (status !== null) {
      common.showToast(status);
      dispatch(resetStatus());
    }
  }, [status]);

  const onDeleteTask = async (id: number) => {
    const result = await common.showAlert("yes delete it");
    if (result.isConfirmed) {
      await dispatch(deleteTask(id));
    }
  };

  const createColumn = (
    field: string,
    headerName: string,
    type: string = "string",
    options?: object
  ): GridColDef<(typeof rows)[number]> => ({
    field,
    headerName,
    flex: 1,
    width: 150,
    editable: true,
    headerAlign: "center",
    align: "center",
    type: type,
    ...options,
  });

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

  const handleStatusChange = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(changeTaskStatus({ status: taskStatus, id: task.id }));
    setOpenStatusDialog(false);
    setTask({} as Task);
  };
  const handleStatusDialogOpen = (id: number) => {
    setTask({ id } as Task);
    setOpenStatusDialog(true);
  };
  const columns: GridColDef<(typeof rows)[number]>[] = [
    createColumn("id", "Id", "number"),
    createColumn("title", "Title"),
    createColumn("description", "Description"),
    createColumn("status", "Status", "", {
      renderCell: (params: object) => {
        return (
          <span
            className={`${
              params.value === "failed"
                ? "bg-red-500"
                : params.value === "in_progress"
                ? "bg-blue-500"
                : "bg-green-500 "
            } text-white p-1 rounded text-xs`}
          >
            {params.value}
          </span>
        );
      },
    }),
    createColumn("priority", "Priority"),
    createColumn("project", "Project"),
    createColumn("assigned_to", "Assigned To"),
    createColumn(" ", "Actions", "", {
      renderCell: (params: object) => (
        <>
          {user.role === "project_Manager" && (
            <>
              <IconButton
                onClick={() => onDeleteTask(params.row.id)}
                aria-label="delete"
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => handleOpen(params)}
                aria-label="delete"
                color="success"
              >
                <EditIcon />
              </IconButton>
            </>
          )}
          <IconButton
            onClick={() => handleStatusDialogOpen(params.row.id)}
            aria-label="delete"
            color="warning"
          >
            <EditAttributesIcon sx={{ height: 30, width: 30 }} />
          </IconButton>
        </>
      ),
    }),
  ];

  const [task, setTask] = useState({} as Task);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  const TaskSetter = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setTask((prevState) => ({
      ...prevState,
      [name]:
        name === "assigned_to" || name === "project_id"
          ? parseInt(value)
          : value,
    }));
  };

  const [open, setOpen] = useState(false);

  const handleOpen = (params: object) => {
    setOpen(true);
    const projectId = projects.find((p) => p.name === params.row.project)?.id;
    const assignedToId = employees.find(
      (e) => e.user.name === params.row.assigned_to
    )?.id;

    setTask({
      ...params.row,
      project_id: projectId ?? "", // set as empty string or null if not found
      assigned_to: assignedToId ?? "", // set as empty string or null if not found
    });
  };

  const handleClose = () => setOpen(false);
  const handleCloseStatusDialog = () => setOpenStatusDialog(false);
  const updateTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateTask(task));
    setOpen(false);
  };

  return (
    <>
      <div className="card mx-5 mt-12 bg-white border border-gray-300 rounded-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 p-8">
            List of Tasks
          </h2>
        </div>
        <div className="container mx-auto p-4 h-full">
          <div className="overflow-x-auto h-full">
            {!tasks.length ? (
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
        open={open}
        handleClose={handleClose}
        updateTaskHandler={updateTaskHandler}
        TaskSetter={TaskSetter}
        employees={employees}
        projects={projects}
      />
      <Modal
        open={openStatusDialog}
        onClose={handleCloseStatusDialog}
        keepMounted
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <span className="text-red-500"> Adjust Status</span>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4 }}>
            <form onSubmit={handleStatusChange} className="max-w-md mx-auto">
              <div className="relative z-0 w-full group">
                <select
                  onChange={(e) => setTaskStatus(e.target.value)}
                  id="status"
                  name="status"
                  className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-200 appearance-none white:text-gray-400 white:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                >
                  <option selected>Choose a status</option>
                  <option value="completed">completed</option>
                  <option value="failed">failed</option>
                </select>
                <label
                  htmlFor="status"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 white:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:white:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Status
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full mt-2 sm:w-auto px-5 py-2.5 text-center white:bg-blue-600 white:hover:bg-blue-700 white:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Tasks;
