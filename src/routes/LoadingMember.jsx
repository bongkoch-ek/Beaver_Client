import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import useDashboardStore from "../stores/dashboardStore";
import useUserStore from "../stores/userStore";

const LoadingMember = ({ id }) => {
  const token = useUserStore((state) => state.token);
  const actionUpdateStatusMember = useDashboardStore((state) => state.actionUpdateStatusMember);
  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setRedirect(true);
          actionUpdateStatusMember(token, id);
        }
        return currentCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [token, id, actionUpdateStatusMember]);

  if (redirect) {
    return <Navigate to={`/project/${id}`} />;
  }

  return (
    <div>
      <LoadingPage /> {count}{" "}
    </div>
  );
};

export default LoadingMember;
