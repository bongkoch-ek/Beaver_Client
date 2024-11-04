import axios from "axios";

export const uploadFiles = async (token,form) => await axios.post("http://localhost:8888/upload/images",{
    image: form
},{
    headers:{
        Authorization: `Bearer ${token}` 
    }
})

export const removeFiles = async (token,public_id) => await axios.post("http://localhost:8888/upload/removeimages",{
    public_id
},{
    headers:{
        Authorization: `Bearer ${token}` 
    }
})