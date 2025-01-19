import axios from "axios"
import toast from "react-hot-toast"
import { create } from "zustand"
import { config } from "../utils/constants.js"

// const host = "http://localhost:5000";
export const useAuthStore = create((set) =>
({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingout: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/auth/signup`, credentials, config);
            set({ user: response.data.user, isSigningUp: false });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed");
            set({ isSigningUp: false, user: null });
        }
    },
    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/auth/login`, credentials, config)
            set({ user: response.data.user, isLoggingIn: false });
            toast.success("Logged in successfully");
        } catch (error) {
            set({ isLoggingIn: false, user: null });
            toast.error(error.response.data.message || "Login failed");
        }
    },
    logout: async () => {
        set({ isLoggingout: true });
        try {
            await axios.post(`http://localhost:5000/api/v1/auth/logout`, config)
            set({ user: null, isLoggingout: false });
            toast.success("Logged out successfully")
        } catch (error) {
            set({ isLoggingout: false })
            toast.error(error.response.data.message || "Logout failed")
        }
    },
    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/auth/authCheck`, {}, config)
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
        }
    },
})
)