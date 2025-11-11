import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import authApi from "../../../apis/auth"
import { getRoleFromToken } from "../../../utils/auth"
import {toast} from "react-toastify";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const res = await authApi.login({email, password})
            if (res.code === 1000 && res.result?.authenticated) {
                const token = res.result.token;
                localStorage.setItem("token", token);
                const role = getRoleFromToken(token)

                if(role === "ROLE_admin")
                {
                    window.location.href = "/admin/dashboard"
                }
                else if(role === "ROLE_instructor")
                {
                    window.location.href = "/instructor/courses"
                }
                else {
                    window.location.href = "/courses"
                }
            } else {
                toast.error("Sai email hoặc mật khẩu!");
            }
        } catch (error) {
            setError(`Error occurs ${error}`)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
                <h2 className="text-3xl font-bold text-center mb-8">Đăng nhập</h2>
                <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full"
                    />
                    <Input
                        label="Mật khẩu"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full"
                    />
                    <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        Đăng nhập
                    </Button>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </form>
                <p className="text-sm text-center mt-6">
                    Chưa có tài khoản?{" "}
                    <a href="/register" className="text-blue-600 hover:underline font-medium">
                        Đăng ký
                    </a>
                </p>
            </div>
        </div>
    )
}