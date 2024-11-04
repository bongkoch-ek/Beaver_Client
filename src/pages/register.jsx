import React from "react";
import { useState } from 'react'
import { BeaverLogo, HidePasssword } from "../icons";
import Input from "../components/common/Input";
import validate from "../utils/validator";
import useUserStore from "../stores/userStore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    firstname: '',
    lastname: '',
    email: '',
    displayName: '',
    password: '',
    confirmPassword: ''
  })
  const [formErrors, setFormErrors] = useState({})

  const actionRegister = useUserStore( state => state.actionRegister ) 

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    const { [e.target.name]: _, ...newData } = formErrors;
    setFormErrors(newData)
  }

  const hdlRegister = async (e) => {
    e.preventDefault()
    const error = validate.validateRegister(input)
    if (error) {
      setFormErrors(error)
      console.log(error)
      return
    }
    // await actionRegister(input)
    navigate("/home")
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={hdlRegister}>
        <div className="w-[776px] p-[64px] bg-white rounded-3xl shadow-lg">
          {/* Title Section */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <h2 className="text-[#333333] text-2xl font-semibold font-['IBM Plex Sans Thai']">
              Create Account
            </h2>
            <div className="flex items-center gap-4">
              <BeaverLogo
                className="w-[62px] h-[62px] rounded-full"
              />
              <h1 className="text-[#ffe066] text-5xl font-semibold font-['IBM Plex Sans Thai'] leading-[64px]">
                Beaver
              </h1>
            </div>
          </div>

          {/* Account Info Section */}
          <div className="mb-8">
            <h3 className="text-[#333333] text-lg font-normal font-['IBM Plex Sans Thai'] mb-3">
              Account Info
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div >
                <Input label="First name" placeholder="First name" name="firstname" value={input.firstname} onChange={hdlChange} isError={formErrors.firstname ? true : false} errMessage={formErrors.firstname || ""}/>
              </div>
              <div>
                <Input label="Last name" placeholder="Last name" name="lastname" value={input.lastname} onChange={hdlChange} isError={formErrors.lastname ? true : false} errMessage={formErrors.lastname || ""}/>
              </div>

            </div>
          </div>

          {/* User Info Section */}
          <div className="mt-10 mb-8">
            <h3 className="text-[#333333] text-lg font-normal font-['IBM Plex Sans Thai'] mb-3">
              User Info
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Input label="Display name" placeholder="Display name" name="displayName" value={input.displayName} onChange={hdlChange} isError={formErrors.displayName ? true : false} errMessage={formErrors.displayName || ""}/>
              </div>
              <div>
                <Input label="Email" placeholder="Email" name="email" value={input.email} onChange={hdlChange} isError={formErrors.email ? true : false} errMessage={formErrors.email || ""}/>
              </div>
              <div className="relative w-full">
                <Input type="password" label="Password" placeholder="Password" name="password" value={input.password} onChange={hdlChange} isError={formErrors.password ? true : false} errMessage={formErrors.password || ""}/>

              </div>
              <div className="relative w-full">
                <Input type="password" label="Confirm Password" placeholder="Confirm password" name="confirmPassword" value={input.confirmPassword} onChange={hdlChange} isError={formErrors.confirmPassword ? true : false} errMessage={formErrors.confirmPassword || ""}/>
              </div>
            </div>
          </div>

          {/* Register Button */}
          <div className="flex justify-center mt-10">
            <button className="w-full max-w-xs px-4 py-2 bg-[#ffe066] text-[#333333] rounded-lg font-semibold font-['IBM Plex Sans Thai'] hover:bg-yellow-400 transition duration-300">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
