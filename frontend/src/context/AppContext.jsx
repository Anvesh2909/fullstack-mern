import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
export const AppContext = createContext();
const AppContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const [token,setToken] = useState(localStorage.getItem('token') || '');
    const [userData, setUserData] = useState(false);
    const getDoctorData = async ()=>{
         try{
             const {data} = await axios.get(backendUrl + '/api/doctor/list');
             if(data.success){
                 setDoctors(data.doctors);
             }else{
                 toast.error(data.message);
             }
         }catch (e) {
             console.log(e);
             toast.error(e.message);
         }
    }
    const loadUserData = async () => {
        try{
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: {
                    utoken: token
                }
            });
            if(data.success){
                setUserData(data.userData);
                console.log(data);
            }else{
                toast.error(data.message);
                console.log(data);
            }
        }catch (e) {
            console.log(e);
            toast.error(e.message);
        }
    }
    useEffect(()=>{
        getDoctorData();
    },[]);
    const value = {
        doctors,token,setToken,backendUrl,userData,setUserData,loadUserData
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;