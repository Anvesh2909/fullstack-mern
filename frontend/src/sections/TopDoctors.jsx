import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { useContext } from "react";

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className='container mx-auto flex flex-col items-center gap-4 my-8 md:my-16 text-gray-900 px-4 md:px-10'>
            <h1 className='md:text-4xl text-3xl font-medium text-center'>
                Top Doctors to Book
            </h1>

            <p className='max-w-xs sm:max-w-md md:max-w-xl text-center text-sm'>
                Simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free.
            </p>

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 pt-5'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/appointment/${item._id}`)}
                        className='flex flex-col border border-blue-200 rounded-xl overflow-hidden cursor-pointer
                                 transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
                    >
                        <div className='aspect-square w-full overflow-hidden bg-blue-50'>
                            <img
                                className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                                src={item.image}
                                alt={item.name}
                            />
                        </div>

                        <div className='p-3 sm:p-4 flex flex-col gap-1'>
                            <div className='flex items-center gap-2 text-xs sm:text-sm text-green-500'>
                                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                                <span>Available</span>
                            </div>

                            <h3 className='text-gray-900 text-base sm:text-lg font-medium
                                         overflow-hidden text-ellipsis whitespace-nowrap'>
                                {item.name}
                            </h3>

                            <p className='text-gray-600 text-xs sm:text-sm'>
                                {item.speciality}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => {
                    navigate('/doctors');
                    scrollTo(0, 0);
                }}
                className='bg-blue-50 text-gray-600 px-8 sm:px-12 py-3 rounded-full mt-6 sm:mt-10
                           transition-all duration-300 hover:shadow-md'
            >
                more
            </button>
        </div>
    );
};
export default TopDoctors;