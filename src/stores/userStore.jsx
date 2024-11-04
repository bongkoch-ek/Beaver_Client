import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import userService from "../services/UserService";


const useUserStore  = create( persist((set,get) => ({
    user: null,
    token: null,
    actionLogin: async (input) => {
        const result = await userService.actionLogin(input)
        set({token : result.data.token, user: result.data.payload})
        return result.data
    },
    actionLogout: () =>{
        set({token: null, user: null})
    },
    actionRegister: async (input) => {
        const result = await userService.actionRegister(input)
        return result.data
    },
    actionUpdateProfile: async (input) => {
        const result = await userService.actionUpdateUser(input)
        set({token : result.data.token, user: result.data.user})
        return result.data
    },
    actionLoginGoogle : async (codeResponse) => {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
            },
          }
        )
        const result = await userService.actionLoginGoogle(res.data)
        console.log(result)
        set({
          user: result.data.payload,
          token: result.data.token,
        });
        return result
      },
      setUser: (userData) => set({ user: userData }),
    
}),{
    name: 'state',
    storage: createJSONStorage(() => localStorage)
}))

export default useUserStore