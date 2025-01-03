import {createContext, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
export const AdminContext = createContext();
const AdminContextProvider = (props) => {
    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const getAllDoctors = ()=>{
        try{
             const {data} = axios.post(backendUrl + 'api/admin/all-doctors',{},{headers:token});
            if(data.success){
                setDoctors(data.doctors);
            }else{
                toast.error(data.message);
            }
        }catch (e) {
            toast.error(e.message);
        }
    }
    const value = {
         token,setToken,backendUrl,doctors,getAllDoctors
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider;