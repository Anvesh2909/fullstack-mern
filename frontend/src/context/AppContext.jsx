import {createContext, useState} from "react";
import {doctors} from "../assets/assets_frontend/assets.js";
import axios from "axios";

export const AppContext = createContext();
const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const getDoctorData = async ()=>{
         try{
             const {data} = await axios.get(backendUrl + '/api/admin/doctors-list');
         }catch (e) {
             
         }
    }
    const value = {
        doctors
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;