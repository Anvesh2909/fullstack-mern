import {useContext, useEffect, useState} from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import {AppContext} from "../context/AppContext.jsx";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
const Login = () => {
    const [state, setState] = useState("Sign up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {backendUrl,setToken,token} = useContext(AppContext);
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const endpoint = state === "Sign up" ? "/api/user/register" : "/api/user/login";
            const payload = state === "Sign up" ? { name, email, password } : { email, password };
            const { data } = await axios.post(backendUrl + endpoint, payload);
            if (data.success) {
                localStorage.setItem("token", data.token);
                setToken(data.token);
                toast.success(data.message || `${state} successful!`);
                setName("");
                setEmail("");
                setPassword("");
            } else {
                toast.error(data.message);
            }
        } catch (e) {
            const errorMessage = e.response?.data?.message || "An unexpected error occurred.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if(token) navigate('/');
    },[token])
    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        {state === "Sign up" ? "Create Account" : "Welcome Back"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please {state === "Sign up" ? "create an account" : "login"} to book an appointment
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-6">
                        {/* Full Name Field */}
                        {state === "Sign up" && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 sm:text-sm"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none relative block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2  sm:text-sm"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none relative block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 sm:text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${
                                isLoading ? "opacity-75 cursor-not-allowed" : ""
                            }`}
                        >
                            {isLoading ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                state
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setState(state === "Sign up" ? "Login" : "Sign up")}
                            className="w-full text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            {state === "Sign up" ? "Already have an account? Login" : "Don't have an account? Sign up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;