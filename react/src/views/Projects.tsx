import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RootState, AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  deleteProject,
  fetchProjects,
  markProjectAsDelivered,
  updateProject,
} from "../features/ProjectSlice";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Project } from "../types";
import ProjectDialog from "../components/ProjectDialog";
import { resetStatus } from "../features/TaskSlice";
import common from "../utils/common";

const Projects: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  const status = useSelector(
    (state: RootState) => state.taskHandler.statusMessage
  );
  useEffect(() => {
    if (status !== null) {
      common.showToast(status);
      dispatch(resetStatus());
    }
  }, [status]);

  const employees = useSelector(
    (state: RootState) => state.employeeHandler.employees
  );
  const user = useSelector((state: RootState) => state.user.data);

  const projects = useSelector(
    (state: RootState) => state.projectHandler.projects
  );

  const [project, setProject] = useState<Project>({} as Project);
  const [openProject, setOpenProject] = useState(false);
  const rows = [...projects];

  const handleProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    project.id
      ? dispatch(updateProject(project))
      : dispatch(addProject(project));
    handleClose();
  };

  const projectSetter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setProject({} as Project);
    setOpenProject(false);
  };

  const handleNewProject = () => {
    setOpenProject(true);
  };

  const EditProject = (params: { row: { project_manager: string } }) => {
    const id = employees.find((e) => e.user.name === params.row.project_manager)
      ?.user.id;
    setProject({ ...params.row, project_manager_id: id });
    setOpenProject(true);
  };
  const onDeleteProject = async (id: number) => {
    const result = await common.showAlert("yes delete it");
    if (result.isConfirmed) {
      await dispatch(deleteProject(id));
    }
  };
  const markItAsDelivered = async ({
    id,
    status,
  }: {
    id: number;
    status: string;
  }) => {
    const result = await common.showAlert(
      status === "delivered" ? "as Delivered" : "as Failed"
    );
    if (result.isConfirmed) {
      dispatch(markProjectAsDelivered({ id, status }));
    }
  };

  const createColumn = (
    field: string,
    headerName: string,
    type: string = "string",
    options?: object,
    width: number = 140,
    sortable: boolean = false
  ): GridColDef => ({
    field,
    headerName,
    sortable,
    width,
    editable: false,
    headerAlign: "center",
    align: "center",
    type,
    ...options,
  });

  const columns: GridColDef[] = [
    createColumn("id", "Id", "", {}, 50, true),
    createColumn("name", "Name", "", {}, 160),

    createColumn("description", "Description", "", {}, 180),
    createColumn(
      "status",
      "Status",
      "",
      {
        renderCell: (params) => {
          return (
            <span
              className={`${
                params.value === "failed"
                  ? "bg-red-500"
                  : params.value === "in_progress"
                  ? "bg-blue-500"
                  : "bg-green-500 "
              } text-white p-1 px-1 rounded text-xs`}
            >
              {params.value}
            </span>
          );
        },
      },
      100
    ),
    createColumn("company", "Company"),
    createColumn("project_manager", "Project Manager", "", {}, 170),
    createColumn("employee_count", "Num of Employees", "", {}, 100),
    createColumn("start_date", "Start in", "", {}, 100, true),
    createColumn("end_date", "End in", "", {}, 100, true),
    createColumn(
      "actions",
      "Actions",
      " ",
      {
        renderCell: (params) => (
          <>
            {user.role === "project_manager" &&
            params.row.status === "in_progress" ? (
              <>
                <IconButton aria-label="edit">
                  <CancelIcon
                    onClick={() =>
                      markItAsDelivered({ id: params.row.id, status: "failed" })
                    }
                    color="error"
                  />
                </IconButton>
                <IconButton>
                  <CheckCircleIcon
                    onClick={() =>
                      markItAsDelivered({
                        id: params.row.id,
                        status: "delivered",
                      })
                    }
                    color="success"
                  />
                </IconButton>
              </>
            ) : user.role === "company" ? (
              <>
                {" "}
                <IconButton aria-label="delete" color="secondary">
                  <DeleteIcon onClick={() => onDeleteProject(params.row.id)} />
                </IconButton>
                <IconButton
                  onClick={() => EditProject(params)}
                  aria-label="edit"
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
              </>
            ) : (
              "No Actions"
            )}
          </>
        ),
      },
      150
    ),
  ];

  return (
    <>
      <div className="card mx-5 mt-12 bg-white border border-gray-300 rounded-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 p-8">
            List of Projects
          </h2>
          {user.role === "company" && (
            <button
              type="button"
              className="p-button-outlined bg-white py-2 px-4 mr-6 border border-black rounded-md text-black hover:text-white hover:bg-black"
              onClick={handleNewProject}
            >
              New Project
            </button>
          )}
        </div>
        <div className="container mx-auto p-4">
          <div className="overflow-x-auto">
            {!projects.length ? (
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
                  disableColumnResize={true}
                  disableRowSelectionOnClick
                  disableAutosize
                />
              </Box>
            )}
          </div>
        </div>

        <ProjectDialog
          openProject={openProject}
          handleClose={handleClose}
          projectSetter={projectSetter}
          project={project}
          employees={employees}
          projectHandler={handleProject}
        />
      </div>
    </>
  );
};

export default Projects;
