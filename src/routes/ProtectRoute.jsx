import React, { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import { currentUser } from "../services/UserService";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRoute = ({ element }) => {
  const [ok, setOk] = useState(false);
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    if (user && token) {
      currentUser(token)
        .then((res) => setOk(true))
        .catch((err) => setOk(false));
    }
  }, []);
  return ok ? element : <LoadingToRedirect />;
};

export default ProtectRoute;
