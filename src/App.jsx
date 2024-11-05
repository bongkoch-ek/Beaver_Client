import { useState } from "react";
import { Button } from "@/components/ui/button";
import AppRoutes from "./routes/AppRoutes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId="343888688005-2oseolalak1onip9ehehnscfcbr1604k.apps.googleusercontent.com" >
        <ToastContainer />
        <AppRoutes />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
