import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";



function GuestLayout(){
  const user = useSelector((state:RootState)=>state.user);
  
  if(user.token && user.data?.company)
    return <Navigate to="/dashboard" />


    return (
      <>
      <Outlet />
      </>
    )
}


export default GuestLayout;
