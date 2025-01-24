import {createContext} from "react";
export const AppContext = createContext();
const AppContextProvider = (props) => {
    const calculateAge = (dob) => {
        if (!dob || dob === 'Not selected') {
            return 'N/A';
        }
        try {
            const birthDate = new Date(dob);
            if (isNaN(birthDate.getTime())) {
                return 'N/A';
            }
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();

            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        } catch (error) {
            console.error('Age calculation error:', error);
            return 'N/A';
        }
    }
    const value = {
        calculateAge
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;