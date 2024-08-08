
import HighchartsGantt from "highcharts/modules/gantt";
import Highcharts from "highcharts";
import {  useSelector } from "react-redux";
import { RootState } from "../store/store";
import CompanyDashboard from "../components/CompanyDasboard";
import PmDashboard from "../components/PmDashboard";
import EmployeeDashboard from "../components/EmployeeDashboard";
// Define the statistics type

HighchartsGantt(Highcharts);
const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const statistics = useSelector(
    (state: RootState) => state.dashboardHandler.statistics
  );
  const projects = useSelector(
    (state: RootState) => state.projectHandler.projects
  );


  const responsive = {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          },
          yAxis: {
            labels: {
              format: "{value}",
            },
          },
        },
      },
    ],
  };


  return (
    <>
      {user.role === "company" && (
        <CompanyDashboard
          responsive={responsive}
          statistics={statistics}
          user={user}
        />
      )}
      {user.role === "project_manager" && (
        <PmDashboard
          responsive={responsive}
          statistics={statistics}
          user={user}
          projects={projects}
        />
      )}
      {user.role === "employee" && (
        <EmployeeDashboard
          responsive={responsive}
          statistics={statistics}
          user={user}
        />
      )}
    </>
  );
};

export default Dashboard;
