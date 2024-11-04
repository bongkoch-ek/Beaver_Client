import axios from "axios"

const userService = {}

userService.actionLogin = (input) => {
    return axios.post("http://localhost:8888/auth/login", input)
}

userService.actionRegister = (input) => {
    return axios.post("http://localhost:8888/auth/register", input)
}

userService.actionUpdateUser = (input) => {
    return axios.patch("http://localhost:8888/", input)
}

userService.actionLoginGoogle = (profile) => {
    console.log("check profile from login google :", profile)
    return axios.post("http://localhost:8888/auth/login-google", profile)
}


export default userService