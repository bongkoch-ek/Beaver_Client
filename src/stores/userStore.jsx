import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import userService from "../services/UserService";


const userStore  = create( persist((set,get) => ({
    user: "null",
    token: '',
    actionLogin: async (input) => {
        const result = await userService.actionLogin(input)
        set({token : result.data.token, user: result.data.user})
        return result.data
    },
    actionLogout: () =>{
        set({token: '', user: null})
    },
    actionRegister: async (input) => {
        const result = await userService.actionRegister(input)
        return result.data
    },
    actionUpdateProfile: async (input) => {
        const result = await userService.actionUpdateUser(input)
        set({token : result.data.token, user: result.data.user})
        return result.data
    }
    
}),{
    name: 'state',
    storage: createJSONStorage(() => localStorage)
}))

export default useUserStore