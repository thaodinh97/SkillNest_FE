import {useEffect, useState} from "react";
import {userApi} from "@/apis/user.js";
import authApi from "@/apis/auth.js";
import {AuthContext} from "./auth.context.js";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const res = await userApi.getInfo();
                setUser(res.result)
            }
            catch (err) {
                console.error("Lỗi xác thực:", err);
                setUser(null)
            }
            finally {
                setLoading(false)
            }
        }
        fetchUserInfo().catch(console.error)
    }, []);

    const logout = async (token = null) => {
        try {
            const tokenToUse = token || localStorage.getItem("token");
            await authApi.logout(tokenToUse);
            localStorage.removeItem("token");
            setUser(null);
            navigate("/login");
        } catch (error) {
            console.error("Lỗi khi đăng xuất:", error);
            localStorage.removeItem("token");
            setUser(null);
            navigate("/login");
        }
    };

    if (loading) {
        return <div>Đang tải ứng dụng...</div>; // Hoặc một component loading đẹp hơn
    }

    return (
        <AuthContext.Provider value={{user, setUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}