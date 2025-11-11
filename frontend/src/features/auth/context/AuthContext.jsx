import {createContext, useContext, useEffect, useState} from "react";
import {userApi} from "@/apis/user.js";
import {toast} from "react-toastify";

const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const res = await userApi.getInfo();
                setUser(res.result)
            }
            catch (err) {
                console.error("Lỗi xác thực:", error);
                setUser(null)
            }
            finally {
                setLoading(false)
            }
        }
        fetchUserInfo().catch(console.error)
    }, []);

    if (loading) {
        return <div>Đang tải ứng dụng...</div>; // Hoặc một component loading đẹp hơn
    }

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
};