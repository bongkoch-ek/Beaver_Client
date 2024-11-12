import axios from "axios"

const userService = {}


userService.actionLogin = (input) => {
    return axios.post("http://localhost:8888/auth/login", input)
}

userService.actionRegister = (input) => {
    return axios.post("http://localhost:8888/auth/register", input)
}

userService.actionUpdateUser = (token,input) => {
    const header = {
        headers: { Authorization: `Bearer ${token}` }
      };
    return axios.patch('http://localhost:8888/user/update-profile',input,header)
}

userService.actionLoginGoogle = (profile) => {
    console.log("check profile from login google :", profile)
    return axios.post("http://localhost:8888/auth/login-google", profile)
}

export default userService

export const currentUser = async (token) => await axios.post("http://localhost:8888/auth/current-user",{},{
    headers:{
        Authorization: `Bearer ${token}`
    }
})