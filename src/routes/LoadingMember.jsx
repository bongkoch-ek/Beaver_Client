import Error401Page from "../pages/Error401Page";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3);
    const [redirect, setRedirect] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCount((currentCount) => {
          if (currentCount === 1) {
            clearInterval(interval);
            setRedirect(true);
          }
          return currentCount - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    if (redirect) {
      return <Navigate to={`/project/${id}`} />;
    }
  
    return (
      <div>
        <LoadingPage /> {count}{" "}
      </div>
    );
  };
  
  export default LoadingToRedirect;
  