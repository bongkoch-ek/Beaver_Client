import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import { currentUser } from "../services/UserService";
import LoadingToRedirect from "./LoadingToRedirect";
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";


const ProtectRoute = ({ element }) => {
  const [ok, setOk] = useState(null);
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    try {
        if(user && token){
            currentUser(token).then((res) => {
                setOk(true)
            })
        }
        else{
            setOk(false)
        }
    } catch (err) {
        setOk(false);
        console.log(err)
    }
  }, []);

  if(ok === null){
    return <div>
        <LoadingPage />
    </div>
}

if(!ok){
    return <LoadingToRedirect />
}

return element
//   return ok ? element : <LoadingToRedirect />;
};

export default ProtectRoute;
