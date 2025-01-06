import {createContext, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const AdminContext = createContext();
const AdminContextProvider = (props) => {
    const [token,setToken] = useState(localStorage.getItem('token') || '');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if(data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            toast.error(e.response?.data?.message || e.message);
        }
    };

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if(data.success) {
                await getAllDoctors();
                toast.success('Availability updated successfully');
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (e) {
            toast.error(e.response?.data?.message || e.message);
            throw e;
        }
    }

    const value = {
        token,
        setToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;