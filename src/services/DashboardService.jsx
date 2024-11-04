import axios from "axios"


const header = {
    headers: { Authorization: `Bearer ${token}` }
  };

export const actionGetAllComment = async () => {
    return await axios.get("http://localhost:8888/comment", header)
}

