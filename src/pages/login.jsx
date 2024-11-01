import React from "react";
import { useState } from "react";
import { BeaverLogo, GoogleLogo, OpenPassword } from "../icons";
import Input from "../components/common/Input";
import validateLogin from "../utils/validator";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useUserStore((state) => state.actionLogin); //รอzustand****
  const token = useUserStore((state) => state.token);
  const actionLoginGoogle = useUserStore((state) => state.actionLoginGoogle);
  const [formErrors, setFormErrors] = useState({});
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const hdlLogin = async (e) => {
    try {
      e.preventDefault();
      //#region  validation
      const error = validateLogin(input);
      if (error) {
        setFormErrors(error);
        console.log(error);
        return;
      }
      //#endregion

      await actionLogin(input);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const hdlLoginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const res = await actionLoginGoogle(codeResponse);
      console.log("check res function hdlLogin google : ", res.data);
      console.log(codeResponse)
      navigate("/home");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));

    const { [e.target.name]: _, ...newData } = formErrors;
    setFormErrors(newData);
    // console.log(e.target.value)
  };

  return (
    <div className="flex flex-col items-center justify-start  min-h-screen bg-gray-100">
      {/* Login Form */}
      <div className="bg-white shadow-lg rounded-lg p-10 mt-10 w-[30%]">
        <div className="flex flex-col items-center mb-6">
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-semibold">Welcome</h2>
          </div>
          <div className="flex  items-center justify-center gap-2 mt-3">
            <BeaverLogo className="w-16 h-16 rounded-full " />
            <h3 className="text-[#FFE066] text-5xl font-medium">Beaver</h3>
          </div>
        </div>
        <form onSubmit={hdlLogin}>
          <Input
            label="Email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={hdlChange}
            isError={formErrors.email ? true : false}
          />
          <Input
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={hdlChange}
            isError={formErrors.password ? true : false}
          />

          <button
            type="submit"
            className="w-full  bg-[#FFE066] hover:bg-yellow-400 text-black py-2 rounded font-semibold"
          >
            Login
          </button>
          {/* Line */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          <button
            onClick={() => hdlLoginGoogle()}
            type="button"
            className="w-full flex items-center justify-center bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 py-2 rounded"
          >
            <GoogleLogo className="w-5 h-5 mr-2 text-[#FFE066] font-semibold" />
            Login with Google Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
