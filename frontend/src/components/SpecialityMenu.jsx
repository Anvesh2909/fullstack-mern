import { specialityData } from "../assets/assets_frontend/assets.js";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
    return (
        <div className="container mx-auto px-4 flex flex-col items-center gap-6 py-12 md:py-16 text-gray-800" id="special">
            <h1 className="text-3xl md:text-4xl font-medium text-center">
                Find by Speciality
            </h1>

            <p className="text-center text-sm md:text-base max-w-md md:max-w-xl">
                Simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free.
            </p>

            <div className="w-full mt-4">
                <div className="flex gap-6 md:gap-8 pt-5 pb-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 md:px-8 md:justify-center">
                    {specialityData.map((item, index) => (
                        <Link
                            onClick={() => scrollTo(0, 0)}
                            key={index}
                            className="flex flex-col items-center gap-3 min-w-[100px] sm:min-w-[120px] snap-start
                                     hover:-translate-y-2 transition-all duration-300 ease-out"
                            to={`/doctors/${item.speciality}`}
                        >
                            <div className="w-16 sm:w-20 md:w-24 aspect-square rounded-2xl ">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                    src={item.image}
                                    alt={item.speciality}
                                />
                            </div>
                            <p className="text-xs md:text-sm font-medium text-center">
                                {item.speciality}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpecialityMenu;