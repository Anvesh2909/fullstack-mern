import {useContext} from "react";
import {AppContext} from "../context/AppContext.jsx";
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const RelatedDoctors = ({speciality, id}) => {
    const {doctors} = useContext(AppContext);
    const navigate = useNavigate();
    const filterDocs = doctors.filter((doc) => doc.speciality === speciality && doc._id !== id);

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 pt-5 px-3 sm:px-0">
            {filterDocs.map((item, index) => (
                <div
                    onClick={() => navigate(`/appointment/${item._id}`)}
                    key={index}
                    className="flex flex-col w-full sm:w-64 border border-blue-200 rounded-xl overflow-hidden cursor-pointer"
                >
                    <div className="w-full aspect-square">
                        <img
                            src={item.image || "/fallback-image.jpg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <div className="flex items-center gap-2 text-sm text-center text-green-500">
                            <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                            <p>Available</p>
                        </div>
                        <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                        <p className="text-gray-600 text-sm">{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RelatedDoctors;