import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import useDashboardStore from "../stores/dashboardStore";
import useUserStore from "../stores/userStore";

const LoadingMember = () => {
  const { projectId } = useParams();
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
          actionUpdateStatusMember(token, projectId);
        }
        return currentCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [token, projectId, actionUpdateStatusMember]);

  if (redirect) {
    return <Navigate to={`/project`} />;
  }

  return (
    <div>
      <LoadingPage /> {count}{" "}
    </div>
  );
};

export default LoadingMember;
